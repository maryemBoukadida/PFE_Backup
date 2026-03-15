const mongoose = require("mongoose");

const LigneSchema = new mongoose.Schema({
    Etat: { type: String, default: "" },
    Interventions: { type: String, default: "" },
    Observations: { type: String, default: "" }
}, { _id: false });

const ZoneSchema = new mongoose.Schema({
    ControleEtatGeneral: { type: LigneSchema, default: () => ({}) },
    IntegriteMecaniqueStabiliteSupports: { type: LigneSchema, default: () => ({}) },
    PartieOptique: { type: LigneSchema, default: () => ({}) },
    ConnectiqueCableConnecteur: { type: LigneSchema, default: () => ({}) },
    EtatPrismes: { type: LigneSchema, default: () => ({}) },
    Enchevetrement: { type: LigneSchema, default: () => ({}) },
    EtatLampes: { type: LigneSchema, default: () => ({}) }
}, { _id: false });

const FlashSchema = new mongoose.Schema({
    ControleEtatGeneral: { type: LigneSchema, default: () => ({}) },
    IntegriteMecaniqueStabiliteSupports: { type: LigneSchema, default: () => ({}) },
    PartieOptique: { type: LigneSchema, default: () => ({}) },
    ConnectiqueCableConnecteur: { type: LigneSchema, default: () => ({}) },
    EtatPrismes: { type: LigneSchema, default: () => ({}) },
    Enchevetrement: { type: LigneSchema, default: () => ({}) },
    EtatLampes: { type: LigneSchema, default: () => ({}) },
    Switch: { type: LigneSchema, default: () => ({}) }
}, { _id: false });

const FicheHorsSolSchema = new mongoose.Schema({

    type: {
        type: String,
        default: "ficheHorsSol"
    },

    feuxHorsSol: {

        bordDePiste: { type: ZoneSchema, default: () => ({}) },

        finDePiste: { type: ZoneSchema, default: () => ({}) },

        bordDeTaxiway: { type: ZoneSchema, default: () => ({}) },

        flash: { type: FlashSchema, default: () => ({}) }

    },

    observationsGenerales: {
        type: String,
        default: ""
    },

    date: {
        type: Date
    },

    techniciens_operateurs: [{
        type: String
    }],

    signature: {
        type: String,
        default: ""
    }

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "FicheHorsSol",
    FicheHorsSolSchema,
    "ficheHorsSql" // 👈 force la collection existante
);