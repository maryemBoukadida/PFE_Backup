const mongoose = require('mongoose');

const controleSchema = new mongoose.Schema({
    specification: { type: String, default: "" },
    designation: { type: String, required: true },
    matin: { normal: Boolean, anomalie: Boolean },
    apresMidi: { normal: Boolean, anomalie: Boolean },
    nuit: { normal: Boolean, anomalie: Boolean },
});

const tempsInspectionSchema = new mongoose.Schema({
    debut: { type: String }, // "08:00" par exemple
    fin: { type: String }, // "12:00"
    tempsAlloue: { type: String }, // calculé automatiquement en HH:MM
});

const observationsSchema = new mongoose.Schema({
    matin: { type: String },
    apresMidi: { type: String },
    nuit: { type: String },
});

const techniciensSchema = new mongoose.Schema({
    matin: [String],
    apresMidi: [String],
    nuit: [String],
});

const ficheNoBreakSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    designation: { type: String, required: true },
    lieuInstallation: { type: String, required: true },
    controles: [controleSchema],
    tempsInspection: {
        matin: tempsInspectionSchema,
        apresMidi: tempsInspectionSchema,
        nuit: tempsInspectionSchema,
        total: { type: String }, // somme des 3 temps alloués
    },
    observations: observationsSchema,
    techniciens: techniciensSchema,
    operateurs: techniciensSchema,
});

module.exports = mongoose.model('FicheNoBreak', ficheNoBreakSchema);