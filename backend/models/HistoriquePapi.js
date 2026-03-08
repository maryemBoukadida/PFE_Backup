// models/HistoriquePapi.js
const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema({
    element: { type: String, required: true },
    v11_09: { type: String, default: "" },
    v12_09: { type: String, default: "" },
    v21_09: { type: String, default: "" },
    v22_09: { type: String, default: "" },
    v31_09: { type: String, default: "" },
    v32_09: { type: String, default: "" },
    v41_09: { type: String, default: "" },
    v42_09: { type: String, default: "" },
    v11_27: { type: String, default: "" },
    v12_27: { type: String, default: "" },
    v21_27: { type: String, default: "" },
    v22_27: { type: String, default: "" },
    v31_27: { type: String, default: "" },
    v32_27: { type: String, default: "" },
    v41_27: { type: String, default: "" },
    v42_27: { type: String, default: "" }
}, { _id: false });

const historiquePapiSchema = new mongoose.Schema({
    verifications: [verificationSchema],
    observations: { type: String, default: "" },
    date: { type: Date },
    techniciens: { type: String, default: "" },
    type: { type: String, default: "PAPI" } // utile pour le filtre
}, { collection: "historiquePapi" });

module.exports = mongoose.model("HistoriquePapi", historiquePapiSchema);