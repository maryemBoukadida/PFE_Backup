const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    matricule: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'technicien', 'superviseur'],
        default: 'technicien'
    },
    nom_complet: {
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Supprimer l'index email s'il existe (optionnel)
userSchema.index({ email: 1 }, { unique: false, sparse: true });

module.exports = mongoose.model('User', userSchema);