const mongoose = require('mongoose');

const profilSchema = new mongoose.Schema({
    matricule: { type: String, required: true, unique: true },
    photo: String,
    poste: String,
    date_embauche: Date,
    adresse: String,
    telephone_perso: String,
    date_naissance: Date
}, { timestamps: true, collection: 'profils' });

module.exports = mongoose.model('Profil', profilSchema);