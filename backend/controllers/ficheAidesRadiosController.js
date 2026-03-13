const FicheAidesRadios = require("../models/FicheAidesRadios");
const Notification = require("../models/Notification");

// récupérer la fiche aides radios
exports.getFicheAidesRadios = async(req, res) => {
    try {
        const fiche = await FicheAidesRadios.findOne().sort({ date: -1 });

        if (!fiche) {
            return res.status(404).json({ message: "Aucune fiche aides radios trouvée" });
        }

        res.json(fiche);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// enregistrer ou mettre à jour une fiche aides radios
exports.enregistrerFicheAidesRadios = async(req, res) => {
    try {
        const fiche = await FicheAidesRadios.findByIdAndUpdate(
            req.params.id, // l'ID de la fiche à mettre à jour
            req.body, // données envoyées depuis le frontend
            { new: true } // renvoie la fiche mise à jour
        );

        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });

        res.json({ message: "Fiche aides radios enregistrée avec succès", fiche });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
// envoyer la fiche aides radios à l'admin
exports.envoyerFicheAidesRadios = async(req, res) => {
    try {
        const fiche = await FicheAidesRadios.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });

        if (!fiche.technicien_operateur || fiche.technicien_operateur.trim() === "") {
            return res.status(400).json({ message: "Le champ technicien est vide" });
        }

        // changer le statut
        fiche.statut = "envoyee";
        await fiche.save();

        // créer notification pour admin
        const notification = new Notification({
            type: "fiche_aides_radios",
            message: `Le technicien ${fiche.technicien_operateur} a envoyé une fiche aides radios`,
            dataId: fiche._id,
            read: false,
        });
        await notification.save();

        res.json({ message: "Fiche envoyée avec succès" });
    } catch (error) {
        console.error("Erreur envoyerFicheAidesRadios :", error);
        res.status(500).json({ message: error.message });
    }
};
// récupérer une fiche aides radios par ID
exports.getFicheAidesRadiosById = async(req, res) => {
    try {
        const fiche = await FicheAidesRadios.findById(req.params.id);
        if (!fiche) {
            return res.status(404).json({ message: "Fiche Aides Radios non trouvée" });
        }
        res.json(fiche);
    } catch (err) {
        console.error("Erreur getFicheAidesRadiosById :", err);
        res.status(500).json({ message: err.message });
    }
};