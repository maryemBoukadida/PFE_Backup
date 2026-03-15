const FicheEffar = require("../models/ficheEffar");
const Notification = require("../models/Notification");
const HistoriqueAction = require("../models/HistoriqueAction");

// Créer une fiche
exports.creerFicheEffar = async(req, res) => {
    try {
        const fiche = new FicheEffar(req.body);
        const nouvelleFiche = await fiche.save();
        res.status(201).json(nouvelleFiche);
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la création de la fiche Effaroucheur",
            error: error.message,
        });
    }
};

// Récupérer toutes les fiches
exports.getFichesEffar = async(req, res) => {
    try {
        const fiches = await FicheEffar.find().sort({ date: -1 });
        res.json(fiches);
    } catch (error) {
        res.status(500).json({
            message: "Erreur récupération fiches Effaroucheur",
            error: error.message,
        });
    }
};

// Envoyer une fiche
exports.envoyerFicheEffar = async(req, res) => {
    try {
        const fiche = await FicheEffar.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });

        if (!fiche.technicien_operateur || fiche.technicien_operateur === "") {
            return res.status(400).json({ message: "Le champ technicien est vide" });
        }

        fiche.statut = "envoyee";
        await fiche.save();

        const notification = new Notification({
            type: "fiche_effar",
            message: `Le technicien ${fiche.technicien_operateur} a envoyé une fiche Effaroucheur`,
            dataId: fiche._id,
            read: false,
        });
        await notification.save();

        res.json({ message: "Fiche envoyée avec succès" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

// Récupérer fiche par ID
exports.getFicheEffarById = async(req, res) => {
    try {
        const fiche = await FicheEffar.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });
        res.json(fiche);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

// Valider fiche
exports.validerFicheEffar = async(req, res) => {
    try {
        const { ficheId, notifId } = req.body;
        if (!ficheId) return res.status(400).json({ message: "ID de la fiche requis" });

        const fiche = await FicheEffar.findById(ficheId);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });

        fiche.statut = "validée";
        await fiche.save();

        const historique = new HistoriqueAction({
            type: "fiche_effar",
            message: "Fiche Effaroucheur validée",
            dataId: fiche._id,
            date: new Date(),
        });
        await historique.save();

        if (notifId) {
            await Notification.findByIdAndUpdate(notifId, { read: true });
        }

        res.json({ message: "Fiche validée ✅", fiche });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};