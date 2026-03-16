const GestionUser = require('../models/GestionUser');

// Récupérer tous les utilisateurs
exports.getGestionUsers = async (req, res) => {
    try {
        const users = await GestionUser.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Créer un utilisateur
exports.createGestionUser = async (req, res) => {
    try {
        const newUser = new GestionUser(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Mettre à jour un utilisateur
exports.updateGestionUser = async (req, res) => {
    try {
        const user = await GestionUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Supprimer un utilisateur
exports.deleteGestionUser = async (req, res) => {
    try {
        await GestionUser.findByIdAndDelete(req.params.id);
        res.json({ message: 'Utilisateur supprimé' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ⬇️ NOUVELLE MÉTHODE : Activer/Désactiver un utilisateur
exports.toggleGestionUserActive = async (req, res) => {
    try {
        const user = await GestionUser.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        user.actif = !user.actif;
        await user.save();
        res.json({ message: 'Statut mis à jour', actif: user.actif });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};