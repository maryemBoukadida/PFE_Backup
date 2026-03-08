const FichePapi = require("../models/fichePapiModel");
const Notification = require("../models/Notification");
const HistoriquePapi = require("../models/HistoriquePapi");

exports.getFicheById = async(req, res) => {
    try {
        const fiche = await FichePapi.findById(req.params.id);

        if (!fiche) {
            return res.status(404).json({ message: "Fiche non trouvée" });
        }

        res.json(fiche);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔹 Récupérer toutes les fiches
exports.getFiches = async(req, res) => {
    try {
        const fiches = await FichePapi.find().sort({ date: -1 });
        res.json(fiches);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err });
    }
};

// 🔹 Mettre à jour une fiche
exports.updateFiche = async(req, res) => {
    try {
        const { id } = req.params;

        const fiche = await FichePapi.findByIdAndUpdate(
            id,
            req.body, { new: true }
        );

        res.json(fiche);
    } catch (err) {
        res.status(500).json({ message: "Erreur mise à jour", error: err });
    }
};

// 🔹 Envoyer une fiche
exports.sendFiche = async(req, res) => {
    try {
        const { id } = req.params;

        const fiche = await FichePapi.findByIdAndUpdate(
            id, { status: "Envoyée" }, { new: true }
        );

        if (!fiche) {
            return res.status(404).json({ message: "Fiche non trouvée" });
        }

        // ✅ correction ici
        await Notification.create({
            type: "fiche_papi",
            message: `Technicien ${fiche.techniciens || "Inconnu"} a envoyé une fiche PAPI`,
            dataId: fiche._id,
            read: false
        });

        res.json(fiche);

    } catch (error) {
        console.error("Erreur sendFiche:", error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// 🔹 Notifications
exports.getFichePapiNotifications = async(req, res) => {
    try {
        const notifs = await Notification.find({
            type: "fiche_papi",
            read: false
        }).sort({ createdAt: -1 });

        res.json(notifs);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err });
    }
};

exports.validerFiche = async(req, res) => {
    const { id } = req.params; // obligatoire pour /valider/:id
    try {
        const fiche = await FichePapi.findById(id);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });

        const hist = new HistoriquePapi({
            verifications: fiche.verifications,
            observations: fiche.observations,
            date: fiche.date,
            techniciens: fiche.techniciens,
            type: "PAPI", // Obligatoire pour éviter ValidationError
            status: "Validée", // Facultatif mais pratique
        });

        await hist.save();
        await FichePapi.findByIdAndDelete(id);

        res.json({
            message: "Fiche validée et déplacée dans l'historique !",
            historiqueId: hist._id,
        });
    } catch (err) {
        console.error("❌ Erreur validerFiche :", err);
        res.status(500).json({ message: "Erreur serveur", error: err });
    }
};
// valider inspections 
exports.validerInspection = async(req, res) => {
    try {

        const { id } = req.body;

        const inspection = await Inspection.findById(id);

        if (!inspection) {
            return res.status(404).json({ message: "Inspection non trouvée" });
        }

        inspection.valide = true;

        await inspection.save();

        res.json({
            message: "Inspection validée",
            inspection
        });

    } catch (error) {
        console.error("Erreur validation:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }

};

exports.markNotificationRead = async(req, res) => {
    try {

        await Notification.findByIdAndUpdate(
            req.params.id, { read: true }
        );

        res.json({ message: "Notification marquée comme lue" });

    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err });
    }
};

exports.getHistoriquePapi = async(req, res) => {
    try {
        const historique = await HistoriquePapi.find().sort({ date: -1 });

        const data = historique.map(f => ({
            _id: f._id,
            type: f.type, // PAPI
            techniciens: f.techniciens,
            date: f.date
        }));

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur", error: err });
    }
};