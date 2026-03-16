const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminUserController = require('../controllers/adminUserController');

router.get('/users/:matricule/complet', auth, adminUserController.getUserComplet);
router.put('/users/:matricule', auth, adminUserController.updateUserComplet);

module.exports = router;