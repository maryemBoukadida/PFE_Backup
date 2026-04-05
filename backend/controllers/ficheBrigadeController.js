const FicheBrigade = require('../models/Brigade');
const Notification = require('../models/Notification');
const HistoriqueAction = require('../models/HistoriqueAction');

// ================= CREATE =================
exports.creerFicheBrigade = async(req, res) => {
    try {
        const { bloc, data } = req.body;

        let fiche = await FicheBrigade.findOne({
            date: {
                $gte: new Date().setHours(0, 0, 0, 0),
                $lte: new Date().setHours(23, 59, 59, 999),
            },
        });

        // 🆕 si aucune fiche aujourd’hui → on crée
        if (!fiche) {
            fiche = new FicheBrigade({
                blocsBrigade: { jour: [], nuit: [] },
            });
        }

        // ✅ AJOUTER sans écraser
        fiche.blocsBrigade[bloc].push(...data);

        await fiche.save();

        res.status(200).json(fiche);
    } catch (err) {
        res.status(500).json({
            message: 'Erreur création fiche Brigade',
            error: err.message,
        });
    }
};

// ================= GET ALL =================
exports.getFichesBrigade = async(req, res) => {
    try {
        const fiches = await FicheBrigade.find().sort({ date: -1 });
        res.json(fiches);
    } catch (err) {
        res.status(500).json({
            message: 'Erreur récupération fiches Brigade',
            error: err.message,
        });
    }
};

// ================= GET BY ID =================
exports.getFicheBrigadeById = async(req, res) => {
    try {
        const fiche = await FicheBrigade.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: 'Fiche non trouvée' });
        res.json(fiche);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= ENVOYER =================
exports.envoyerFicheBrigade = async(req, res) => {
    try {
        const fiche = await FicheBrigade.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: 'Fiche non trouvée' });

        fiche.statut = 'envoyee';
        await fiche.save();

        const notification = new Notification({
            type: 'fiche_brigade',
            message: 'Une fiche Brigade a été envoyée',
            dataId: fiche._id,
            read: false,
        });

        await notification.save();
        res.json({ message: 'Fiche envoyée avec succès' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= VALIDER =================
exports.validerFicheBrigade = async(req, res) => {
    try {
        const { ficheId, notifId } = req.body;

        const fiche = await FicheBrigade.findById(ficheId);
        if (!fiche) return res.status(404).json({ message: 'Fiche non trouvée' });

        fiche.statut = 'validee';
        await fiche.save();

        const historique = new HistoriqueAction({
            type: 'fiche_brigade',
            message: 'Fiche Brigade validée',
            dataId: fiche._id,
            date: new Date(),
        });

        await historique.save();

        if (notifId) {
            await Notification.findByIdAndUpdate(notifId, { read: true });
        }

        res.json({ message: 'Fiche validée ✅', fiche });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};