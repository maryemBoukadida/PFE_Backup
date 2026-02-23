const mongoose = require("mongoose");

const inventaireBALISAGESchema = new mongoose.Schema({
    code: { type: String, required: true },
    designation: { type: String }, // optionnel si c'est un tableau
    quantite: { type: Number, required: true },
}, { collection: "inventaireBALISAGE" });

module.exports = mongoose.model("InventaireBALISAGE", inventaireBALISAGESchema);