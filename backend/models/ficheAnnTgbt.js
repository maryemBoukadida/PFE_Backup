// models/ficheAnnTgbt.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// 🔹 Schéma pour les éléments d'un poste
const elementSchema = new Schema({
    nom: { type: String, required: true },
    etat: { type: String, default: "" },
    interventions: { type: String, default: "" },
    observations: { type: String, default: "" },
}, { _id: false }); // _id false pour éviter un ID supplémentaire pour chaque élément

// 🔹 Schéma pour les postes
const posteSchema = new Schema({
    nom: { type: String, required: true },
    elements: { type: [elementSchema], default: [] },
}, { _id: false });

// 🔹 Schéma principal de la fiche annuelle TGBT
const ficheAnnTgbtSchema = new Schema({
    postes: { type: [posteSchema], default: [] },
    observations_generales: { type: String, default: "" },
    technicien_operateurs: { type: String, default: "" },
    signature: { type: String, default: "" },
    date: { type: Date, default: Date.now }
});

// 🔹 Forcer l’utilisation de la collection existante "ficheAnnTgbt"
const FicheAnnTgbt = mongoose.model('FicheAnnTgbt', ficheAnnTgbtSchema, 'ficheAnnTgbt');

module.exports = FicheAnnTgbt;