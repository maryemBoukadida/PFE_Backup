const express = require("express");
const router = express.Router();
const fichePisteController = require("../controllers/fichePisteController");


// récupérer la fiche piste
router.get("/", fichePisteController.getFichePiste);

// enregistrer modifications
router.put("/:id", fichePisteController.updateFichePiste);

// envoyer fiche
router.post("/envoyer/:id", fichePisteController.envoyerFiche);

// recuperer fiche piste
router.get("/:id", fichePisteController.getFichePisteById);
module.exports = router;