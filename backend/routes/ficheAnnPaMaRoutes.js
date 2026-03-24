const express = require("express");
const router = express.Router();
const ficheAnnPaMaController = require("../controllers/ficheAnnPaMaController");

// GET dernière fiche
router.get("/", ficheAnnPaMaController.getFicheAnnPaMa);
// POST créer nouvelle fiche
router.post("/", ficheAnnPaMaController.creerFicheAnnPaMa);
// GET fiche par ID
router.get("/:id", ficheAnnPaMaController.getFicheAnnPaMaById);
// PUT envoyer
router.put("/envoyer/:id", ficheAnnPaMaController.envoyerFicheAnnPaMa);

// PUT enregistrer
router.put("/:id", ficheAnnPaMaController.enregistrerFicheAnnPaMa);
router.post("/valider", ficheAnnPaMaController.validerFicheAnnPaMa);



module.exports = router;