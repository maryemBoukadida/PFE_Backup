const mongoose = require("mongoose");

const historiqueSchema = new mongoose.Schema({
    matricule: { type: String, required: true },
    date: { type: Date, default: Date.now },
    periode: { type: String },
    type: { type: String },


    inspections: [{
        zone: String,
        element: String,

        matin: {
            etat: String,
            nbrNF: Number,
            observation: String,
            intervention: String,
        },

        nuit: {
            etat: String,
            nbrNF: Number,
            observation: String,
            intervention: String,
        },
    }, ],
});

module.exports = mongoose.model("Historique", historiqueSchema);