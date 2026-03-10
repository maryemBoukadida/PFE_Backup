const Notification = require("../models/Notification");

// Récupérer toutes les notifications (les plus récentes en premier)
exports.getNotifications = async(req, res) => {
    try {
        const notifications = await Notification.find()
            .sort({ date: -1 }) // notifications les plus récentes en haut
            .populate('ficheId', 'date technicien statut'); // si tu veux infos de la fiche associée

        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Optionnel : marquer une notification comme lue
exports.marquerCommeLue = async(req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) return res.status(404).json({ message: "Notification non trouvée" });

        notification.lu = true;
        await notification.save();

        res.json({ message: "Notification marquée comme lue", notification });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};