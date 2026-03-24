const mongoose = require("mongoose");

/* ================= Etat ================= */
const EtatSchema = new mongoose.Schema({
    normal: { type: Boolean, default: false },
    anomalie: { type: Boolean, default: false },
    observations: { type: String, default: "" }
}, { _id: false });

/* ================= Element ================= */
const ElementSchema = new mongoose.Schema({
    verification: { type: String },
    normal: { type: Boolean, default: false },
    anomalie: { type: Boolean, default: false },
    observations: { type: String, default: "" }
}, { _id: false });

/* ================= Bloc ================= */
const BlocSchema = new mongoose.Schema({
    titre: { type: String },
    elements: [ElementSchema]
}, { _id: false });

/* ================= MAIN ================= */
const FicheSemesDgsSchema = new mongoose.Schema({

    type: { type: String, default: "fiche_semestrielle_dgs" },

    titre: { type: String, default: "" },

    designation: { type: String, default: "" },

    lieu_installation: { type: String, default: "" },

    technicien: { type: String, default: "" },

    signature: { type: String, default: "" },

    date: { type: Date, default: Date.now },

    blocs: [BlocSchema],

    observations: { type: String, default: "" },

    statut: { type: String, default: "brouillon" }

});

module.exports = mongoose.model(
    "FicheSemesDgs",
    FicheSemesDgsSchema,
    "ficheSemesDgs"
);