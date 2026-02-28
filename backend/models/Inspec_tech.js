const mongoose = require("mongoose");

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
            nbrNF: { type: Number, default: 0 } // ✅ AJOUT
        },

        nuit: {
            etat: String,
            observation: String,
            intervention: String,
            nbrNF: { type: Number, default: 0 } // ✅ AJOUT
        },
    }, ],

    status: {
        type: String,
        enum: ["En attente", "Validée"],
        default: "En attente",
    },
});

module.exports = mongoose.model("InspectionTech", inspectionTechSchema);