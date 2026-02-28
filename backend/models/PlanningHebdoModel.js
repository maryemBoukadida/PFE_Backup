const mongoose = require('mongoose');

const planningHebdoSchema = new mongoose.Schema({
    annee: {
        type: Number,
        required: true
    },
    semaine: {
        type: Number,
        required: true
    },
    jour: {
        type: String,
        required: true,
        enum: ['LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI', 'DIMANCHE']
    },
    unite: {
        type: String,
        required: true,
        enum: ['Production', 'Balisage']
    },
    vacation: {
        type: String,
        enum: ['1ERE', '2EME', null],
        default: null
    },
    equipement: {
        type: String,
        default: null
    },
    statut: {
        type: String,
        default: 'Planifié'
    }
}, {
    timestamps: true,
    collection: 'planning_hebdomadaire'
});

module.exports = mongoose.model('PlanningHebdo', planningHebdoSchema);