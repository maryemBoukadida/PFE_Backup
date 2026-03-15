const mongoose = require("mongoose");

// Sous-schema pour chaque vérification
const VerificationSchema = new mongoose.Schema({
    etat: { type: String, default: "" },
    intervention_a_faire: { type: String, default: "" },
    observation: { type: String, default: "" }
}, { _id: false });

// Schema principal
const FicheAnnInfrastructureSchema = new mongoose.Schema({

    PISTE: {
        type: Map,
        of: {
            type: Map,
            of: VerificationSchema
        }
    },

    observationsGenerales: {
        type: String,
        default: ""
    },

    date: {
        type: Date
    },

    techniciens_operateurs: {
        type: [String],
        default: []
    }

}, {
    collection: "ficheAnnInfrastructure" // force le nom de la collection
});

module.exports = mongoose.model(
    "FicheAnnInfrastructure",
    FicheAnnInfrastructureSchema
);