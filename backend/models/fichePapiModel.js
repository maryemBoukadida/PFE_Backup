const mongoose = require("mongoose");

// 🔹 Sous-schema pour chaque ligne (ANGLE, FILTRE, etc.)
const verificationSchema = new mongoose.Schema({
    element: { type: String, required: true },

    // 🔸 Tableau 09
    v11_09: { type: String, default: "" },
    v12_09: { type: String, default: "" },
    v21_09: { type: String, default: "" },
    v22_09: { type: String, default: "" },
    v31_09: { type: String, default: "" },
    v32_09: { type: String, default: "" },
    v41_09: { type: String, default: "" },
    v42_09: { type: String, default: "" },

    // 🔸 Tableau 27
    v11_27: { type: String, default: "" },
    v12_27: { type: String, default: "" },
    v21_27: { type: String, default: "" },
    v22_27: { type: String, default: "" },
    v31_27: { type: String, default: "" },
    v32_27: { type: String, default: "" },
    v41_27: { type: String, default: "" },
    v42_27: { type: String, default: "" }

}, { _id: false });


// 🔹 Schema principal (une fiche complète)
const fichePapiSchema = new mongoose.Schema({

    verifications: [verificationSchema], // tableau de lignes

    observations: { type: String, default: "" },

    date: { type: Date },

    techniciens: { type: String, default: "" },

    status: { type: String, default: "En cours" }

}, { collection: "fichePapi" });

module.exports = mongoose.model("FichePapi", fichePapiSchema);