const FicheAnnPaMa = require("../models/ficheAnnPaMa");
//const Notification = require("../models/Notification");

// ================= GET dernière fiche =================
exports.getFicheAnnPaMa = async(req, res) => {
    try {
        const fiche = await FicheAnnPaMa.findOne().sort({ date: -1 });
        if (!fiche) return res.status(404).json({ message: "Aucune fiche trouvée" });
        res.json(fiche);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
// POST créer nouvelle fiche
exports.creerFicheAnnPaMa = async(req, res) => {
    try {
        const fiche = new FicheAnnPaMa(req.body);
        await fiche.save();
        res.status(201).json(fiche);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
/*
// ================= GET fiche par ID =================
exports.getFicheAnnPaMaById = async(req, res) => {
    try {
        const fiche = await FicheAnnPaMa.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });
        res.json(fiche);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
*/
// ================= PUT enregistrer =================
exports.enregistrerFicheAnnPaMa = async(req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const fiche = await FicheAnnPaMa.findByIdAndUpdate(id, data, { new: true });
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });
        res.json(fiche);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
/*
// ================= PUT envoyer =================
exports.envoyerFicheAnnPaMa = async(req, res) => {
    try {
        const fiche = await FicheAnnPaMa.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });
        if (!fiche.techniciens_operateurs || fiche.techniciens_operateurs.length === 0)
            return res.status(400).json({ message: "Le champ techniciens est vide" });

        fiche.statut = "envoyee";
        await fiche.save();

        const notification = new Notification({
            type: "fiche_ann_pa_ma",
            message: `Le technicien ${fiche.techniciens_operateurs} a envoyé une fiche annuelle PaMa`,
            dataId: fiche._id,
            read: false
        });
        await notification.save();

        res.json({ message: "Fiche envoyée avec succès" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
*/