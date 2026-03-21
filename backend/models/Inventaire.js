const mongoose = require("mongoose");

const equipementSchema = new mongoose.Schema({
    designation: String,
    stock: { type: Number, default: 0 },
    numeroSerie: String,
    codeOracle: String,
    numeroRequisition: String,
    dateLivraison: Date,
    prixUnitaire: Number,
    prixTotal: Number,
    bonCommande: String,
    type: String
});

const inventaireSchema = new mongoose.Schema({
    balisage_gmao: [equipementSchema],
    PG_gmao: [equipementSchema],
    autre: [equipementSchema]
}, {
    collection: "inventaire_GMAO",
    timestamps: true
});
module.exports = mongoose.model("Inventaire", inventaireSchema);