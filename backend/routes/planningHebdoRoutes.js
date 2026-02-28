const express = require('express');
const router = express.Router();
const {
    getPlanningHebdo,
    getPlanningByWeek
} = require('../controllers/planningHebdoController');

router.route('/')
    .get(getPlanningHebdo);

router.route('/semaine/:annee/:semaine')
    .get(getPlanningByWeek);

module.exports = router;