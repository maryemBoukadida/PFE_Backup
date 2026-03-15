const mongoose = require("mongoose");

// Schéma pour chaque élément de vérification
const ElementSchema = new mongoose.Schema({
    verification: { type: String, required: true },

    "11": { type: String, default: "" },
    "12": { type: String, default: "" },
    "21": { type: String, default: "" },
    "22": { type: String, default: "" },
    "31": { type: String, default: "" },
    "32": { type: String, default: "" },
    "41": { type: String, default: "" },
    "42": { type: String, default: "" }

}, { _id: false });

// Schéma pour chaque bloc PAPI (09 ou 27)
const PapiSchema = new mongoose.Schema({
    numero: { type: String, required: true },
    elements: [ElementSchema]
}, { _id: false });

// Schéma principal de la fiche
const FicheQuiPapiSchema = new mongoose.Schema({

    type: {
        type: String,
        default: "inspection_quinquennale_papi"
    },

    titre: {
        type: String,
        default: "FICHE D’INSPECTION QUINQUENNALE PAPI"
    },

    papi: [PapiSchema],

    observations_generales: {
        type: String,
        default: ""
    },

    date: {
        type: Date
    },

    techniciens_operateurs: {
        type: String,
        default: ""
    },

    signature: {
        type: String,
        default: ""
    }

}, {
    collection: "ficheQuiPapi",
    timestamps: true
});

module.exports = mongoose.model("ficheQuiPapi", FicheQuiPapiSchema);