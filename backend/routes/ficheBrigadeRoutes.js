const express = require('express');
const router = express.Router();

const {
    creerFicheBrigade,
    getFichesBrigade,
    getFicheBrigadeById,
    envoyerFicheBrigade,
    validerFicheBrigade,
} = require('../controllers/ficheBrigadeController');

const Notification = require('../models/Notification');

// ================= ROUTES FICHE =================
router.post('/', creerFicheBrigade);
router.get('/', getFichesBrigade);
router.get('/:id', getFicheBrigadeById);
router.put('/envoyer/:id', envoyerFicheBrigade);
router.post('/valider', validerFicheBrigade);

// ================= NOTIFICATIONS =================
router.get('/notifications', async(req, res) => {
    try {
        const notifications = await Notification.find({
            type: 'fiche_brigade',
        }).sort({ date: -1 });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: 'Erreur notifications' });
    }
});

module.exports = router;