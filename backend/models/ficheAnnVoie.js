const mongoose = require("mongoose");
const { Schema } = mongoose;

// ================= ELEMENT =================
const elementSchema = new Schema({
    Etat: { type: String, default: "" },
    Interventions: { type: String, default: "" },
    Observations: { type: String, default: "" }
}, { _id: false });

// ================= PANNEAU =================
const panneauSchema = new Schema({
    "Signe de stop": { type: elementSchema, default: () => ({}) },
    "Lumière rouge clignotante": { type: elementSchema, default: () => ({}) },
    "Panneau solaire": { type: elementSchema, default: () => ({}) },
    "Les Batteries": { type: elementSchema, default: () => ({}) },
    "Carte de commande": { type: elementSchema, default: () => ({}) }
}, { _id: false });

// ================= ROT =================
const rotSchema = new Schema({
    "Etat de panneaux": { type: elementSchema, default: () => ({}) },
    "Etat d'éclairage": { type: elementSchema, default: () => ({}) }
}, { _id: false });

// ================= MAIN =================
const ficheAnnVoieSchema = new Schema({

    date: {
        type: Date,
        default: Date.now
    },

    panneaux: {
        H25: { type: panneauSchema, default: () => ({}) },
        I25: { type: panneauSchema, default: () => ({}) },
        I15: { type: panneauSchema, default: () => ({}) },
        I5: { type: panneauSchema, default: () => ({}) },
        I4: { type: panneauSchema, default: () => ({}) },
        H4: { type: panneauSchema, default: () => ({}) },
        I24: { type: panneauSchema, default: () => ({}) },
        H24: { type: panneauSchema, default: () => ({}) },
    },

    ROTs: {
        ROT11: { type: rotSchema, default: () => ({}) },
        ROT12: { type: rotSchema, default: () => ({}) },
        ROT13: { type: rotSchema, default: () => ({}) },
        ROT14: { type: rotSchema, default: () => ({}) },
        ROT15: { type: rotSchema, default: () => ({}) },
        ROT16: { type: rotSchema, default: () => ({}) },
        ROT17: { type: rotSchema, default: () => ({}) },
        ROT18: { type: rotSchema, default: () => ({}) },
        ROT19: { type: rotSchema, default: () => ({}) },
    },

    observations_generales: {
        type: String,
        default: ""
    },

    // ✅ CORRIGÉ ICI
    techniciens_operateurs: {
        type: String,
        default: ""
    },

    signature: {
        type: String,
        default: ""
    },

    statut: {
        type: String,
        enum: ["brouillon", "envoyé", "validée"],
        default: "brouillon"
    }

}, {
    timestamps: true,
    collection: "ficheAnnVoie"
});

module.exports = mongoose.model("FicheAnnVoie", ficheAnnVoieSchema);