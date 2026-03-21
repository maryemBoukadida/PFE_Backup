const mongoose = require('mongoose');
const { Schema } = mongoose;

// ================= ELEMENT =================
const elementSchema = new Schema({
    nom: { type: String, required: true },

    etat: {
        type: String,
        enum: ["OK", "HS", ""], // 🔥 validation
        default: ""
    },

    interventions: { type: String, default: "" },
    observations: { type: String, default: "" },
}, { _id: false });

// ================= POSTE =================
const posteSchema = new Schema({
    nom: { type: String, required: true },
    elements: { type: [elementSchema], default: [] },
}, { _id: false });

// ================= FICHE =================
const ficheAnnTgbtSchema = new Schema({
    postes: {
        type: [posteSchema],
        required: true,
        default: []
    },

    observations_generales: {
        type: String,
        default: ""
    },

    technicien_operateurs: {
        type: String,
        required: true
    },

    signature: {
        type: String,
        default: ""
    },

    date: {
        type: Date,
        default: Date.now
    },

    // 🔥 AJOUT IMPORTANT (comme fiche corrective)
    statut: {
        type: String,
        enum: ["brouillon", "enregistré", "envoyé"],
        default: "brouillon"
    }

}, {
    timestamps: true // 🔥 createdAt + updatedAt
});

// ================= EXPORT =================
const FicheAnnTgbt = mongoose.model(
    'FicheAnnTgbt',
    ficheAnnTgbtSchema,
    'ficheAnnTgbt'
);

module.exports = FicheAnnTgbt;