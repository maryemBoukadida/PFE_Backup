// models/ficheAnnFeuxSeq.js
const mongoose = require("mongoose");

const elementSchema = new mongoose.Schema({
    verification: { type: String, required: true },
    etat: { type: String, default: "" },
    interventions: { type: String, default: "" },
    observations: { type: String, default: "" }
}, { _id: false });

const blocSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    elements: { type: [elementSchema], default: [] }
}, { _id: false });

const ficheAnnFeuxSeqSchema = new mongoose.Schema({
    type: { type: String, default: "inspection_annuelle_feux_sequentiels" },
    titre: { type: String, default: "FICHE D’INSPECTION ANNUELLE DES FEUX SEQUENTIELS" },
    blocs: { type: [blocSchema], default: [] },
    observations_generales: { type: String, default: "" },
    date: { type: String, default: "" },
    techniciens_operateurs: { type: String, default: "" },
    signature: { type: String, default: "" },
    statut: { type: String, default: "en cours" } // pour suivre l'envoi/validation
}, { timestamps: true });

// Forcer Mongoose à utiliser la collection "ficheAnnSeq"
module.exports = mongoose.model("FicheAnnFeuxSeq", ficheAnnFeuxSeqSchema, "ficheAnnSeq");