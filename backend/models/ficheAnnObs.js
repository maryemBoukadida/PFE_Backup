const mongoose = require("mongoose");

const ElementSchema = new mongoose.Schema({
    lieu: { type: String, default: "" },
    nettoyage: { type: String, default: "" },
    serrageBornes: { type: String, default: "" },
    priseDeTerre: { type: String, default: "" },
    isolementConducteurs: { type: String, default: "" },
    continuiteProtection: { type: String, default: "" },
    verificationSchemas: { type: String, default: "" },
    intervention: { type: String, default: "" },
    observations: { type: String, default: "" }
}, { _id: false });

const SectionSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    elements: [ElementSchema]
}, { _id: false });

const FicheAnnObsSchema = new mongoose.Schema({

    type: {
        type: String,
        default: "inspection_annuelle_feux_obstacles"
    },

    sections: [SectionSchema],

    observations_generales: {
        type: String,
        default: ""
    },

    date: {
        type: String,
        default: ""
    },

    technicien_operateur: {
        type: String,
        default: ""
    },

    signature: {
        type: String,
        default: ""
    }

}, {
    collection: "ficheAnnObs", // ⚠️ force mongoose à utiliser la collection existante
    timestamps: true
});

module.exports = mongoose.model("FicheAnnObs", FicheAnnObsSchema);