const express = require("express");
const router = express.Router();

const ficheSemesPostesController = require("../controllers/ficheSemesPostesController");

// GET dernière fiche semestrielle des postes
router.get("/", ficheSemesPostesController.getFicheSemesPostes);

// GET fiche par ID
router.get("/:id", ficheSemesPostesController.getFicheSemesPostesById);
// PUT : enregistrer / mettre à jour une fiche semestrielle par ID
router.put("/:id", ficheSemesPostesController.enregistrerFicheSemesPostes);

// PUT : envoyer la fiche
router.put('/envoyer/:id', ficheSemesPostesController.envoyerFicheSemesPostes);

module.exports = router;