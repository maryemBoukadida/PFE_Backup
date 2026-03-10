/*
const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

router.get("/", notificationController.getNotifications);

module.exports = router;
*/
// backend/routes/feuxObstaclesNotifRoutes.js
const express = require("express");
const router = express.Router();
const notifFeuxController = require("../controllers/notifFeuxObstaclesController");

// GET toutes les notifications pour Feux d'obstacles
router.get("/", notifFeuxController.getNotifications);

module.exports = router;