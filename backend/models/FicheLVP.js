// backend/models/FicheLVP.js
const mongoose = require("mongoose");

const ligneSchema = new mongoose.Schema({
    position: { type: String, required: true },
    etatGeneralBalise: { type: String, default: "" },
    interventions: { type: String, default: "" },
    observations: { type: String, default: "" }
});

const ficheLVPSchema = new mongoose.Schema({
    feuxLVPEast: [ligneSchema],
    feuxLVPWest: [ligneSchema],
    observationsGenerales: { type: String, default: "" },
    date: { type: String, default: "" },
    technicien: { type: String, default: "" },
    signature: { type: String, default: "" }
}, {
    collection: "ficheLVP",
    timestamps: true
});

module.exports = mongoose.model("FicheLVP", ficheLVPSchema);