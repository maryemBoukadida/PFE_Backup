const mongoose = require("mongoose");

const inspectionSchema = new mongoose.Schema({
    date: { type: String, required: true },
    periode: { type: String, default: "JOURNALIERE" },
    techniciens: [String],
    inspections: [{
        zone: String,
        element: String,
        matin: {
            etat: { type: String, enum: ["OK", "HS"] },
            observation: String,
            intervention: String
        },
        nuit: {
            etat: { type: String, enum: ["OK", "HS"] },
            observation: String,
            intervention: String
        }
    }]
});

module.exports = mongoose.model("Inspection", inspectionSchema, "inspectionsGB");