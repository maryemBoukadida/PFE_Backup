const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const Equipement = require("./models/Equipement");

const multer = require("multer");
const fs = require("fs");
const libre = require("libreoffice-convert");
const path = require("path");

libre.convertAsync = require("util").promisify(libre.convert);
const upload = multer({ dest: "uploads/" });


// CRÉER L'APPLICATION
const app = express();

console.log("🔥 SERVER.JS GMAO CHARGÉ 🔥");

// MIDDLEWARE - OBLIGATOIRE EN PREMIER
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// LOGGER SIMPLE
app.use((req, res, next) => {
    console.log(`👉 ${req.method} ${req.url}`);
    next();
});

// CONNEXION MONGODB
mongoose.connect("mongodb://127.0.0.1:27017/gmao_db")
    .then(() => console.log("✅ MongoDB OK"))
    .catch(err => console.log("❌ MongoDB:", err));

// SCHÉMA ÉQUIPEMENT

// ========== ROUTES ==========

// ✅ TEST - La plus importante !
app.get("/", (req, res) => {
    console.log("✅ Route / appelée");
    res.json({
        status: "OK",
        message: "Serveur GMAO fonctionne"
    });
});


app.get("/equipements", async(req, res) => {
    try {
        const list = await Equipement.find().sort({ code_patrimoine: 1 });
        res.json(list);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// ✅ RECHERCHE ÉQUIPEMENT
app.get("/equipements/search/:code", async(req, res) => {
    try {
        const code = req.params.code.trim();
        const equip = await Equipement.findOne({ code_patrimoine: code });
        res.json({ exists: !!equip, equipement: equip || null });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ AJOUT ÉQUIPEMENT - VERSION CORRIGÉE (sans ?.)
app.post("/equipements", async(req, res) => {
    try {
        console.log("📦 Données reçues:", req.body);

        // VERSION SIMPLE - sans optional chaining
        let codePatrimoine = null;
        if (req.body && req.body.code_patrimoine) {
            codePatrimoine = req.body.code_patrimoine.trim();
        }



        if (exist) {
            return res.status(400).json({ message: "❌ Code existe déjà" });
        }

        const newEquip = new Equipement(req.body);
        await newEquip.save();
        res.status(201).json({ message: "✅ Équipement ajouté" });

    } catch (err) {
        console.log("❌ Erreur:", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// ========== DÉMARRAGE ==========
const PORT = 5000;
app.listen(PORT, () => {
    console.log("\n" + "=".repeat(50));
    console.log(`🚀 SERVEUR PRÊT SUR http://localhost:${PORT}`);
    console.log("=".repeat(50));
    console.log("📌 Tests à faire :");
    console.log(`1. GET  http://localhost:${PORT}/`);
    console.log(`2. GET  http://localhost:${PORT}/equipements/search/RE2`);
    console.log(`3. POST http://localhost:${PORT}/equipements`);
    console.log("=".repeat(50) + "\n");
});


app.post("/equipements/:id/upload", upload.single("file"), async(req, res) => {
    console.log("Fichier reçu :", req.file);
    try {
        const equipement = await Equipement.findById(req.params.id);

        if (!equipement) {
            return res.status(404).json({ message: "Équipement introuvable" });
        }

        const excelPath = req.file.path;
        const pdfPath = excelPath.replace(".xlsx", ".pdf");

        const excelBuffer = fs.readFileSync(excelPath);
        const pdfBuffer = await libre.convertAsync(excelBuffer, ".pdf");

        fs.writeFileSync(pdfPath, pdfBuffer);

        equipement.excel_file = excelPath;
        equipement.pdf_file = pdfPath;
        await equipement.save();

        res.json({ message: "Excel chargé et PDF généré avec succès" });

    } catch (err) {
        console.log("❌ Erreur conversion :", err);
        res.status(500).json({ message: "Erreur conversion Excel → PDF" });
    }
});
app.get("/equipements/:id/excel", async(req, res) => {
    try {
        const eq = await Equipement.findById(req.params.id);

        if (!eq || !eq.excel_file) {
            return res.status(404).send("Excel non disponible");
        }

        // Pour ouvrir dans le navigateur
        res.sendFile(path.resolve(eq.excel_file));

        // Si tu veux forcer le téléchargement, commente la ligne ci-dessus et décommente :
        // res.download(path.resolve(eq.excel_file), `${eq.code_patrimoine}.xlsx`);
    } catch (err) {
        res.status(500).send("Erreur affichage Excel");
    }
});