const mongoose = require("mongoose");

const SousElementSchema = new mongoose.Schema({
    type: String,
    etat: String,
    interventions: String,
    observations: String
}, { _id: false });

const ElementSchema = new mongoose.Schema({
    element: String,
    etat: String,
    interventions: String,
    observations: String,
    sous_elements: [SousElementSchema]
}, { _id: false });

const PosteSchema = new mongoose.Schema({
    poste_BT_GLIDE09: [ElementSchema],
    poste_BT_GLIDE027: [ElementSchema],
    poste_BT_LOC09: [ElementSchema],
    poste_BT_LOC27: [ElementSchema],
    poste_BT_DVOR: [ElementSchema]
}, { _id: false });

const FicheAidesRadiosSchema = new mongoose.Schema({

    fiche: {
        type: String,
        default: "Inspection Mensuelle des Aides Radios"
    },

    poste_MT_SST2: [ElementSchema],

    TGBT_Aides_Radios: PosteSchema,

    observations_generales: String,

    date: String,

    technicien_operateur: String,

    signature: String

});

module.exports = mongoose.model(
    "FicheAidesRadios",
    FicheAidesRadiosSchema,
    "ficheAidesRadios" // ⚠️ nom EXACT de la collection
);