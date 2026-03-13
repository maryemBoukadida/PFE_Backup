const FicheSemesRegulateures = require("../models/ficheSemesRegulateures");
const Notification = require("../models/Notification");

// GET dernière fiche semestrielle régulateurs
exports.getFicheSemesRegulateures = async(req, res) => {
    try {
        // récupérer la dernière fiche (tri par date décroissante)
        const fiche = await FicheSemesRegulateures.findOne().sort({ date: -1 });

        if (!fiche) {
            return res
                .status(404)
                .json({ message: "Aucune fiche semestrielle régulateurs trouvée" });
        }

        res.json(fiche);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Enregistrer / mettre à jour une fiche
exports.enregistrerFicheSemesRegulateures = async(req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const fiche = await FicheSemesRegulateures.findByIdAndUpdate(
            id,
            data, { new: true } // renvoie la fiche mise à jour
        );

        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });

        res.json({ message: "Fiche régulateurs enregistrée avec succès", fiche });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Envoyer la fiche
exports.envoyerFicheSemesRegulateures = async(req, res) => {
    try {
        const fiche = await FicheSemesRegulateures.findById(req.params.id);

        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });

        if (!fiche.Technicien_Operateurs || fiche.Technicien_Operateurs.trim() === "") {
            return res.status(400).json({ message: "Le champ technicien est vide" });
        }

        // Changer le statut
        fiche.statut = "envoyee";
        await fiche.save();

        // Notification admin
        const notification = new Notification({
            type: "fiche_regulateurs",
            message: `Le technicien ${fiche.Technicien_Operateurs} a envoyé une fiche d'inspection semestrielle de régulateurs`,
            dataId: fiche._id,
            read: false,
        });

        await notification.save();

        res.json({ message: "Fiche régulateurs envoyée avec succès" });
    } catch (error) {
        console.error("Erreur envoyerFicheSemesRegulateures :", error);
        res.status(500).json({ message: error.message });
    }
};
// Récupérer une fiche régulateurs par ID
exports.getFicheSemesRegulateuresById = async(req, res) => {
    try {
        const fiche = await FicheSemesRegulateures.findById(req.params.id);

        if (!fiche) {
            return res.status(404).json({ message: "Fiche semestrielle régulateurs non trouvée" });
        }

        res.json(fiche);
    } catch (err) {
        console.error("Erreur getFicheSemesRegulateuresById :", err);
        res.status(500).json({ message: err.message });
    }
};