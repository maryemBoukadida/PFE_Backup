const express = require("express");
const router = express.Router();
const ficheLVPController = require('../controllers/ficheLVPController');

// 🔹 GET dernière fiche LVP
//router.get("/latest", ficheLVPController.getLatestFicheLVP);
router.get("/", ficheLVPController.getFicheLVP);
// 🔹 GET toutes les fiches
router.get("/all", ficheLVPController.getAllFiches);

// 🔹 GET fiche LVP par ID
router.get("/:id", ficheLVPController.getFicheLVP);

// 🔹 PUT pour enregistrer une fiche
router.put("/enregistrer/:id", ficheLVPController.enregistrerFicheLVP);

// 🔹 POST pour envoyer la fiche
router.post("/envoyer/:id", ficheLVPController.envoyerFicheLVP);

module.exports = router;