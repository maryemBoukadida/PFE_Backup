const FicheAnnFeuxSeq = require("../models/ficheAnnFeuxSeq");
const Notification = require("../models/Notification");
const HistoriqueAction = require("../models/HistoriqueAction");

// CREER UNE FICHE
exports.creerFicheAnnFeuxSeq = async(req, res) => {
    try {
        const fiche = new FicheAnnFeuxSeq(req.body);
        const nouvelleFiche = await fiche.save();
        res.status(201).json(nouvelleFiche);
    } catch (error) {
        res.status(500).json({ message: "Erreur création fiche feux séquentiels", error: error.message });
    }
};

// RECUPERER TOUTES LES FICHES
exports.getFichesAnnFeuxSeq = async(req, res) => {
    try {
        const fiches = await FicheAnnFeuxSeq.find().sort({ date: -1 });
        res.json(fiches);
    } catch (error) {
        res.status(500).json({ message: "Erreur récupération fiches feux séquentiels", error: error.message });
    }
};

// RECUPERER FICHE PAR ID
exports.getFicheAnnFeuxSeqById = async(req, res) => {
    try {
        const fiche = await FicheAnnFeuxSeq.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });
        res.json(fiche);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ENVOYER FICHE
exports.envoyerFicheAnnFeuxSeq = async(req, res) => {
    try {
        const fiche = await FicheAnnFeuxSeq.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });
        if (!fiche.techniciens_operateurs || fiche.techniciens_operateurs.length === 0) {
            return res.status(400).json({ message: "Le champ technicien est vide" });
        }
        fiche.statut = "envoyee";
        await fiche.save();

        const notification = new Notification({
            type: "fiche_ann_feux_sequentiels",
            message: `Le technicien ${fiche.techniciens_operateurs} a envoyé une fiche annuelle Feux Séquentiels`,
            dataId: fiche._id,
            read: false
        });
        await notification.save();

        res.json({ message: "Fiche envoyée avec succès" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// VALIDER FICHE
exports.validerFicheAnnFeuxSeq = async(req, res) => {
    try {
        const { ficheId, notifId } = req.body;
        if (!ficheId) return res.status(400).json({ message: "ID de la fiche requis" });

        const fiche = await FicheAnnFeuxSeq.findById(ficheId);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });

        fiche.statut = "validée";
        await fiche.save();

        const historique = new HistoriqueAction({
            type: "fiche_ann_feux_sequentiels",
            message: "Fiche annuelle Feux Séquentiels validée",
            dataId: fiche._id,
            date: new Date()
        });
        await historique.save();

        if (notifId) await Notification.findByIdAndUpdate(notifId, { read: true });

        res.json({ message: "Fiche validée et ajoutée à l'historique ✅", fiche });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};