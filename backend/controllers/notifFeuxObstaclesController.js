const Notification = require("../models/Notification");

exports.getNotifications = async(req, res) => {
    try {
        // Récupérer toutes les notifications, triées par date décroissante
        const notifications = await Notification.find().sort({ date: -1 });

        // Si aucune notification, retourner un tableau vide
        if (!notifications || notifications.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(notifications);
    } catch (error) {
        console.error("Erreur getNotifications:", error.message);
        res.status(500).json({ message: "Erreur serveur: " + error.message });
    }
};