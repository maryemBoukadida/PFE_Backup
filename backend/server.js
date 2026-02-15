const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const Equipement = require("./models/Equipement");

const multer = require("multer");
const fs = require("fs");
const libre = require("libreoffice-convert");
const path = require("path");

// CRÉER L'APPLICATION
const app = express();

// MIDDLEWARE - OBLIGATOIRE EN PREMIER
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("🔥 SERVER PATH:", __filename);

libre.convertAsync = require("util").promisify(libre.convert);
const upload = multer({ dest: "uploads/" });


const dashboardRoutes = require("./routes/dashboard");
app.use("/api/dashboard", dashboardRoutes);
console.log("✅ Dashboard routes loaded");

console.log("🔥 SERVER.JS GMAO CHARGÉ 🔥");



// LOGGER SIMPLE
app.use((req, res, next) => {
    console.log(`👉 ${req.method} ${req.url}`);
    next();
});

// CONNEXION MONGODB
mongoose.connect("mongodb://127.0.0.1:27017/gmao_db")
    .then(() => console.log("✅ MongoDB OK"))
    .catch(err => console.log("❌ MongoDB:", err));

// ========== ROUTES ==========
// ✅ TEST - La plus importante !
app.get("/", (req, res) => {
    console.log("✅ Route / appelée");
    res.json({
        status: "OK",
        message: "Serveur GMAO fonctionne"
    });
});
console.log("🟢 Enregistrement de la route /equipements/:id/pdf");

// Route pour afficher le PDF
app.get("/equipements/:id/pdf", async(req, res) => {
    console.log("📄 Route PDF appelée pour ID :", req.params.id);
    try {
        const eq = await Equipement.findById(req.params.id);
        if (!eq) {
            return res.status(404).send("Équipement non trouvé");
        }

        if (!eq.pdf_file) {
            return res.status(404).send("PDF non disponible");
        }

        // SOLUTION: Ajoutez un '/' si le chemin ne commence pas par '/'
        let filePath;
        if (eq.pdf_file.startsWith('/')) {
            filePath = path.join(__dirname, eq.pdf_file);
        } else {
            filePath = path.join(__dirname, eq.pdf_file);
        }

        console.log("📁 Chemin complet:", filePath);

        if (!fs.existsSync(filePath)) {
            console.log("❌ Fichier introuvable");
            return res.status(404).send("Fichier PDF introuvable");
        }

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=" + path.basename(filePath));

        fs.createReadStream(filePath).pipe(res);

    } catch (err) {
        console.log("❌ Erreur:", err);
        res.status(500).send("Erreur affichage PDF");
    }
});

// Route pour l'Excel
app.get("/equipements/:id/excel", async(req, res) => {
    try {
        const eq = await Equipement.findById(req.params.id);

        if (!eq || !eq.excel_file) {
            return res.status(404).send("Excel non disponible");
        }

        res.sendFile(path.join(__dirname, eq.excel_file));

    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur affichage Excel");
    }
});

// Route pour ajouter un équipement
app.post("/equipements", async(req, res) => {
    try {
        console.log("📦 Données reçues:", req.body);

        // Vérifier si le code patrimoine existe déjà
        const exist = await Equipement.findOne({ code_patrimoine: req.body.code_patrimoine });

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

// Route pour uploader un fichier
app.post("/equipements/:id/upload", upload.single("file"), async(req, res) => {
    console.log("Fichier reçu :", req.file);
    try {
        const equipement = await Equipement.findById(req.params.id);

        if (!equipement) {
            return res.status(404).json({ message: "Équipement introuvable" });
        }

        const excelPath = req.file.path;
        const pdfPath = excelPath + ".pdf";

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

// Route pour récupérer tous les équipements
app.get("/equipements", async(req, res) => {
    try {
        const equipements = await Equipement.find();
        res.json(equipements);
    } catch (err) {
        console.log("❌ Erreur:", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});
// Route temporaire pour voir tous les IDs
app.get("/debug/equipements-ids", async(req, res) => {
    try {
        const equipements = await Equipement.find().select('_id code_patrimoine designation_equipement');
        console.log("📋 Équipements trouvés:", equipements.length);
        res.json(equipements);
    } catch (err) {
        console.log("❌ Erreur:", err);
        res.status(500).json({ error: err.message });
    }
});

// ========== DÉMARRAGE ==========
const PORT = 5000;
app.listen(PORT, () => {
    console.log("\n" + "=".repeat(50));
    console.log(`🚀 SERVEUR PRÊT SUR http://localhost:${PORT}`);
    console.log("=".repeat(50));
    console.log("📌 Routes disponibles :");
    console.log(`1. GET  http://localhost:${PORT}/`);
    console.log(`2. GET  http://localhost:${PORT}/equipements`);
    console.log(`3. POST http://localhost:${PORT}/equipements`);
    console.log(`4. GET  http://localhost:${PORT}/equipements/:id/pdf`);
    console.log("=".repeat(50) + "\n");
});