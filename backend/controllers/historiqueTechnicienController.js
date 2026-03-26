// backend/controllers/historiqueTechnicienController.js
const Historique = require('../models/HistoriqueTechnicien');

// Importer le modèle des fiches correctives
const models = {
    fiche_corrective: require('../models/ficheCorrective'),
};



// ---------------- Récupérer toutes les actions côté technicien ----------------
exports.getActions = async(req, res) => {
    try {
        const { technicien } = req.query; // 🔥 vient du frontend

        let filter = {};

        if (technicien) {
            filter.technicien = technicien;
        }

        const actions = await Historique.find(filter).sort({ date: -1 });

        res.json(actions);
    } catch (err) {
        console.error('Erreur getActions technicien :', err);
        res.status(500).json({ message: err.message });
    }
};

// ---------------- Récupérer une fiche par ID côté technicien ----------------
exports.getFiche = async(req, res) => {
    try {
        const { dataId } = req.params;

        const fiche = await models.fiche_corrective.findById(dataId);

        if (!fiche) {
            return res.status(404).json({ message: 'Fiche non trouvée' });
        }

        res.json(fiche);
    } catch (err) {
        console.error('Erreur getFiche technicien :', err);
        res.status(500).json({ message: err.message });
    }
};