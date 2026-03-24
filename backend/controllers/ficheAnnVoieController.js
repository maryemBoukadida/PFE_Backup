const FicheAnnVoie = require("../models/ficheAnnVoie");
const Notification = require("../models/Notification");
const HistoriqueAction = require("../models/HistoriqueAction");

exports.createFicheAnnVoie = async(req, res) => {
    try {
        const fiche = await FicheAnnVoie.create(req.body);
        res.status(201).json(fiche);
    } catch (err) {
        console.error("Erreur create :", err);
        res.status(500).json({ message: err.message });
    }
};
// ================= GET dernière fiche =================
exports.getFicheAnnVoie = async(req, res) => {
    try {
        const fiche = await FicheAnnVoie.findOne().sort({ date: -1 });

        if (!fiche) {
            return res.status(404).json({ message: "Aucune fiche voie trouvée" });
        }

        res.json(fiche);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


// ================= GET fiche par ID =================
exports.getFicheVoieById = async(req, res) => {
    try {
        const fiche = await FicheAnnVoie.findById(req.params.id);

        if (!fiche) {
            return res.status(404).json({
                message: "Fiche voie non trouvée",
            });
        }

        res.json(fiche);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};


// ================= PUT enregistrer =================
exports.enregistrerFicheAnnVoie = async(req, res) => {
    try {

        const { id } = req.params;
        const data = req.body;

        const fiche = await FicheAnnVoie.findByIdAndUpdate(
            id,
            data, { new: true }
        );

        if (!fiche) {
            return res.status(404).json({
                message: "Fiche voie non trouvée"
            });
        }

        res.json(fiche);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};


// ================= PUT envoyer =================
exports.envoyerFicheAnnVoie = async(req, res) => {
    try {

        const fiche = await FicheAnnVoie.findById(req.params.id);

        if (!fiche) {
            return res.status(404).json({
                message: "Fiche voie non trouvée"
            });
        }

        if (!fiche.techniciens_operateurs || fiche.techniciens_operateurs.length === 0) {
            return res.status(400).json({
                message: "Le champ techniciens est vide"
            });
        }

        fiche.statut = "envoyé";
        await fiche.save();

        const notification = new Notification({
            type: "fiche_ann_voie",
            message: `Le technicien ${fiche.techniciens_operateurs} a envoyé une fiche annuelle des panneau de voies`,
            dataId: fiche._id,
            read: false,
        });

        await notification.save();

        res.json({
            message: "Fiche voie envoyée avec succès"
        });

    } catch (err) {
        console.error("Erreur envoyerFicheAnnVoie :", err);
        res.status(500).json({ message: err.message });
    }
};
exports.validerFicheAnnVoie = async(req, res) => {
    try {
        const { ficheId, notifId } = req.body;

        const fiche = await FicheAnnVoie.findById(ficheId);
        if (!fiche) return res.status(404).json({ message: "Fiche voie non trouvée" });

        fiche.statut = "validée";
        await fiche.save();

        const historique = new HistoriqueAction({
            type: "fiche_ann_voie",
            message: "Fiche annuelle voie validée",
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