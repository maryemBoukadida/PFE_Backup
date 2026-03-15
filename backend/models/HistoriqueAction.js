const mongoose = require("mongoose");

const HistoriqueActionSchema = new mongoose.Schema({
    type: String,
    message: String,
    user: String,
    date: { type: Date, default: Date.now },
    dataId: String, // id de la fiche validée
});

module.exports = mongoose.model("HistoriqueAction", HistoriqueActionSchema);