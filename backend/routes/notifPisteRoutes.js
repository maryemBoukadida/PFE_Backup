const express = require("express");
const router = express.Router();

const notifController = require("../controllers/notifPisteController");

// récupérer toutes les notifications (admin)
router.get("/", notifController.getNotifications);

module.exports = router;