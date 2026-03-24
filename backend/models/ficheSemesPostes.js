const mongoose = require("mongoose");

// 🔹 Sous-schema élément
const ElementSchema = new mongoose.Schema({
    verification: { type: String, required: true },
    etat: { type: String, default: "" },
    interventions: { type: String, default: "" },
    observations: { type: String, default: "" }
}, { _id: false });

// 🔹 Sous-schema bloc
const BlocSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    elements: [ElementSchema]
}, { _id: false });

// 🔹 Schema principal
const FicheSemesPostesSchema = new mongoose.Schema({
    type: {
        type: String,
        default: "fiche_semes_postes"
    },

    titre: {
        type: String,
        default: "FICHE SEMESTRIELLE DES POSTES"
    },

    blocs: [BlocSchema],

    observations_generales: {
        type: String,
        default: ""
    },

    date: {
        type: Date,
        default: Date.now
    },


    technicien_operateures: {
        type: String,
        default: ""
    },

    signature: {
        type: String,
        default: ""
    }
}, {
    collection: "ficheSemesPostes",
    timestamps: true
});

module.exports = mongoose.model("FicheSemesPostes", FicheSemesPostesSchema);