const FicheCorrective = require("../models/ficheCorrective");
const Notification = require("../models/Notification");
const HistoriqueAction = require("../models/HistoriqueAction");

// ================= CREER UNE FICHE =================
exports.creerFicheCorrective = async(req, res) => {
    try {
        const fiche = new FicheCorrective(req.body);
        const nouvelleFiche = await fiche.save();
        res.status(201).json(nouvelleFiche);
    } catch (err) {
        res.status(500).json({ message: "Erreur création fiche corrective", error: err.message });
    }
};

// ================= RECUPERER TOUTES LES FICHES =================
exports.getFichesCorrective = async(req, res) => {
    try {
        const fiches = await FicheCorrective.find();
        res.json(fiches);
    } catch (err) {
        res.status(500).json({ message: "Erreur récupération fiches corrective", error: err.message });
    }
};

// ================= RECUPERER PAR ID =================
exports.getFicheCorrectiveById = async(req, res) => {
    try {
        const fiche = await FicheCorrective.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: "Fiche corrective non trouvée" });
        res.json(fiche);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= ENVOYER =================
exports.envoyerFicheCorrective = async(req, res) => {
    try {
        const fiche = await FicheCorrective.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: "Fiche corrective non trouvée" });

        // Vérification techniciens
        if (!fiche.ficheCorrective[0].techniciensOperateurs ||
            fiche.ficheCorrective[0].techniciensOperateurs.length === 0
        ) {
            return res.status(400).json({ message: "Le champ technicien est vide" });
        }

        fiche.statut = "envoyee";
        await fiche.save();

        const notification = new Notification({
            type: "fiche_corrective",
            message: `Une fiche corrective a été envoyée`,
            dataId: fiche._id,
            read: false
        });

        await notification.save();

        res.json({ message: "Fiche corrective envoyée avec succès" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= VALIDER =================
exports.validerFicheCorrective = async(req, res) => {
    try {
        const { ficheId, notifId } = req.body;

        const fiche = await FicheCorrective.findById(ficheId);
        if (!fiche) return res.status(404).json({ message: "Fiche corrective non trouvée" });

        fiche.statut = "validée";
        await fiche.save();

        const historique = new HistoriqueAction({
            type: "fiche_corrective",
            message: "Fiche corrective validée",
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