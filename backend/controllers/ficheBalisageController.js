const FicheBalisage = require("../models/FicheBalisage");
const Notification = require("../models/Notification");
const HistoriqueAction = require("../models/HistoriqueAction");

// ================= CREATE =================
exports.creerFicheBalisage = async(req, res) => {
    try {
        const fiche = new FicheBalisage(req.body);
        const nouvelleFiche = await fiche.save();
        res.status(201).json(nouvelleFiche);
    } catch (err) {
        res.status(500).json({
            message: "Erreur création fiche Balisage",
            error: err.message
        });
    }
};

// ================= GET ALL =================
exports.getFichesBalisage = async(req, res) => {
    try {
        const fiches = await FicheBalisage.find().sort({ date: -1 });
        res.json(fiches);
    } catch (err) {
        res.status(500).json({
            message: "Erreur récupération fiches Balisage",
            error: err.message
        });
    }
};

// ================= GET BY ID =================
exports.getFicheBalisageById = async(req, res) => {
    try {
        const fiche = await FicheBalisage.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });

        res.json(fiche);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= ENVOYER =================
exports.envoyerFicheBalisage = async(req, res) => {
    try {
        const fiche = await FicheBalisage.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });

        fiche.statut = "envoyee";
        await fiche.save();

        const notification = new Notification({
            type: "fiche_balisage",
            message: "Une fiche Balisage a été envoyée",
            dataId: fiche._id,
            read: false
        });

        await notification.save();

        res.json({ message: "Fiche envoyée avec succès" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= VALIDER =================
exports.validerFicheBalisage = async(req, res) => {
    try {
        const { ficheId, notifId } = req.body;

        const fiche = await FicheBalisage.findById(ficheId);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });

        fiche.statut = "validée";
        await fiche.save();

        const historique = new HistoriqueAction({
            type: "fiche_balisage",
            message: "Fiche Balisage validée",
            dataId: fiche._id,
            date: new Date()
        });

        await historique.save();

        if (notifId) {
            await Notification.findByIdAndUpdate(notifId, { read: true });
        }

        res.json({ message: "Fiche validée ✅" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};