const FicheAnnTgbt = require("../models/ficheAnnTgbt");
const Notification = require("../models/Notification");
const HistoriqueAction = require("../models/HistoriqueAction");

exports.createFicheAnnTgbt = async(req, res) => {
    try {
        const fiche = await FicheAnnTgbt.create(req.body);
        res.status(201).json(fiche);
    } catch (err) {
        console.error("Erreur create :", err);
        res.status(500).json({ message: err.message });
    }
};


// GET dernière fiche annuelle TGBT
exports.getFicheAnnTgbt = async(req, res) => {
    try {
        const fiche = await FicheAnnTgbt.findOne().sort({ date: -1 });
        if (!fiche) return res.status(404).json({ message: "Aucune fiche trouvée" });
        res.json(fiche);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


// GET fiche par ID
exports.getFicheTgbtById = async(req, res) => {
    try {
        const fiche = await FicheAnnTgbt.findById(req.params.id);

        if (!fiche) {
            return res.status(404).json({
                message: "Fiche TGBT non trouvée",
            });
        }

        res.json(fiche);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};


// PUT : enregistrer / mettre à jour la fiche
exports.enregistrerFicheAnnTgbt = async(req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "ID manquant" });
        }

        const data = req.body;

        const fiche = await FicheAnnTgbt.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true, // 🔥 IMPORTANT
        });

        if (!fiche) {
            return res.status(404).json({ message: "Fiche TGBT non trouvée" });
        }

        res.json(fiche);
    } catch (err) {
        console.error("Erreur enregistrerFicheAnnTgbt :", err);
        res.status(500).json({ message: err.message });
    }
};

// PUT : envoyer la fiche
exports.envoyerFicheAnnTgbt = async(req, res) => {
    try {
        const fiche = await FicheAnnTgbt.findById(req.params.id);

        if (!fiche) {
            return res.status(404).json({ message: "Fiche TGBT non trouvée" });
        }

        if (!fiche.technicien_operateurs || fiche.technicien_operateurs.trim() === "") {
            return res.status(400).json({
                message: "Le champ technicien est vide",
            });
        }

        // statut
        fiche.statut = "envoyé";
        await fiche.save();

        // notification admin
        const notification = new Notification({
            type: "fiche_ann_tgbt",
            message: `Le technicien ${fiche.technicien_operateurs} a envoyé une fiche annuelle TGBT`,
            dataId: fiche._id,
            read: false,
        });

        await notification.save();

        res.json({ message: "Fiche TGBT envoyée avec succès" });
    } catch (err) {
        console.error("Erreur envoyerFicheTgbt :", err);
        res.status(500).json({ message: err.message });
    }
};

// VALIDER
exports.validerFicheAnnTgbt = async(req, res) => {
    try {
        const { ficheId, notifId } = req.body;

        const fiche = await FicheAnnTgbt.findById(ficheId);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });

        fiche.statut = "validée";
        await fiche.save();

        const historique = new HistoriqueAction({
            type: "fiche_ann_tgbt",
            message: "Fiche Anuelle Tgbt validée",
            dataId: fiche._id,
            date: new Date()
        });
        await historique.save();

        if (notifId) await Notification.findByIdAndUpdate(notifId, { read: true });

        res.json({ message: "Fiche validée ✅" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};