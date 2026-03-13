const express = require("express");
const router = express.Router();
//const Notification = require("../models/Notification");

const notificationController = require("../controllers/notificationController");

// Récupérer toutes les notifications
router.get("/", notificationController.getNotifications);

// Marquer une notification comme lue
router.put("/:id/read", notificationController.marquerCommeLue);



module.exports = router;