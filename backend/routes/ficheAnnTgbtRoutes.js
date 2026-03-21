const express = require("express");
const router = express.Router();

const ficheAnnTgbtController = require("../controllers/ficheAnnTgbtController");

// GET dernière fiche TGBT
router.get("/", ficheAnnTgbtController.getFicheAnnTgbt);
router.post("/", ficheAnnTgbtController.createFicheAnnTgbt);
// GET fiche par ID
router.get("/:id", ficheAnnTgbtController.getFicheTgbtById);

// PUT enregistrer

// PUT envoyer
router.put("/envoyer/:id", ficheAnnTgbtController.envoyerFicheAnnTgbt);
router.put("/:id", ficheAnnTgbtController.enregistrerFicheAnnTgbt);

module.exports = router; // 🔹 Très important