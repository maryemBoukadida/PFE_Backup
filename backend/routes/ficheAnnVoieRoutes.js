const express = require("express");
const router = express.Router();

const ficheAnnVoieController = require("../controllers/ficheAnnVoieController");

router.post("/", ficheAnnVoieController.createFicheAnnVoie);
// GET dernière fiche
router.get("/", ficheAnnVoieController.getFicheAnnVoie);

// GET fiche par ID
router.get("/:id", ficheAnnVoieController.getFicheVoieById);

// PUT enregistrer
router.put("/:id", ficheAnnVoieController.enregistrerFicheAnnVoie);

// PUT envoyer
router.put("/envoyer/:id", ficheAnnVoieController.envoyerFicheAnnVoie);
router.post("/valider", ficheAnnVoieController.validerFicheAnnVoie);

module.exports = router;