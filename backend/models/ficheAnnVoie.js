const mongoose = require("mongoose");

const { Schema } = mongoose;

// ================= Sous-schema commun =================
const elementSchema = new Schema({
    Etat: { type: String, default: "" },
    Interventions: { type: String, default: "" },
    Observations: { type: String, default: "" }
}, { _id: false });

// ================= Schema Panneau =================
const panneauSchema = new Schema({
    "Signe de stop": elementSchema,
    "Lumière rouge clignotante": elementSchema,
    "Panneau solaire": elementSchema,
    "Les Batteries": elementSchema,
    "Carte de commande": elementSchema
}, { _id: false });

// ================= Schema ROT =================
const rotSchema = new Schema({
    "Etat de panneaux": elementSchema,
    "Etat d'éclairage": elementSchema
}, { _id: false });

// ================= Schema principal =================
const ficheAnnVoieSchema = new Schema({
    panneaux: {
        H25: panneauSchema,
        I25: panneauSchema,
        I15: panneauSchema,
        I5: panneauSchema,
        I4: panneauSchema,
        H4: panneauSchema,
        I24: panneauSchema,
        H24: panneauSchema
    },

    ROTs: {
        ROT11: rotSchema,
        ROT12: rotSchema,
        ROT13: rotSchema,
        ROT14: rotSchema,
        ROT15: rotSchema,
        ROT16: rotSchema,
        ROT17: rotSchema,
        ROT18: rotSchema,
        ROT19: rotSchema
    },

    observations_generales: { type: String, default: "" },

    date: { type: Date },

    techniciens_operateurs: [{
        type: String
    }],

    signature: { type: String, default: "" }
}, {
    timestamps: true,
    collection: "ficheAnnVoie" // force le nom de la collection
});

module.exports = mongoose.model("FicheAnnVoie", ficheAnnVoieSchema);