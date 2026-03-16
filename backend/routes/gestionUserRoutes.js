const express = require('express');
const router = express.Router();
const {
    getGestionUsers,
    createGestionUser,
    updateGestionUser,
    deleteGestionUser,
    toggleGestionUserActive   // ← Import de la nouvelle méthode
} = require('../controllers/gestionUserController');

router.route('/')
    .get(getGestionUsers)
    .post(createGestionUser);

router.route('/:id')
    .put(updateGestionUser)
    .delete(deleteGestionUser);

// ⬇️ NOUVELLE ROUTE pour activer/désactiver
router.patch('/:id/toggle-active', toggleGestionUserActive);

module.exports = router;