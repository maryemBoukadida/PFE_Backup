const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Equipement = require("./models/Equipement");

// Connexion à MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/gmao_db")
    .then(() => console.log("✅ MongoDB connecté"))
    .catch(err => console.log("❌ MongoDB:", err));

const folderPath = "C:/Users/INFOMAX/Downloads/Fiches Signalitiques Des Equipements Balisage/equipement";

async function importExcelFiles(folder) {
    const files = fs.readdirSync(folder);

    for (const file of files) {
        const fullPath = path.join(folder, file);

        if (fs.statSync(fullPath).isDirectory()) {
            // Récursion dans les sous-dossiers
            await importExcelFiles(fullPath);
        } else if (file.endsWith(".xlsx")) {
            // Utiliser le nom du fichier (sans extension) comme code patrimoine
            const codePatrimoine = path.parse(file).name;

            // Vérifie si l'équipement existe déjà
            const existing = await Equipement.findOne({ code_patrimoine: codePatrimoine });
            if (!existing) {
                const newEquip = new Equipement({
                    code_patrimoine: codePatrimoine,
                    designation_equipement: codePatrimoine,
                    excel_file: fullPath
                });

                await newEquip.save();
                console.log(`📦 Équipement ajouté : ${codePatrimoine}`);
            } else {
                console.log(`⚠️ Équipement déjà existant : ${codePatrimoine}`);
            }
        }
    }
}

importExcelFiles(folderPath)
    .then(() => {
        console.log("✅ Import terminé !");
        mongoose.disconnect();
    })
    .catch(err => {
        console.log("❌ Erreur import :", err);
        mongoose.disconnect();
    });