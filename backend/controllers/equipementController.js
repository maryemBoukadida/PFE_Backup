// backend/controllers/equipementController.js
const Equipement = require("../models/Equipement.js");

// 🔹 Récupérer tous les équipements
exports.getAll = async(req, res) => {
    try {
        const equipements = await Equipement.find();
        console.log("📦 Equipements récupérés :", equipements.length);
        res.json(equipements);
    } catch (err) {
        console.error("❌ Erreur GET all :", err);
        res.status(500).json({ message: "Erreur serveur récupération" });
    }
};

// 🔹 Créer un nouvel équipement
exports.create = async(req, res) => {
    try {
        const newEquipement = new Equipement(req.body);
        const saved = await newEquipement.save();
        console.log("✅ Équipement créé :", saved.code_patrimoine);
        res.status(201).json({ message: "Équipement créé ✅", data: saved });
    } catch (err) {
        console.error("❌ Erreur création :", err);
        res.status(500).json({ message: "Erreur serveur création" });
    }
};

// 🔹 Supprimer un équipement par code_patrimoine
// DELETE par ID Mongo
exports.remove = async(req, res) => {
    try {
        const { id } = req.params;
        console.log("🗑 DELETE reçu pour ID :", id);

        const deleted = await Equipement.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Équipement introuvable" });

        res.json({ message: `Équipement "${deleted.designation_equipement}" supprimé ✅` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur suppression" });
    }
};


// 🔹 Mettre à jour un équipement par ID Mongo
exports.update = async(req, res) => {
    try {
        const { id } = req.params;
        const updated = await Equipement.findByIdAndUpdate(id, req.body, { new: true });

        if (!updated) {
            console.log("⚠️ Équipement introuvable pour mise à jour :", id);
            return res.status(404).json({ message: "Équipement introuvable" });
        }

        console.log("✅ Équipement mis à jour :", updated.code_patrimoine);
        res.json({ message: "Équipement mis à jour ✅", data: updated });

    } catch (err) {
        console.error("❌ Erreur PUT :", err);
        res.status(500).json({ message: "Erreur serveur mise à jour" });
    }
};