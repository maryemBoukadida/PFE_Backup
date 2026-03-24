const express = require("express");
const router = express.Router();

const ficheSemesPostesController = require("../controllers/ficheSemesPostesController");

// ✅ CREER UNE FICHE
router.post("/", ficheSemesPostesController.creerFicheSemesPostes);

// ✅ RECUPERER TOUTES LES FICHES
router.get("/", ficheSemesPostesController.getFichesSemesPostes);

// ✅ RECUPERER UNE FICHE PAR ID
router.get("/:id", ficheSemesPostesController.getFicheSemesPostesById);

// ✅ METTRE À JOUR UNE FICHE
router.put("/:id", ficheSemesPostesController.enregistrerFicheSemesPostes);

// ✅ ENVOYER LA FICHE
router.put("/envoyer/:id", ficheSemesPostesController.envoyerFicheSemesPostes);

// ✅ VALIDER LA FICHE
router.post("/valider", ficheSemesPostesController.validerFicheSemesPostes);

module.exports = router;