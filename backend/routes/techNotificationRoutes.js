const express = require('express');
const router = express.Router();
const TechNotification = require('../models/TechNotification');

// Récupérer notifications non lues pour un technicien (par matricule)
router.get('/:technicien', async(req, res) => {
    try {
        const notifications = await TechNotification.find({
                technicien: req.params.technicien, // ici doit matcher le matricule
                lu: false
            }).populate('dtiId')
            .sort({ createdAt: -1 });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Marquer notification comme lue
router.post('/read/:id', async(req, res) => {
    try {
        await TechNotification.findByIdAndUpdate(req.params.id, { lu: true });
        res.json({ message: 'Notification marquée comme lue ✅' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;