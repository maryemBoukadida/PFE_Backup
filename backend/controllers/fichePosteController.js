const FichePoste = require("../models/FichePoste");
const Notification = require("../models/Notification");

// récupérer la fiche poste
exports.getFichePoste = async(req, res) => {
    try {
        const fiche = await FichePoste.findOne().sort({ date: -1 });

        if (!fiche) {
            return res.status(404).json({ message: "Aucune fiche poste trouvée" });
        }

        res.json(fiche);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Enregistrer les modifications de la fiche (brouillon)
exports.enregistrerFichePostes = async(req, res) => {
    try {
        const fiche = await FichePoste.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true } // renvoie la fiche mise à jour
        );

        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });

        res.json({ message: "Fiche enregistrée avec succès", fiche });
    } catch (error) {
        console.error(error); // log de l’erreur complète
        res.status(500).json({ message: error.message });
    }
};
// envoyer la fiche poste à l'admin
exports.envoyerFichePostes = async(req, res) => {
    try {
        const fiche = await FichePoste.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });

        if (!fiche.technicien || fiche.technicien.trim() === "") {
            return res.status(400).json({ message: "Le champ technicien est vide" });
        }

        // changer le statut
        fiche.statut = "envoyee";
        await fiche.save();

        // créer notification pour admin
        const notification = new Notification({
            type: "fiche_postes",
            message: `Le technicien ${fiche.technicien} a envoyé une fiche de postes`,
            dataId: fiche._id,
            read: false,
        });
        await notification.save();


        res.json({ message: "Fiche envoyée avec succès" });
    } catch (error) {
        console.error("Erreur envoyerFichePostes :", error);
        res.status(500).json({ message: error.message });
    }
}; // récupérer une fiche poste par ID
exports.getFichePostesById = async(req, res) => {
    try {
        const fiche = await FichePoste.findById(req.params.id);
        if (!fiche) {
            return res.status(404).json({ message: "Fiche poste non trouvée" });
        }
        res.json(fiche);
    } catch (err) {
        console.error("Erreur getFichePostesById :", err);
        res.status(500).json({ message: err.message });
    }
};