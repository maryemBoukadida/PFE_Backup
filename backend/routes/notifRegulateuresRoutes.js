// backend/routes/feuxObstaclesNotifRoutes.js
const express = require("express");
const router = express.Router();
const notifRegulateuresController = require("../controllers/notifRegulateuresController")
    // GET toutes les notifications pour Feux d'obstacles
router.get("/", notifRegulateuresController.getNotifications);

module.exports = router;