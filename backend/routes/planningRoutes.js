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
    deletePlanningByYear  // ✅ AJOUTÉ ICI
} = require('../controllers/planningController');

router.route('/')
    .get(getPlannings)
    .post(createPlanning);

router.route('/stats')
    .get(getStats);

router.route('/duplicate')
    .post(duplicatePlanning);

router.route('/:id')
    .get(getPlanningById)
    .put(updatePlanning)
    .delete(deletePlanning);

// ✅ NOUVELLE ROUTE: Supprimer tout le planning d'une année
router.route('/year/:annee')
    .delete(deletePlanningByYear);

module.exports = router;