const express = require('express');
const router = express.Router();
const ficheFeuxEncastresController = require('../controllers/ficheFeuxEncastresController');

// GET dernière fiche feux encastrés
router.get('/', ficheFeuxEncastresController.getFicheFeuxEncastres);
router.post("/", ficheFeuxEncastresController.creerFicheFeuxEncastres);

// récupérer une fiche par ID
router.get("/:id", ficheFeuxEncastresController.getFicheFeuxEncastresById);
// enregistrer la fiche
router.put('/:id', ficheFeuxEncastresController.enregistrerFicheFeuxEncastres);

//envoie 
router.put("/envoyer/:id", ficheFeuxEncastresController.envoyerFicheFeuxEncastres);
router.post("/valider", ficheFeuxEncastresController.validerFicheFeuxEncastres);

module.exports = router;