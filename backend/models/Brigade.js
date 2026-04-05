const mongoose = require('mongoose');

const ligneSchema = new mongoose.Schema({
    typeIntervention: String,
    natureTravaux: String,
    lieu: String,
    natureMaintenance: String,
    naturePreventive: String,
    action: String,
    technicien: String,
    panne: String,
    cause: String,
    dateDetection: { type: Date }, // Date + heure
    dateReparation: { type: Date }, // Date + heure
    DureeEnMinute: { type: Number },
    pieces: String,
    quantite: Number,
});

const ficheBrigadeSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },

    blocsBrigade: {
        jour: [ligneSchema],
        nuit: [ligneSchema],
    },

    statut: {
        type: String,
        enum: ['brouillon', 'envoyee', 'validee'],
        default: 'brouillon',
    },
});

module.exports = mongoose.model('FicheBrigade', ficheBrigadeSchema);