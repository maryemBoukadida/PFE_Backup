const mongoose = require("mongoose");

// Schéma pour chaque ligne du tableau
const elementSchema = new mongoose.Schema({
    element: { type: String, required: true },
    etat: { type: String, default: "" },
    interventions: { type: String, default: "" },
    observations: { type: String, default: "" }
}, { _id: false });

// Schéma principal
const fichePosteSchema = new mongoose.Schema({
    posteSST1: [elementSchema],
    posteSST2: [elementSchema],
    posteTC: [elementSchema],

    observationsGenerales: {
        type: String,
        default: ""
    },

    date: {
        type: Date
    },

    technicien: {
        type: String,
        default: ""
    },

    signature: {
        type: String,
        default: ""
    }
});

// ⚠️ Forcer Mongoose à utiliser la collection "fichePostes"
module.exports = mongoose.model("FichePoste", fichePosteSchema, "fichePostes");