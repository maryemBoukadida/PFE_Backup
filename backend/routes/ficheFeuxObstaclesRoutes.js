const express = require("express");
const router = express.Router();

// Import correct du contrôleur
const ficheFeuxObstaclesController = require("../controllers/ficheFeuxObstaclesController");

// GET fiche
router.get("/", ficheFeuxObstaclesController.getFicheFeuxObstacles);

// PUT : enregistrer la fiche
router.put("/enregistrer/:id", ficheFeuxObstaclesController.enregistrerFicheFeuxObstacles);

// POST : envoyer la fiche → crée notification
router.post("/envoyer/:id", ficheFeuxObstaclesController.envoyerFicheFeuxObstacles);
router.post('/valider', ficheFeuxObstaclesController.validerFicheFeuxObstacles);

// Pour récupérer toutes les notifications
router.get("/:id", ficheFeuxObstaclesController.getFicheDGSById);

module.exports = router;