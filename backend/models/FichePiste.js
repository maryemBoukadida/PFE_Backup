const mongoose = require("mongoose");

// Sous-schema pour les vérifications (zones classiques)
const VerificationSchema = new mongoose.Schema({
    element: {
        type: String,
        required: true
    },
    etat: {
        type: String,
        default: ""
    },
    intervention: {
        type: String,
        default: ""
    },
    observation: {
        type: String,
        default: ""
    }
});

// Sous-schema pour les zones
const ZoneSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    verifications: {
        type: [VerificationSchema],
        default: undefined // permet de ne pas créer un tableau vide si la zone n’a pas de vérifications
    },
    // Pour la zone "Bord de la piste" qui n'a pas de verifications
    etat: {
        type: String,
        default: ""
    },
    intervention: {
        type: String,
        default: ""
    },
    observation: {
        type: String,
        default: ""
    }
});

// Schema principal
const FichePisteSchema = new mongoose.Schema({
    zonePrincipale: {
        type: String,
        default: "PISTE"
    },
    zones: [ZoneSchema],
    observationsGenerales: {
        type: String,
        default: ""
    },
    date: {
        type: Date
    },
    techniciensOperateurs: [{
        type: String
    }],
    // ✅ NOUVEAU CHAMP STATUT
    statut: {
        type: String,
        enum: ["brouillon", "envoyee", "validee"],
        default: "brouillon"
    }
});

module.exports = mongoose.model("FichePiste", FichePisteSchema, "fichePiste");