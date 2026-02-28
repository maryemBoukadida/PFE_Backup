const express = require('express');
const router = express.Router();
const {
    getPlanningHebdo,
    createPlanningHebdo,
    deletePlanningHebdo,
    deletePlanningByYear,
    getPlanningByWeek
} = require('../controllers/planningHebdoController');

router.route('/')
    .get(getPlanningHebdo)
    .post(createPlanningHebdo);

router.route('/:id')
    .delete(deletePlanningHebdo);

router.route('/year/:annee')
    .delete(deletePlanningByYear);

router.route('/semaine/:annee/:semaine')
    .get(getPlanningByWeek);

module.exports = router;