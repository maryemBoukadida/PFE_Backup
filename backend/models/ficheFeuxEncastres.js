const mongoose = require('mongoose');

const EtatSchema = new mongoose.Schema({
    nom: { type: String }, // <-- nom de l’élément
    etat: { type: String, default: "" },
    interventions: { type: String, default: "" }, // <-- corrigé
    observations: { type: String, default: "" }
}, { _id: false });

const EmplacementSchema = new mongoose.Schema({
    nom: { type: String },
    elements: [EtatSchema]
}, { _id: false });

const FicheFeuxEncastresSchema = new mongoose.Schema({
    type: { type: String, default: "feux_encastres_sem" },
    emplacements: [EmplacementSchema], // ✅ correspond au front

    observations_generales: { type: String, default: "" },
    date: { type: String, default: "" },
    technicien_operateur: { type: String, default: "" },
    signature: { type: String, default: "" },
    statut: { type: String, default: "brouillon" },


}, { collection: 'ficheFeuxEncastres' });

module.exports = mongoose.model('FicheFeuxEncastres', FicheFeuxEncastresSchema);