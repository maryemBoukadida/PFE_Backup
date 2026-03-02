const express = require('express');
const router = express.Router();
// Vérifiez que ce chemin est correct
const {
    getPlannings,
    getPlanningById,
    createPlanning,
    updatePlanning,
    deletePlanning,
    duplicatePlanning,
    getStats,
    deletePlanningByYear
} = require('../controllers/planningController');  // ← Doit correspondre au nom du fichier dans controllers/

router.route('/')
    .get(getPlannings)
    .post(createPlanning);

router.route('/:id')
    .get(getPlanningById)
    .put(updatePlanning)
    .delete(deletePlanning);

router.post('/duplicate', duplicatePlanning);
router.get('/stats', getStats);
router.delete('/year/:annee', deletePlanningByYear);

module.exports = router;