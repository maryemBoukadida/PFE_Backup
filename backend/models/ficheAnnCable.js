const mongoose = require("mongoose");

// Schéma pour chaque équipement
const EquipementSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    etat: { type: String, default: "" },
    interventions: { type: String, default: "" },
    observations: { type: String, default: "" }
});

// Schéma pour chaque poste
const PosteSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    equipements: { type: [EquipementSchema], default: [] }
});

// Schéma principal
const FicheAnnCableSchema = new mongoose.Schema({
    type: { type: String, default: "inspection_annuelle_postes" },
    postes: { type: [PosteSchema], default: [] },
    date: { type: String, default: "" },
    technicien_operateur: { type: String, default: "" },
    signature: { type: String, default: "" },
    observations_generales: { type: String, default: "" }
}, {
    collection: "ficheAnnCable", // force l'utilisation de cette collection
    timestamps: true
});

// Exporter le modèle
module.exports = mongoose.model("FicheAnnCable", FicheAnnCableSchema);