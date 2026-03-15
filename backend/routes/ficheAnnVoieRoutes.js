const express = require("express");
const router = express.Router();

const ficheAnnVoieController = require("../controllers/ficheAnnVoieController");


// GET dernière fiche
router.get("/", ficheAnnVoieController.getFicheAnnVoie);

// GET fiche par ID
router.get("/:id", ficheAnnVoieController.getFicheVoieById);

// PUT enregistrer
router.put("/:id", ficheAnnVoieController.enregistrerFicheAnnVoie);

// PUT envoyer
router.put("/envoyer/:id", ficheAnnVoieController.envoyerFicheAnnVoie);

module.exports = router;