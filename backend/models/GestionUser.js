const mongoose = require('mongoose');

const gestionUserSchema = new mongoose.Schema({
    matricule: { type: String, required: true, unique: true },
    nom_complet: String,
    telephone: String,
    department: String,
    email: String,
    role: String,
    actif: { type: Boolean, default: true }
}, { timestamps: true, collection: 'gestion_utilisateurs' });

module.exports = mongoose.model('GestionUser', gestionUserSchema);