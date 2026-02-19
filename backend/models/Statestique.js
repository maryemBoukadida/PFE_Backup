// models/Statistique.js
const mongoose = require("mongoose");

const statistiqueSchema = new mongoose.Schema({
    type: { type: String, required: true }, // exemple: "par_lieu", "par_fournisseur"
    valeur: { type: String }, // exemple: "SST1"
    count: { type: Number, default: 0 },
    date_creation: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Statistique", statistiqueSchema);