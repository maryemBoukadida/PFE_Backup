const FicheAnnInfrastructure = require("../models/ficheAnnInfrastructure");
const Notification = require("../models/Notification");
const HistoriqueAction = require("../models/HistoriqueAction");



// ================= CREER UNE FICHE =================
exports.creerFicheAnnInfrastructure = async(req, res) => {
    try {
        const fiche = new FicheAnnInfrastructure(req.body);
        const nouvelleFiche = await fiche.save();

        res.status(201).json(nouvelleFiche);
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la création de la fiche infrastructure",
            error: error.message
        });
    }
};

// ================= RECUPERER TOUTES LES FICHES =================
exports.getFichesAnnInfrastructure = async(req, res) => {
    try {
        const fiches = await FicheAnnInfrastructure.find().sort({ date: -1 });
        res.json(fiches);
    } catch (error) {
        res.status(500).json({
            message: "Erreur récupération fiches infrastructure",
            error: error.message
        });
    }
};
// ================= envoyer fiche  =================
exports.envoyerFicheAnnInfrastructure = async(req, res) => {
    try {
        const fiche = await FicheAnnInfrastructure.findById(req.params.id);

        if (!fiche) {
            return res.status(404).json({
                message: "Fiche Infrastructure non trouvée",
            });
        }

        if (!fiche.techniciens_operateurs || fiche.techniciens_operateurs.length === 0) {
            return res.status(400).json({
                message: "Le champ technicien est vide",
            });
        }

        // changer statut
        fiche.statut = "envoyee";

        await fiche.save();

        // notification admin
        const notification = new Notification({
            type: "fiche_ann_infrastructure",
            message: `Le technicien ${fiche.techniciens_operateurs.join(", ")} a envoyé une fiche annuelle Infrastructure`,
            dataId: fiche._id,
            read: false,
        });

        await notification.save();

        res.json({
            message: "Fiche Infrastructure envoyée avec succès",
        });

    } catch (err) {
        console.error("Erreur envoyerFicheAnnInfrastructure :", err);
        res.status(500).json({ message: err.message });
    }
};
// ================= RECUPERER FICHE PAR ID =================
exports.getFicheAnnInfrastructureById = async(req, res) => {
    try {
        const fiche = await FicheAnnInfrastructure.findById(req.params.id);

        if (!fiche) {
            return res.status(404).json({
                message: "Fiche Infrastructure non trouvée",
            });
        }

        res.json(fiche);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
// ================= VALIDER FICHE =================
exports.validerFicheAnnInfrastructure = async(req, res) => {
    try {
        const { ficheId, notifId } = req.body;
        if (!ficheId) {
            return res.status(400).json({ message: "ID de la fiche requis" });
        }

        // Chercher la fiche
        const fiche = await FicheAnnInfrastructure.findById(ficheId);
        if (!fiche) {
            return res.status(404).json({ message: "Fiche Infrastructure non trouvée" });
        }

        // Mettre à jour le statut
        fiche.statut = "validée";
        await fiche.save();

        // Ajouter dans l'historique
        const historique = new HistoriqueAction({
            type: "fiche_ann_infrastructure",
            message: "Fiche annuelle Infrastructure validée",
            dataId: fiche._id,
            date: new Date(),
        });
        await historique.save();

        // Marquer notification comme lue si notifId fourni
        if (notifId) {
            await Notification.findByIdAndUpdate(notifId, { read: true });
        }

        res.json({ message: "Fiche validée et ajoutée à l'historique ✅", fiche });

    } catch (err) {
        console.error("Erreur validerFicheAnnInfrastructure :", err);
        res.status(500).json({ message: err.message });
    }
};