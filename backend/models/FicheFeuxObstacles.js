const mongoose = require("mongoose");

const installationSchema = new mongoose.Schema({
    lieuInstallation: {
        type: String,
        required: true
    },
    alimentation: {
        type: String,
        default: ""
    },
    lampe: {
        type: String,
        default: ""
    },
    observations: {
        type: String,
        default: ""
    }
});

const ficheFeuxObstaclesSchema = new mongoose.Schema({

    installations: [installationSchema],

    observationGenerale: {
        type: String,
        default: ""
    },

    date: {
        type: String,
        default: ""
    },

    technicien: {
        type: String,
        default: ""
    },

    signature: {
        type: String,
        default: ""
    },
    statut: {
        type: String,
        default: "En cours" // ou "Brouillon"
    }

}, {
    collection: "ficheFeuxObstacles" // ⚠️ force mongoose à utiliser cette collection
});

module.exports = mongoose.model(
    "FicheFeuxObstacles",
    ficheFeuxObstaclesSchema
);