const express = require('express');
const router = express.Router();
const controller = require('../controllers/dtiController');
const upload = require('../middlewares/upload');

// Création DTI avec image
router.post('/', upload.single('image'), controller.createDTI);

// Récupérer toutes les DTI
router.get('/', controller.getAllDTI);

// Récupérer par statut
router.get('/:statut', controller.getDTIByStatut);
//mettre a jour statuts
router.put('/status/:id', controller.updateStatus);
module.exports = router;