const Inspection = require("../models/Inspec_tech");
const Notification = require("../models/Notification");

// 🔹 Envoyer fiche inspection (technicien)
exports.envoyerInspection = async(req, res) => {
    try {
        const { matricule, periode, inspections } = req.body;

        const nouvelleFiche = new Inspection({
            matricule,
            periode,
            inspections,
            status: "En attente"
        });
        await nouvelleFiche.save();

        // 🔹 Notification admin
        await Notification.create({
            type: "inspection",
            message: `Technicien ${matricule} a envoyé une fiche d'inspection.`,
            dataId: nouvelleFiche._id,
            read: false
        });

        res.status(200).json({ message: "Fiche envoyée et notification créée ✅" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// 🔹 Notifications admin
exports.getNotifications = async(req, res) => {
    try {
        const notifs = await Notification.find({ read: false }).sort({ date: -1 });
        res.json(notifs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Obtenir fiche par ID
exports.getFicheById = async(req, res) => {
    try {
        const fiche = await Inspection.findById(req.params.id);
        res.json(fiche);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Valider fiche (admin)
exports.validerFiche = async(req, res) => {
    try {
        const { inspectionId } = req.body;
        await Inspection.findByIdAndUpdate(inspectionId, { status: "Validée" });
        // marquer notification comme lue
        await Notification.updateMany({ dataId: inspectionId }, { read: true });
        res.json({ message: "Fiche validée ✅" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};