const express = require("express");
const router = express.Router();
const ficheAidesRadiosController = require("../controllers/ficheAidesRadiosController");

router.get("/", ficheAidesRadiosController.getFicheAidesRadios);
router.get("/:id", ficheAidesRadiosController.getFicheAidesRadiosById); // <-- nouvelle route par ID

// PUT pour mettre à jour une fiche par ID
router.put("/:id", ficheAidesRadiosController.enregistrerFicheAidesRadios);

// PUT pour envoyer la fiche
router.put("/envoyer/:id", ficheAidesRadiosController.envoyerFicheAidesRadios);
module.exports = router;