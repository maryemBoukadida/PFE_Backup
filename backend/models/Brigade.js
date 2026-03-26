const mongoose = require('mongoose');

const technicienSchema = new mongoose.Schema({
    nom: String,
    signature: String,
});

const ligneSchema = new mongoose.Schema({
    consigne: String,
    inspection: String,
});

const ficheBrigadeSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },

    // 🔥 CHANGEMENT ICI
    blocsBrigade: {
        matin: [ligneSchema],
        apresMidi: [ligneSchema],
        nuit: [ligneSchema],
    },

    techniciens: {
        matin: [technicienSchema],
        apresMidi: [technicienSchema],
        nuit: [technicienSchema],
    },

    statut: {
        type: String,
        enum: ['brouillon', 'envoyee', 'validée'],
        default: 'brouillon',
    },
});

module.exports = mongoose.model('FicheBrigade', ficheBrigadeSchema);