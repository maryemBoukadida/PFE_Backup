const FicheSemesDgs = require("../models/ficheSemesDgs");
const Notification = require("../models/Notification");

// GET dernière fiche semestrielle DGS
exports.getFicheSemesDgs = async(req, res) => {
    try {

        const fiche = await FicheSemesDgs.findOne().sort({ Date: -1 });

        if (!fiche) {
            return res.status(404).json({
                message: "Aucune fiche semestrielle DGS trouvée"
            });
        }

        res.json(fiche);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


// PUT : enregistrer / mettre à jour la fiche
exports.enregistrerFicheSemesDgs = async(req, res) => {
    try {

        const { id } = req.params;
        const data = req.body;

        const fiche = await FicheSemesDgs.findByIdAndUpdate(id, data, {
            new: true
        });

        if (!fiche) {
            return res.status(404).json({
                message: "Fiche DGS non trouvée"
            });
        }

        res.json(fiche);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


// PUT : envoyer la fiche
exports.envoyerFicheSemesDgs = async(req, res) => {
    try {

        const fiche = await FicheSemesDgs.findById(req.params.id);

        if (!fiche)
            return res.status(404).json({ message: "Fiche non trouvée" });

        if (!fiche["Technicien Operateures"] || fiche["Technicien Operateures"].trim() === "") {
            return res.status(400).json({
                message: "Le champ technicien est vide"
            });
        }

        // statut
        fiche.statut = "envoyee";

        await fiche.save();

        // notification admin
        const notification = new Notification({
            type: "fiche_semes_dgs",
            message: `Le technicien ${fiche["Technicien Operateures"]} a envoyé une fiche d'inspection semestrielle DGS`,
            dataId: fiche._id,
            read: false
        });

        await notification.save();

        res.json({
            message: "Fiche DGS envoyée avec succès"
        });

    } catch (error) {
        console.error("Erreur envoyerFicheSemesDgs :", error);
        res.status(500).json({ message: error.message });
    }
};


// GET fiche par ID
exports.getFicheSemesDgsById = async(req, res) => {
    try {

        const fiche = await FicheSemesDgs.findById(req.params.id);

        if (!fiche) {
            return res.status(404).json({
                message: "Fiche semestrielle DGS non trouvée"
            });
        }

        res.json(fiche);

    } catch (err) {
        console.error("Erreur getFicheSemesDgsById :", err);
        res.status(500).json({ message: err.message });
    }
};