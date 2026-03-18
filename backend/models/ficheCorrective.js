const mongoose = require("mongoose");

const diagnosticSchema = new mongoose.Schema({
    panneCause: { type: String, default: "" },
    effet: { type: String, default: "" },
    gravite: { type: String, default: "" }
}, { _id: false }); // _id: false pour éviter d’avoir un id pour chaque ligne si pas nécessaire

const depannageSchema = new mongoose.Schema({
    piecesDeRechange: { type: String, default: "" }
}, { _id: false });

const technicienSchema = new mongoose.Schema({
    nom: { type: String, default: "" },
}, { _id: false });

const ficheCorrectiveItemSchema = new mongoose.Schema({
    date: { type: String, default: "" },
    designation: { type: String, default: "" },
    lieuInstallation: { type: String, default: "" },
    dateDetection: { type: String, default: "" },
    reclamationPar: { type: String, default: "" },
    personneContactee: { type: String, default: "" },
    debutIntervention: { type: String, default: "" },
    remiseEnService: { type: String, default: "" },
    diagnostic: { type: [diagnosticSchema], default: [] },
    depannageReparation: { type: [depannageSchema], default: [] },
    tempsAlloue: { type: String, default: "" },
    observationsGenerales: { type: String, default: "" },
    techniciensOperateurs: { type: [technicienSchema], default: [] },
    signature: { type: String, default: "" }
}, { _id: false });

const ficheCorrectiveSchema = new mongoose.Schema({
    type: { type: String, default: "corrective" },
    ficheCorrective: { type: [ficheCorrectiveItemSchema], default: [] }
}, { collection: "ficheCorrective" }); // forcer la collection

// Exporter le modèle
module.exports = mongoose.model("FicheCorrective", ficheCorrectiveSchema);