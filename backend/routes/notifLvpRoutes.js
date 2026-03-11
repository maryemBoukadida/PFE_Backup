// backend/routes/feuxObstaclesNotifRoutes.js
const express = require("express");
const router = express.Router();
const notifLvpController = require("../controllers/notifLvpController");

// GET toutes les notifications pour Feux d'obstacles
router.get("/", notifLvpController.getNotifications);

module.exports = router;