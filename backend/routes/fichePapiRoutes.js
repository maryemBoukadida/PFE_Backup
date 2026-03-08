const express = require("express");
const router = express.Router();
const ficheController = require("../controllers/fichePapiController");

// 🔹 GET toutes les fiches
router.get("/", ficheController.getFiches);

// 🔹 Notifications
router.get("/notifications", ficheController.getFichePapiNotifications);
router.put("/notifications/:id/read", ficheController.markNotificationRead);

// 🔹 Historique
router.get("/historiques", ficheController.getHistoriquePapi);

// 🔹 Validation (avec ID)
router.post("/valider/:id", ficheController.validerFiche);

// 🔹 Send
router.put("/send/:id", ficheController.sendFiche);

// 🔹 Update
router.put("/:id", ficheController.updateFiche);

// 🔹 GET par ID (toujours en dernier)
router.get("/:id", ficheController.getFicheById);

module.exports = router;