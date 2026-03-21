const mongoose = require("mongoose");

const observationSchema = new mongoose.Schema({
    nf: String,
    fonctionnement: String,
    interventions: String,
    observations: String
});

const ligneSchema = new mongoose.Schema({
    designation: String,
    matin: observationSchema,
    nuit: observationSchema
});

const groupeSchema = new mongoose.Schema({
    titre: String,
    lignes: [ligneSchema]
});

const ficheBalisageSchema = new mongoose.Schema({
    date: Date,
    groupes: [groupeSchema],
    technicien: String,
    statut: {
        type: String,
        default: "enregistre"
    }
});

module.exports = mongoose.model("FicheBalisage", ficheBalisageSchema);