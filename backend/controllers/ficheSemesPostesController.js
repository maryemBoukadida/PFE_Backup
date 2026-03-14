const FicheSemesPostes = require("../models/ficheSemesPostes");
const Notification = require("../models/Notification");

// GET dernière fiche semestrielle des postes
exports.getFicheSemesPostes = async(req, res) => {
    try {

        // récupérer la dernière fiche (tri par date décroissante)
        const fiche = await FicheSemesPostes.findOne().sort({ date: -1 });

        if (!fiche) {
            return res.status(404).json({
                message: "Aucune fiche semestrielle des postes trouvée"
            });
        }

        res.json(fiche);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// PUT : mettre à jour une fiche semestrielle des postes
exports.enregistrerFicheSemesPostes = async(req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const fiche = await FicheSemesPostes.findByIdAndUpdate(id, data, {
            new: true, // retourne la fiche mise à jour
        });

        if (!fiche) {
            return res.status(404).json({ message: "Fiche non trouvée" });
        }

        res.json(fiche);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
// PUT : envoyer la fiche
exports.envoyerFicheSemesPostes = async(req, res) => {
    try {
        const fiche = await FicheSemesPostes.findById(req.params.id);

        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });

        if (!fiche.technicien_operateures || fiche.technicien_operateures.trim() === "") {
            return res.status(400).json({ message: "Le champ technicien est vide" });
        }

        // Changer le statut
        fiche.statut = "envoyee";
        await fiche.save();

        // Notification admin (optionnel)
        const notification = new Notification({
            type: "fiche_semes_postes",
            message: `Le technicien ${fiche.technicien_operateures} a envoyé une fiche d'inspection semestrielle des postes`,
            dataId: fiche._id,
            read: false,
        });

        await notification.save();

        res.json({ message: "Fiche postes envoyée avec succès" });
    } catch (error) {
        console.error("Erreur envoyerFicheSemesPostes :", error);
        res.status(500).json({ message: error.message });
    }
};

// GET fiche par ID
exports.getFicheSemesPostesById = async(req, res) => {
    try {
        const fiche = await FicheSemesPostes.findById(req.params.id);

        if (!fiche) {
            return res.status(404).json({ message: "Fiche semestrielle des postes non trouvée" });
        }

        res.json(fiche);
    } catch (err) {
        console.error("Erreur getFicheSemesPostesById :", err);
        res.status(500).json({ message: err.message });
    }
};