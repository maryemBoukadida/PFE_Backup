const express = require("express");
const router = express.Router();
const { envoyerInspection, getNotifications, getFicheById } = require("../controllers/inspectionstechController");

// 🔹 Envoyer une fiche (technicien)
router.post("/envoyer", envoyerInspection);

// 🔹 Obtenir toutes les notifications (admin)
router.get("/notifications", getNotifications);

// 🔹 Obtenir fiche par ID
router.get("/:id", getFicheById);


module.exports = router;