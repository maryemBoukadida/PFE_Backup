const express = require('express');
const router = express.Router();
const {
    getPlannings,
    getPlanningById,
    createPlanning,
    updatePlanning,
    deletePlanning,
    duplicatePlanning,
    getStats,
    deletePlanningByYear
} = require('../controllers/planningController');

// Routes spécifiques (sans paramètre ou avec segments fixes) en premier
router.post('/duplicate', duplicatePlanning);
router.get('/stats', getStats);
router.delete('/year/:annee', deletePlanningByYear);

// Routes avec paramètre ID (générique) après
router.route('/')
    .get(getPlannings)
    .post(createPlanning);

router.route('/:id')
    .get(getPlanningById)
    .put(updatePlanning)
    .delete(deletePlanning);

module.exports = router;