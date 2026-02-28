const mongoose = require("mongoose"); // ✅ OBLIGATOIRE

const inspectionTechSchema = new mongoose.Schema({
    matricule: { type: String, required: true },
    periode: { type: String, default: "JOURNALIERE" },
    date: { type: Date, default: Date.now },

    inspections: [{
        zone: String,
        element: String,
        matin: {
            etat: String,
            observation: String,
            intervention: String,
        },
        nuit: {
            etat: String,
            observation: String,
            intervention: String,
        },
    }, ],

    status: {
        type: String,
        enum: ["En attente", "Validée"],
        default: "En attente",
    },
});

module.exports = mongoose.model("InspectionTech", inspectionTechSchema);