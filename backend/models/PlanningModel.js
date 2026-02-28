const mongoose = require('mongoose');

const planningSchema = new mongoose.Schema({
    // ✅ SUPPRIMEZ COMPLÈTEMENT _id - MongoDB le gère automatiquement
    mois: {
        type: String,
        required: true,
        enum: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
               'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    },
    semaine: {
        type: String,
        required: true
    },
    date_affichage: {
        type: String,
        required: true
    },
    equipement: {
        type: String,
        required: true
    },
    tache: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Production', 'Balisage', 'Maintenance', 'Inspection']
    },
    code_tache: {
        type: String,
        required: true
    },
    responsable: {
        type: String,
        default: 'À affecter'
    },
    statut: {
        type: String,
        required: true,
        enum: ['Planifié', 'En cours', 'Terminé', 'Annulé', 'Reporté'],
        default: 'Planifié'
    },
    priorite: {
        type: String,
        required: true,
        enum: ['Basse', 'Moyenne', 'Haute', 'Critique'],
        default: 'Moyenne'
    },
    annee: {
        type: Number,
        required: true
    },
    frequence: {
        type: String,
        required: true,
        enum: ['Personnalisée', 'Mensuelle', 'Bimensuelle', 'Hebdomadaire', 'Trimestrielle', 'Semestrielle', 'Annuelle']
    }
}, {
    timestamps: true,
    collection: 'planning_annuelle'
});

// Index pour améliorer les performances
planningSchema.index({ annee: 1, mois: 1, semaine: 1 });
planningSchema.index({ statut: 1 });
planningSchema.index({ frequence: 1 });

module.exports = mongoose.model('Planning', planningSchema);