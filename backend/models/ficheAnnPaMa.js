const mongoose = require('mongoose');

// ===================== Sous-schéma pour les lignes des tableaux =====================
const LigneSchema = new mongoose.Schema({}, { strict: false });

// ===================== Schéma pour chaque tableau =====================
const TableauSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    verifications: [{ type: String }],
    lignes: { type: Object, default: {} }
});

// ===================== Schéma principal =====================
const FicheAnnPaMaSchema = new mongoose.Schema({
    tableaux: [TableauSchema],
    observations_generales: { type: String, default: '' },
    date: { type: String, default: '' },
    techniciens_operateurs: [{ type: String }],
    signature: { type: String, default: '' },
    statut: { type: String, default: 'brouillon' } // pour suivi envoi
}, {
    collection: 'ficheAnnPaMa'
});

const FicheAnnPaMa = mongoose.model('FicheAnnPaMa', FicheAnnPaMaSchema);

module.exports = FicheAnnPaMa;