const express = require("express");
const router = express.Router();

const ficheAnnTgbtController = require("../controllers/ficheAnnTgbtController");

// GET dernière fiche TGBT
router.get("/", ficheAnnTgbtController.getFicheAnnTgbt);

// GET fiche par ID
router.get("/:id", ficheAnnTgbtController.getFicheTgbtById);

// PUT enregistrer
router.put("/:id", ficheAnnTgbtController.enregistrerFicheAnnTgbt);

// PUT envoyer
router.put("/envoyer/:id", ficheAnnTgbtController.envoyerFicheAnnTgbt);

module.exports = router; // 🔹 Très important