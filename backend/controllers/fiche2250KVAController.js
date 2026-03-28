const Fiche2250KVA = require("../models/Fiche2250KVA");
const Notification = require("../models/Notification");
const HistoriqueAction = require("../models/HistoriqueAction");

// CREATE
exports.creerFiche2250KVA = async(req, res) => {
    try {
        const fiche = new Fiche2250KVA(req.body);
        const nouvelleFiche = await fiche.save();
        res.status(201).json(nouvelleFiche);
    } catch (err) {
        res.status(500).json({ message: "Erreur création fiche 2250KVA", error: err.message });
    }
};

// GET ALL
exports.getFiches2250KVA = async(req, res) => {
    try {
        const fiches = await Fiche2250KVA.find().sort({ date: -1 });
        res.json(fiches);
    } catch (err) {
        res.status(500).json({ message: "Erreur récupération fiches 2250KVA", error: err.message });
    }
};

// GET BY ID
exports.getFiche2250KVAById = async(req, res) => {
    try {
        const fiche = await Fiche2250KVA.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });
        res.json(fiche);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ENVOYER
exports.envoyerFiche2250KVA = async(req, res) => {
    try {
        const fiche = await Fiche2250KVA.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });

        fiche.statut = "envoyee";
        await fiche.save();

        const notification = new Notification({
            type: "fiche_2250kva",
            message: `Une fiche 2250KVA a été envoyée`,
            dataId: fiche._id,
            read: false
        });
        await notification.save();

        res.json({ message: "Fiche envoyée avec succès" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// VALIDER
exports.validerFiche2250KVA = async(req, res) => {
    try {
        const { ficheId, notifId } = req.body;

        const fiche = await Fiche2250KVA.findById(ficheId);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });

        fiche.statut = "validée";
        await fiche.save();

        const historique = new HistoriqueAction({
            type: "fiche_2250kva",
            message: "Fiche 2250KVA validée",
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