const mongoose = require("mongoose");

// Sous-schema pour chaque ligne de contrôle
const ControleSchema = new mongoose.Schema({
    element: String,
    etat: String,
    interventions: String,
    observations: String
}, { _id: false });

// Sous-schema pour chaque poste
const PosteSchema = new mongoose.Schema({
    controles: [ControleSchema]
}, { _id: false });

// Schema principal
const FicheSemesPostesSchema = new mongoose.Schema({

    posteSST1: PosteSchema,

    posteSST2: PosteSchema,

    posteTC: PosteSchema,

    observations_generales: String,

    date: String,

    technicien_operateures: String,

    signature: String

}, {
    collection: "ficheSemesPostes" // force mongoose à utiliser ta collection existante
});

module.exports = mongoose.model("FicheSemesPostes", FicheSemesPostesSchema);