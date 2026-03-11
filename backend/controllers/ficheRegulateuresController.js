const FicheRegulateures = require("../models/FicheRegulateures");
const Notification = require("../models/Notification");

// récupérer la fiche
exports.getFicheRegulateures = async(req, res) => {
    try {
        const fiche = await FicheRegulateures.findOne().sort({ createdAt: -1 });

        if (!fiche) {
            return res.status(404).json({ message: "Aucune fiche trouvée" });
        }

        res.json(fiche);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// enregistrer (brouillon)
exports.enregistrerFicheRegulateures = async(req, res) => {
    try {
        const fiche = await FicheRegulateures.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }
        );

        res.json(fiche);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// envoyer fiche
// envoyer fiche regulateurs
exports.envoyerFicheRegulateures = async(req, res) => {
    try {
        const fiche = await FicheRegulateures.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });

        if (!fiche.technicienOperateur) {
            return res.status(400).json({ message: "Le champ technicien est vide" });
        }

        // changer statut
        fiche.statut = "envoyee";
        await fiche.save();

        // créer notification
        const notification = new Notification({
            type: "fiche_regulateures",
            message: `Le technicien ${fiche.technicienOperateur} a envoyé une fiche de régulateurs`,
            dataId: fiche._id,
            read: false,
        });

        await notification.save();

        res.json({ message: "Fiche envoyée avec succès" });

    } catch (error) {
        console.error("Erreur envoyerFicheRegulateures :", error);
        res.status(500).json({ message: error.message });
    }
};

// récupérer une fiche régulateures par ID
exports.getFicheRegulateuresById = async(req, res) => {
    try {
        const fiche = await FicheRegulateures.findById(req.params.id);
        if (!fiche) {
            return res.status(404).json({ message: "Fiche régulateures non trouvée" });
        }
        res.json(fiche);
    } catch (err) {
        console.error("Erreur getFicheRegulateuresById :", err);
        res.status(500).json({ message: err.message });
    }
};