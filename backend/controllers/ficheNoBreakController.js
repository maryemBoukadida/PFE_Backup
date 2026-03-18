const FicheNoBreak = require("../models/FicheNoBreak");
const Notification = require("../models/Notification");
const HistoriqueAction = require("../models/HistoriqueAction");

// CREER UNE FICHE
exports.creerFicheNoBreak = async(req, res) => {
    try {
        const fiche = new FicheNoBreak(req.body);
        const nouvelleFiche = await fiche.save();
        res.status(201).json(nouvelleFiche);
    } catch (err) {
        res.status(500).json({ message: "Erreur création fiche No-Break", error: err.message });
    }
};

// RECUPERER TOUTES LES FICHES
exports.getFichesNoBreak = async(req, res) => {
    try {
        const fiches = await FicheNoBreak.find();
        res.json(fiches);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// RECUPERER PAR ID
exports.getFicheNoBreakById = async(req, res) => {
    try {
        const fiche = await FicheNoBreak.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: "Fiche No-Break non trouvée" });
        res.json(fiche);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ENVOYER FICHE
exports.envoyerFicheNoBreak = async(req, res) => {
    try {
        const fiche = await FicheNoBreak.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: "Fiche No-Break non trouvée" });

        // Vérification techniciens
        if (!fiche.techniciens ||
            !fiche.techniciens.matin.length &&
            !fiche.techniciens.apresMidi.length &&
            !fiche.techniciens.nuit.length) {
            return res.status(400).json({ message: "Le champ techniciens est vide" });
        }

        fiche.statut = "envoyee";
        await fiche.save();

        const notification = new Notification({
            type: "fiche_nobreak",
            message: `Une fiche No-Break a été envoyée`,
            dataId: fiche._id,
            read: false
        });
        await notification.save();

        res.json({ message: "Fiche No-Break envoyée ✅", fiche });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// VALIDER FICHE
exports.validerFicheNoBreak = async(req, res) => {
    try {
        const { ficheId, notifId } = req.body;
        const fiche = await FicheNoBreak.findById(ficheId);
        if (!fiche) return res.status(404).json({ message: "Fiche No-Break non trouvée" });

        fiche.statut = "validée";
        await fiche.save();

        const historique = new HistoriqueAction({
            type: "fiche_nobreak",
            message: "Fiche No-Break validée",
            dataId: fiche._id,
            date: new Date()
        });
        await historique.save();

        if (notifId) await Notification.findByIdAndUpdate(notifId, { read: true });

        res.json({ message: "Fiche validée ✅", fiche });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};