const FicheFeuxObstacles = require("../models/FicheFeuxObstacles");
const Notification = require("../models/Notification");

// récupérer la fiche
exports.getFicheFeuxObstacles = async(req, res) => {
    try {

        const fiche = await FicheFeuxObstacles
            .findOne()
            .sort({ createdAt: -1 });

        res.json(fiche);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// 🔹 PUT : enregistrer / mettre à jour une fiche
exports.enregistrerFicheFeuxObstacles = async(req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const fiche = await FicheFeuxObstacles.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });

        if (!fiche) {
            return res.status(404).json({ message: "Fiche non trouvée" });
        }

        res.json({ message: "Fiche enregistrée avec succès !", fiche });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// 🔹 POST : envoyer fiche → créer notification admin
// Envoyer fiche → crée notification pour admin

exports.envoyerFicheFeuxObstacles = async(req, res) => {
    try {
        const { id } = req.params;

        const fiche = await FicheFeuxObstacles.findById(id);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });

        // Ici tu peux créer la notification
        const notif = await Notification.create({
            type: "FeuxObstacles",
            message: `Nouvelle fiche Feux d'obstacles envoyée par ${fiche.technicien}`,
            ficheId: fiche._id,
            dataId: fiche._id,
            read: false,
            date: new Date()
        });

        res.json({ message: "Fiche envoyée avec succès !", fiche, notif });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getFicheDGSById = async(req, res) => {
    try {
        const fiche = await FicheFeuxObstacles.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });
        res.json(fiche);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};