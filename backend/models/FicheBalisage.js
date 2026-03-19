const mongoose = require("mongoose");

// =======================
// SOUS-SCHEMA OBSERVATION
// =======================
const observationSchema = new mongoose.Schema({
    nf: { type: Boolean, default: false },
    fonctionnement: { type: Boolean, default: false },
    interventions: { type: Boolean, default: false },
    observations: { type: String, default: "" }
});

// =======================
// SOUS-SCHEMA LIGNE
// =======================
const ligneSchema = new mongoose.Schema({
    designation: { type: String, required: true },

    matin: observationSchema,
    nuit: observationSchema
});

// =======================
// SOUS-SCHEMA GROUPE (ex: PAPI 09, Piste, etc.)
// =======================
const groupeSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    lignes: [ligneSchema]
});

// =======================
// FICHE BALISAGE
// =======================
const ficheBalisageSchema = new mongoose.Schema({
    date: { type: Date, required: true },

    designation: { type: String }, // optionnel (ex: type de mission)
    lieuInstallation: { type: String },

    groupes: [groupeSchema],

    // TECHNICIENS
    techniciens: {
        type: [String],
        default: []
    },

    statut: {
        type: String,
        enum: ["enregistre", "envoyee", "validée"],
        default: "enregistre"
    }
});

module.exports = mongoose.model("FicheBalisage", ficheBalisageSchema);