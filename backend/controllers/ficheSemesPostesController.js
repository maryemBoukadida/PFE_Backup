const FicheSemesPostes = require("../models/ficheSemesPostes");
const Notification = require("../models/Notification");
const HistoriqueAction = require("../models/HistoriqueAction");

exports.creerFicheSemesPostes = async(req, res) => {
    try {
        const fiche = new FicheSemesPostes(req.body);
        const nouvelleFiche = await fiche.save();
        res.status(201).json(nouvelleFiche);
    } catch (error) {
        res.status(500).json({
            message: "Erreur création fiche semestrielle postes",
            error: error.message
        });
    }
};

// GET dernière fiche semestrielle des postes
exports.getFichesSemesPostes = async(req, res) => {
    try {
        const fiches = await FicheSemesPostes.find().sort({ date: -1 });
        res.json(fiches);
    } catch (error) {
        res.status(500).json({
            message: "Erreur récupération fiches postes",
            error: error.message
        });
    }
};
// PUT : mettre à jour une fiche semestrielle des postes
exports.enregistrerFicheSemesPostes = async(req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "ID requis" });
        }

        const fiche = await FicheSemesPostes.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        if (!fiche) {
            return res.status(404).json({ message: "Fiche non trouvée" });
        }

        res.json(fiche);
    } catch (error) {
        console.error("ERREUR:", error);
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

        // ✅ statut
        fiche.statut = "envoyee";
        await fiche.save();

        // ✅ notification
        const notification = new Notification({
            type: "fiche_semes_postes",
            message: `Le technicien ${fiche.technicien_operateures} a envoyé une fiche semestrielle des postes`,
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
            return res.status(404).json({
                message: "Fiche semestrielle des postes non trouvée"
            });
        }

        res.json(fiche);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.validerFicheSemesPostes = async(req, res) => {
    try {
        const { ficheId, notifId } = req.body;

        if (!ficheId) {
            return res.status(400).json({ message: "ID de la fiche requis" });
        }

        const fiche = await FicheSemesPostes.findById(ficheId);

        if (!fiche) {
            return res.status(404).json({ message: "Fiche non trouvée" });
        }

        fiche.statut = "validée";
        await fiche.save();

        // ✅ historique
        const historique = new HistoriqueAction({
            type: "fiche_semes_postes",
            message: "Fiche semestrielle postes validée",
            dataId: fiche._id,
            date: new Date()
        });

        await historique.save();

        // ✅ notification lue
        if (notifId) {
            await Notification.findByIdAndUpdate(notifId, { read: true });
        }

        res.json({
            message: "Fiche validée et ajoutée à l'historique ✅",
            fiche
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};