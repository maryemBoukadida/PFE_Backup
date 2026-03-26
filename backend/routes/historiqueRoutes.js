const express = require('express');
const router = express.Router();


const {
    getActions,
    getFiche,
} = require('../controllers/historiqueTechnicienController');

// GET historique
router.get('/', getActions);

module.exports = router;