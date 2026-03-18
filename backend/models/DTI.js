const mongoose = require('mongoose');
const dtiSchema = new mongoose.Schema({
    titre: String,
    equipement: String,
    description: String,
    techniciens: [String],
    image: String,
    date: Date,
    statut: {
        type: String,
        enum: ['urgente', 'normale', 'en_cours', 'terminee'],
        default: 'urgente'
    },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('DTI', dtiSchema);