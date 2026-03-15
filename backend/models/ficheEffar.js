const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema({
    etat: { type: String, default: "" },
    intervention_a_faire: { type: String, default: "" },
    observation: { type: String, default: "" },
}, { _id: false });

const hautParleurSchema = new mongoose.Schema({
    "1": { type: verificationSchema, default: () => ({}) },
    "2": { type: verificationSchema, default: () => ({}) },
}, { _id: false });

const verificationsSchema = new mongoose.Schema({
    panneaux_solaires: { type: verificationSchema, default: () => ({}) },
    haut_parleur: { type: hautParleurSchema, default: () => ({}) },
    transmission: { type: verificationSchema, default: () => ({}) },
    telecommande: { type: verificationSchema, default: () => ({}) },
    modem: { type: verificationSchema, default: () => ({}) },
    batterie: { type: verificationSchema, default: () => ({}) },
    fusible: { type: verificationSchema, default: () => ({}) },
}, { _id: false });

const ficheSchema = new mongoose.Schema({
    fiche: { type: String, required: true },
    verifications: { type: verificationsSchema, default: () => ({}) }
}, { _id: false });

const ficheEffarSchema = new mongoose.Schema({
    fiches: { type: [ficheSchema], default: [] },
    observations_generales: { type: String, default: "" },
    date: { type: String, default: "" },
    technicien_operateur: { type: String, default: "" },
    signature: { type: String, default: "" }
}, { collection: "ficheEffar" }); // <-- force Mongoose à utiliser cette collection

module.exports = mongoose.models.FicheEffar || mongoose.model("FicheEffar", ficheEffarSchema);