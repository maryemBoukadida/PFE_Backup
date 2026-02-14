const fs = require("fs");
const path = require("path");

// Chemin source : dossier où tes fichiers Excel sont téléchargés
const sourceFolder = "C:/Users/INFOMAX/Downloads/Fiches Signalitiques Des Equipements Balisage/Fiches Signalitiques Des Equipements Balisage/equipement";

// Chemin destination : dossier de ton projet Node
const destFolder = path.join(__dirname, "uploads/excel");

// Crée le dossier destination s'il n'existe pas
if (!fs.existsSync(destFolder)) fs.mkdirSync(destFolder, { recursive: true });

// Lire tous les fichiers dans le dossier source
const files = fs.readdirSync(sourceFolder);

files.forEach(file => {
    if (file.endsWith(".xlsx")) {
        const sourcePath = path.join(sourceFolder, file);
        const destPath = path.join(destFolder, file);

        // Copier le fichier
        fs.copyFileSync(sourcePath, destPath);
        console.log(`✅ Copié : ${file}`);
    }
});

console.log("✅ Tous les fichiers Excel ont été copiés !");