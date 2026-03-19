const mongoose = require('mongoose');

// =======================
// SOUS-SCHEMA CONTROLE
// =======================
const operationSchema = new mongoose.Schema({
    specification: { type: String, default: "" },
    designation: { type: String, required: true },

    matin: {
        normal: { type: Boolean, default: false },
        anomalie: { type: Boolean, default: false }
    },

    apresMidi: {
        normal: { type: Boolean, default: false },
        anomalie: { type: Boolean, default: false }
    },

    nuit: {
        normal: { type: Boolean, default: false },
        anomalie: { type: Boolean, default: false }
    }
});

// =======================
// TEMPS INSPECTION
// =======================
const tempsInspectionSchema = new mongoose.Schema({
    debut: { type: String },
    fin: { type: String },
    tempsAlloue: { type: String }
});

// =======================
// OBSERVATIONS
// =======================
const observationsSchema = new mongoose.Schema({
    matin: { type: String },
    apresMidi: { type: String },
    nuit: { type: String }
});

// =======================
// TECHNICIENS
// =======================
const techniciensSchema = new mongoose.Schema({
    matin: [String],
    apresMidi: [String],
    nuit: [String]
});

// =======================
// FICHE OLAPION
// =======================
const ficheOlapionSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    designation: { type: String, required: true },
    lieuInstallation: { type: String, required: true },

    // ✅ ici le tableau
    operations: [operationSchema],

    tempsInspection: {
        matin: tempsInspectionSchema,
        apresMidi: tempsInspectionSchema,
        nuit: tempsInspectionSchema,
        total: { type: String }
    },

    observations: observationsSchema,

    techniciens: techniciensSchema,
    operateurs: techniciensSchema,

    statut: {
        type: String,
        enum: ["enregistre", "envoyee", "validée"],
        default: "enregistre"
    }
});

module.exports = mongoose.model('FicheOlapion', ficheOlapionSchema);