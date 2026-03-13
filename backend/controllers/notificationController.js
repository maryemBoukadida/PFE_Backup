const Notification = require("../models/Notification");

// récupérer notifications non lues
exports.getNotifications = async(req, res) => {
    try {

        const notifications = await Notification.find({ read: false })
            .sort({ date: -1 });

        res.json(notifications);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.marquerCommeLue = async(req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification)
            return res.status(404).json({ message: "Notification non trouvée" });

        notification.read = true;
        await notification.save();

        res.json({
            message: "Notification marquée comme lue",
            notification
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};