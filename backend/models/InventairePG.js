const mongoose = require("mongoose");

const inventairePGSchema = new mongoose.Schema({
    code_oracle: { type: String, required: true },
    reference: { type: String, required: true },
    designation: { type: String, required: true },
    stock_actuel: { type: Number, required: true },
}, { collection: "inventairePG" });

module.exports = mongoose.model("InventairePG", inventairePGSchema);