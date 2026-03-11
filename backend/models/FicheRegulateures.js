const mongoose = require("mongoose");

const boucleSchema = new mongoose.Schema({

    zone: {
        type: String,
        default: ""
    },

    BOUCLE: {
        type: String,
        required: true
    },

    typePuissance: {
        type: String,
        default: ""
    },

    ISOLEMENT: {
        type: String,
        default: ""
    },

    charge: {
        type: String,
        default: ""
    },

    Iout: {
        B1: { type: String, default: "" },
        B2: { type: String, default: "" },
        B3: { type: String, default: "" },
        B4: { type: String, default: "" },
        B5: { type: String, default: "" }
    },

    InVin: {
        A: { type: String, default: "" },
        V: { type: String, default: "" }
    },

    telecommande: {
        type: String,
        default: ""
    },

    afficheur: {
        type: String,
        default: ""
    },

    clavier: {
        type: String,
        default: ""
    }

});

const ficheRegulateuresSchema = new mongoose.Schema({

    boucles: [boucleSchema],

    observationsGenerales: {
        type: String,
        default: ""
    },

    date: {
        type: String,
        default: ""
    },

    technicienOperateur: {
        type: String,
        default: ""
    },

    signature: {
        type: String,
        default: ""
    }

}, {
    timestamps: true
});


module.exports = mongoose.model(
    "FicheRegulateures",
    ficheRegulateuresSchema,
    "ficheRegulateures" // ⚠️ force l'utilisation de ta collection existante
);