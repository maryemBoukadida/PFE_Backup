const FicheCorrective = require('../models/ficheCorrective');
const Notification = require('../models/Notification');
const HistoriqueAction = require('../models/HistoriqueAction');
const InventaireGmao = require('../models/Inventaire');
const Historique = require('../models/HistoriqueTechnicien');
// ================= CREER UNE FICHE =================
exports.creerFicheCorrective = async(req, res) => {
    try {
        const fiche = new FicheCorrective(req.body);
        const nouvelleFiche = await fiche.save();
        res.status(201).json(nouvelleFiche);
    } catch (err) {
        res.status(500).json({
            message: 'Erreur création fiche corrective',
            error: err.message,
        });
    }
};

// ================= RECUPERER TOUTES LES FICHES =================
exports.getFichesCorrective = async(req, res) => {
    try {
        const fiches = await FicheCorrective.find();
        res.json(fiches);
    } catch (err) {
        res.status(500).json({
            message: 'Erreur récupération fiches corrective',
            error: err.message,
        });
    }
};

// ================= RECUPERER PAR ID =================
exports.getFicheCorrectiveById = async(req, res) => {
    try {
        const fiche = await FicheCorrective.findById(req.params.id);
        if (!fiche)
            return res.status(404).json({ message: 'Fiche corrective non trouvée' });
        res.json(fiche);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= ENVOYER =================
exports.envoyerFicheCorrective = async(req, res) => {
    try {
        // 🔹 Récupérer la fiche
        const fiche = await FicheCorrective.findById(req.params.id);

        if (!fiche) {
            return res.status(404).json({ message: 'Fiche corrective non trouvée' });
        }

        // 🔹 Statut de la fiche
        fiche.statut = 'envoyee';
        await fiche.save();

        // 🔹 Enregistrer actions pour tous les techniciens
        const techniciens = fiche.ficheCorrective[0].techniciensOperateurs || [];

        for (const tech of techniciens) {
            const historique = new Historique({
                technicien: tech.nom || 'Inconnu', // si vide
                fiche_corrective_id: fiche._id,
                typeFiche: 'corrective',
                description: fiche.ficheCorrective[0].designation || '',
                observations: fiche.ficheCorrective[0].observationsGenerales || '',
                status: 'en_cours',
            });

            await historique.save();
        }

        // 🔹 Notification globale
        const notification = new Notification({
            type: 'fiche_corrective',
            message: `Une fiche corrective a été envoyée`,
            dataId: fiche._id,
            read: false,
        });
        await notification.save();

        res.json({
            message: 'Fiche envoyée + historique créé pour tous les techniciens',
            fiche,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

// ================= VALIDER =================
exports.validerFicheCorrective = async(req, res) => {
    try {
        const { ficheId, notifId } = req.body;

        const fiche = await FicheCorrective.findById(ficheId);
        if (!fiche)
            return res.status(404).json({ message: 'Fiche corrective non trouvée' });

        fiche.statut = 'validée';
        await fiche.save();

        const historique = new HistoriqueAction({
            type: 'fiche_corrective',
            message: 'Fiche corrective validée',
            dataId: fiche._id,
            date: new Date(),
        });

        await historique.save();

        if (notifId) await Notification.findByIdAndUpdate(notifId, { read: true });

        res.json({ message: 'Fiche validée ✅', fiche });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getAllDesignations = async(req, res) => {
    try {
        const data = await InventaireGmao.find();

        let result = [];

        data.forEach((doc) => {
            if (doc.balisage_gmao) {
                result = result.concat(doc.balisage_gmao);
            }

            if (doc.PG_gmao) {
                result = result.concat(doc.PG_gmao);
            }

            if (doc.autre) {
                result = result.concat(doc.autre);
            }
        });

        // 🔥 garder فقط designation + stock
        const cleaned = result.map((item) => ({
            designation: item.designation,
            stock: item.stock,
        }));

        res.json(cleaned);
    } catch (err) {
        console.error('Erreur getAllDesignations :', err);
        res.status(500).json({ message: err.message });
    }
};
exports.updateStock = async(req, res) => {
    try {
        const { pieces } = req.body;
        // pieces = [{ designation, quantite }, ...]

        const doc = await InventaireGmao.findOne();

        if (!doc) {
            return res.status(404).json({ message: 'Inventaire introuvable' });
        }

        const updateArray = (arr) => {
            for (let item of arr) {
                pieces.forEach((p) => {
                    if (item.designation === p.designation) {
                        if (item.stock < p.quantite) {
                            throw new Error(`Stock insuffisant pour ${p.designation}`);
                        }
                        item.stock -= p.quantite;
                    }
                });
            }
        };

        updateArray(doc.balisage_gmao || []);
        updateArray(doc.PG_gmao || []);
        updateArray(doc.autre || []);

        await doc.save();

        res.json({ message: 'Stock mis à jour ✅' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};