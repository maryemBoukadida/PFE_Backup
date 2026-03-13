const FicheFeuxEncastres = require('../models/ficheFeuxEncastres')
const Notification = require("../models/Notification");

exports.getFicheFeuxEncastres = async(req, res) => {
    try {
        // Récupère la dernière fiche (triée par date décroissante)
        const fiche = await FicheFeuxEncastres.findOne().sort({ date: -1 });

        if (!fiche) {
            return res.status(404).json({ message: "Aucune fiche feux encastrés trouvée" });
        }

        res.json(fiche);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
// ===================== ENREGISTRER FICHE =====================
exports.enregistrerFicheFeuxEncastres = async(req, res) => {
    try {

        const fiche = await FicheFeuxEncastres.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }
        );

        if (!fiche) {
            return res.status(404).json({ message: "Fiche non trouvée" });
        }

        res.json({
            message: "Fiche feux encastrés enregistrée avec succès",
            fiche
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
//envoie de la fiche 
exports.envoyerFicheFeuxEncastres = async(req, res) => {
    try {

        const fiche = await FicheFeuxEncastres.findById(req.params.id);

        if (!fiche)
            return res.status(404).json({ message: "Fiche non trouvée" });

        if (!fiche.technicienOperateurs || fiche.technicienOperateurs.trim() === "") {
            return res.status(400).json({ message: "Le champ technicien est vide" });
        }

        // changer le statut
        fiche.statut = "envoyee";

        await fiche.save();

        // notification admin
        const notification = new Notification({
            type: "fiche_feux_encastres",
            message: `Le technicien ${fiche.technicienOperateurs} a envoyé une fiche feux encastrés`,
            dataId: fiche._id,
            read: false
        });

        await notification.save();

        res.json({ message: "Fiche feux encastrés envoyée avec succès" });

    } catch (error) {
        console.error("Erreur envoyerFicheFeuxEncastres :", error);
        res.status(500).json({ message: error.message });
    }
};

//recuperer une fichier par ID 
exports.getFicheFeuxEncastresById = async(req, res) => {
    try {

        const fiche = await FicheFeuxEncastres.findById(req.params.id);

        if (!fiche) {
            return res.status(404).json({ message: "Fiche Feux Encastres non trouvée" });
        }

        res.json(fiche);

    } catch (err) {

        console.error("Erreur getFicheFeuxEncastresById :", err);
        res.status(500).json({ message: err.message });

    }
};