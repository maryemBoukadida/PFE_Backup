const FicheAnnCable = require("../models/ficheAnnCable");
const Notification = require("../models/Notification");
const HistoriqueAction = require("../models/HistoriqueAction");

// ================= CREER UNE FICHE =================
exports.creerFicheAnnCable = async(req, res) => {
    try {
        const fiche = new FicheAnnCable(req.body);
        const nouvelleFiche = await fiche.save();
        res.status(201).json(nouvelleFiche);
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la création de la fiche cable",
            error: error.message
        });
    }
};

// ================= RECUPERER TOUTES LES FICHES =================
exports.getFichesAnnCable = async(req, res) => {
    try {
        const fiches = await FicheAnnCable.find().sort({ date: -1 });
        res.json(fiches);
    } catch (error) {
        res.status(500).json({
            message: "Erreur récupération fiches cable",
            error: error.message
        });
    }
};

// ================= RECUPERER FICHE PAR ID =================
exports.getFicheAnnCableById = async(req, res) => {
    try {
        const fiche = await FicheAnnCable.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });
        res.json(fiche);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= ENVOYER FICHE =================
exports.envoyerFicheAnnCable = async(req, res) => {
    try {
        const fiche = await FicheAnnCable.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });
        if (!fiche.technicien_operateur) {
            return res.status(400).json({ message: "Le champ technicien est vide" });
        }

        fiche.statut = "envoyee";
        await fiche.save();

        const notification = new Notification({
            type: "fiche_ann_cable",
            message: `Le technicien ${fiche.technicien_operateur} a envoyé une fiche annuelle Cable`,
            dataId: fiche._id,
            read: false
        });
        await notification.save();

        res.json({ message: "Fiche envoyée avec succès" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= VALIDER FICHE =================
exports.validerFicheAnnCable = async(req, res) => {
    try {
        const { ficheId, notifId } = req.body;
        if (!ficheId) return res.status(400).json({ message: "ID de la fiche requis" });

        const fiche = await FicheAnnCable.findById(ficheId);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });

        fiche.statut = "validée";
        await fiche.save();

        const historique = new HistoriqueAction({
            type: "fiche_ann_cable",
            message: "Fiche annuelle Cable validée",
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