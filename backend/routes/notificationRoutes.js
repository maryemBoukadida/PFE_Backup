const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

// Récupérer toutes les notifications
router.get("/", notificationController.getNotifications);

// Marquer une notification comme lue
//router.put("/lue/:id", notificationController.marquerCommeLue);
router.put("/:id/read", async(req, res) => {
    try {

        const notif = await Notification.findByIdAndUpdate(
            req.params.id, { read: true }, { new: true }
        );

        if (!notif) {
            return res.status(404).json({ message: "Notification non trouvée" });
        }

        res.json(notif);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;