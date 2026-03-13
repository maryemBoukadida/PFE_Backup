const express = require("express");
const router = express.Router();

const ficheSemesRegulateuresController = require("../controllers/ficheSemesRegulateuresController");

// GET dernière fiche semestrielle régulateurs
router.get("/", ficheSemesRegulateuresController.getFicheSemesRegulateures);

// GET fiche par ID
router.get("/:id", ficheSemesRegulateuresController.getFicheSemesRegulateuresById);
//enregistrer la fiche 
router.put('/:id', ficheSemesRegulateuresController.enregistrerFicheSemesRegulateures);


// Envoyer la fiche
router.put('/envoyer/:id', ficheSemesRegulateuresController.envoyerFicheSemesRegulateures);
module.exports = router;