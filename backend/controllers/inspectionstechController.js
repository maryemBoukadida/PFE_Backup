const Inspection = require("../models/Inspec_tech");
const Notification = require("../models/Notification");

// 🔹 Envoyer fiche inspection (technicien)
exports.envoyerInspection = async(req, res) => {
    try {
        const { matricule, periode, inspections } = req.body;

        // Pré-remplir tous les champs sans ?. ni ?? 
        const inspectionsPreRemplies = inspections.map(i => {
            const matin = i.matin || {};
            const nuit = i.nuit || {};

            return {
                zone: i.zone || "",
                element: i.element || "",
                matin: {
                    etat: matin.etat || "",
                    observation: matin.observation || "",
                    intervention: matin.intervention || "",
                    nbrNF: typeof matin.nbrNF === "number" ? matin.nbrNF : 0
                },
                nuit: {
                    etat: nuit.etat || "",
                    observation: nuit.observation || "",
                    intervention: nuit.intervention || "",
                    nbrNF: typeof nuit.nbrNF === "number" ? nuit.nbrNF : 0
                }
            };
        });

        const nouvelleFiche = new Inspection({
            matricule,
            periode,
            inspections: inspectionsPreRemplies,
            status: "En attente"
        });

        await nouvelleFiche.save();

        // Notification admin
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
        if (!fiche) return res.status(404).json({ message: "Fiche introuvable" });

        // 🔹 S'assurer que les inspections existent
        if (!fiche.inspections) fiche.inspections = [];

        res.json(fiche);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};