// backend/controllers/ficheLVPController.js
const FicheLVP = require("../models/FicheLVP");
const Notification = require("../models/Notification");

// récupérer la fiche
exports.getFicheLVP = async(req, res) => {
    try {

        const fiche = await FicheLVP
            .findOne()
            .sort({ createdAt: -1 });

        res.json(fiche);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// 🔹 Enregistrer une fiche LVP (nouvelle ou mise à jour)

exports.enregistrerFicheLVP = async(req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const fiche = await FicheLVP.findByIdAndUpdate(id, data, {
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

// 🔹 Envoyer la fiche LVP
exports.envoyerFicheLVP = async(req, res) => {
    try {
        const { id } = req.params;

        // Vérifier si la fiche existe
        const fiche = await FicheLVP.findById(id);
        if (!fiche) {
            return res.status(404).json({ message: "Fiche LVP non trouvée." });
        }

        // Ici tu peux créer une notification
        const notif = await Notification.create({
            type: "LVP",
            message: `Nouvelle fiche LVP envoyée par ${fiche.technicien}`,
            ficheId: fiche._id,
            dataId: fiche._id,
            read: false,
            date: new Date()
        });

        res.json({ message: "Fiche LVP envoyée avec succès !", fiche, notif });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur lors de l'envoi de la fiche LVP." });
    }
};
// 🔹 Récupérer toutes les fiches
exports.getAllFiches = async(req, res) => {
    try {
        const fiches = await FicheLVP.find();
        res.json(fiches);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }
};