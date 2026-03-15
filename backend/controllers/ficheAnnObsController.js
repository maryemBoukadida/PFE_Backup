const FicheAnnObs = require("../models/ficheAnnObs");
const Notification = require("../models/Notification");
const HistoriqueAction = require("../models/HistoriqueAction");

// créer fiche
exports.creerFicheAnnObs = async(req, res) => {
    try {
        const fiche = new FicheAnnObs(req.body);
        const nouvelleFiche = await fiche.save();

        res.status(201).json(nouvelleFiche);
    } catch (error) {
        res.status(500).json({
            message: "Erreur création fiche obstacles",
            error: error.message,
        });
    }
};

// récupérer fiches
exports.getFichesAnnObs = async(req, res) => {
    try {
        const fiches = await FicheAnnObs.find().sort({ date: -1 });
        res.json(fiches);
    } catch (error) {
        res.status(500).json({
            message: "Erreur récupération fiches obstacles",
            error: error.message,
        });
    }
};

// récupérer fiche par ID
exports.getFicheAnnObsById = async(req, res) => {
    try {
        const fiche = await FicheAnnObs.findById(req.params.id);

        if (!fiche) {
            return res.status(404).json({
                message: "Fiche obstacles non trouvée",
            });
        }

        res.json(fiche);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// envoyer fiche
exports.envoyerFicheAnnObs = async(req, res) => {
    try {
        const fiche = await FicheAnnObs.findById(req.params.id);

        if (!fiche) {
            return res.status(404).json({
                message: "Fiche obstacles non trouvée",
            });
        }

        if (!fiche.technicien_operateur) {
            return res.status(400).json({
                message: "Technicien vide",
            });
        }

        fiche.statut = "envoyee";

        await fiche.save();

        const notification = new Notification({
            type: "fiche_ann_obs",
            message: `Le technicien ${fiche.technicien_operateur} a envoyé une fiche annuelle obstacles`,
            dataId: fiche._id,
            read: false,
        });

        await notification.save();

        res.json({
            message: "Fiche obstacles envoyée",
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// valider fiche
exports.validerFicheAnnObs = async(req, res) => {
    try {

        const { ficheId, notifId } = req.body;

        const fiche = await FicheAnnObs.findById(ficheId);

        if (!fiche) {
            return res.status(404).json({ message: "Fiche non trouvée" });
        }

        fiche.statut = "validée";

        await fiche.save();

        const historique = new HistoriqueAction({
            type: "fiche_ann_obs",
            message: "Fiche annuelle obstacles validée",
            dataId: fiche._id,
            date: new Date(),
        });

        await historique.save();

        if (notifId) {
            await Notification.findByIdAndUpdate(notifId, { read: true });
        }

        res.json({
            message: "Fiche validée",
            fiche,
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};