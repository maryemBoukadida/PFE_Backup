const FicheDGS = require("../models/FicheDGS");
const Notification = require("../models/Notification");
// récupérer la fiche DGS

exports.getFicheDGS = async(req, res) => {
    try {
        // prend le dernier document de la collection
        const fiche = await FicheDGS.findOne().sort({ createdAt: -1 });
        if (!fiche) return res.status(404).json({ message: "Aucune fiche trouvée" });

        res.json(fiche);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Enregistrer les modifications de la fiche (brouillon)
exports.enregistrerFicheDGS = async(req, res) => {
    try {
        const fiche = await FicheDGS.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });

        res.json({ message: "Fiche enregistrée avec succès", fiche });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Envoyer fiche (technicien)
exports.envoyerFicheDGS = async(req, res) => {
    try {
        const fiche = await FicheDGS.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });

        if (!fiche.technicien) {
            return res.status(400).json({ message: "Le champ technicien est vide" });
        }

        // changer statut
        fiche.statut = "envoyee";
        await fiche.save();

        // ✅ créer notification correcte
        const notification = new Notification({
            type: "fiche_dgs",
            message: `Le technicien ${fiche.technicien} a envoyé une fiche DGS`,
            dataId: fiche._id,
            read: false
        });

        await notification.save();

        res.json({ message: "Fiche envoyée avec succès" });

    } catch (error) {
        console.error("Erreur envoyerFicheDGS :", error);
        res.status(500).json({ message: error.message });
    }
};

exports.getFicheDGSById = async(req, res) => {
    try {
        const fiche = await FicheDGS.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });
        res.json(fiche);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};