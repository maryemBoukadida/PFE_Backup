const mongoose = require("mongoose");

const ResultatsSchema = new mongoose.Schema({
    Isolement_Ohm: { type: String, default: "" },
    Tension_test_Vcc: { type: String, default: "" },
    Courant_test_Ac: { type: String, default: "" }
}, { _id: false });

const TestSchema = new mongoose.Schema({
    Duree: { type: String, default: "" }
}, { _id: false });

const BoucleSchema = new mongoose.Schema({
    Type_Puissance: { type: String, default: "" },
    Longueur_M: { type: String, default: "" },
    Continuite_Theorique_Ohm: { type: String, default: "" },
    Continuite_Mesuree_Ohm: { type: String, default: "" },
    Nombre_de_feux: { type: String, default: "" },
    Fuite_Admissible: { type: String, default: "" },
    Isolement_Mini_sous_Calibre_Ohm: { type: String, default: "" },

    Resultats: { type: ResultatsSchema, default: () => ({}) },
    Test: { type: TestSchema, default: () => ({}) },

    Verification_parafoudres: { type: String, default: "" },
    Commentaires: { type: String, default: "" }

}, { _id: false });

const FicheSemesRegulateuresSchema = new mongoose.Schema({

    boucles: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },

    verifications_generales: {
        Remontees_defaut: { type: String, default: "" },
        Etat_general_equipements: { type: String, default: "" },
        Analyse_archivage_cahiers: { type: String, default: "" }
    },

    observations: { type: String, default: "" },

    date: { type: String, default: "" },

    Technicien_Operateurs: { type: String, default: "" },

    signature: { type: String, default: "" }

}, { timestamps: true });

module.exports = mongoose.model(
    "FicheSemesRegulateures",
    FicheSemesRegulateuresSchema,
    "ficheSemesRegulateures" // ⚠️ force l'utilisation de ta collection existante
);