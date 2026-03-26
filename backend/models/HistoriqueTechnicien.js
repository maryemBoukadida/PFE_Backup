// backend/models/HistoriqueTechnicien.js
const mongoose = require("mongoose");

const HistoriqueTechnicienSchema = new mongoose.Schema({
    technicien: {
        type: String,
        required: true, // obligatoire pour savoir qui a fait l'action
    },
    date: {
        type: Date,
        default: Date.now,
    },
    // Référence à la fiche corrective originale
    fiche_corrective_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "fiche_corrective",
        required: true,
    },
    // Contenu ou résumé de la fiche
    typeFiche: {
        type: String,
        default: "corrective",
    },
    description: {
        type: String,
        default: "",
    },
    observations: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        enum: ["en_cours", "terminée", "validée"],
        default: "en_cours",
    },
}, {
    timestamps: true, // createdAt et updatedAt automatiques
});

module.exports = mongoose.model("HistoriqueTechnicien", HistoriqueTechnicienSchema);