const mongoose = require("mongoose");

// Schema pour chaque DGS
const dgsSchema = new mongoose.Schema({
    numero: { type: String, required: true },
    propreteFenetreFrontale: { type: String, default: "" },
    propreteAfficheur: { type: String, default: "" },
    boitierCommande: { type: String, default: "" },
    observation: { type: String, default: "" }
});

// Schema de la fiche DGS
const ficheDGSSchema = new mongoose.Schema({
    type: { type: String, default: "inspection_dgs" },
    dgs: [dgsSchema],
    observationGenerale: { type: String, default: "" },
    date: { type: String },
    technicien: { type: String },
    statut: {
        type: String,
        enum: ["brouillon", "envoyee", "validee"],
        default: "brouillon"
    }
}, { timestamps: true });


// ⚠ Important : préciser le nom exact de la collection existante
module.exports = mongoose.model("FicheDGS", ficheDGSSchema, "ficheDGS");