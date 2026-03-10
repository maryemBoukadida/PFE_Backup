const express = require("express");
const router = express.Router();
const ficheDGSController = require("../controllers/ficheDGSController");
// récupérer fiche
router.get("/", ficheDGSController.getFicheDGS);
// Enregistrer fiche (brouillon)
router.put("/enregistrer/:id", ficheDGSController.enregistrerFicheDGS);

// envoyer fiche
router.post("/envoyer/:id", ficheDGSController.envoyerFicheDGS);
// recuperation donen by id
router.get("/:id", ficheDGSController.getFicheDGSById);
module.exports = router;