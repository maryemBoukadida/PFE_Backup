// backend/controllers/equipementController.js
const Equipement = require("../models/Equipement.js");
const InventairePG = require("../models/InventairePG"); // adapte selon ton modèle

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
/*
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
*/
exports.createEquipement = async(req, res) => {
    try {
        const newEquipement = new Equipement(req.body);
        await newEquipement.save();

        // 🔥 Création automatique dans inventaire
        await InventairePG.create({
            code_oracle: newEquipement.code_patrimoine,
            reference: newEquipement.code_patrimoine,
            designation: newEquipement.designation_equipement,
            stock_actuel: 0 // valeur initiale
        });

        res.status(201).json({ message: "Équipement + inventaire créés ✅" });

    } catch (error) {
        res.status(500).json({ message: error.message });
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

// 🔹 Récupérer fichier Excel par code patrimoine
exports.getFileByCode = async(req, res) => {
    try {
        const code = req.params.code.trim();

        const equipement = await Equipement.findOne({
            code_patrimoine: { $regex: `^\\s*${code}\\s*$`, $options: "i" }
        });

        if (!equipement) {
            return res.status(404).json({ message: "Fichier PDF introuvable" });
        }

        res.json({
            fileUrl: `http://localhost:5000/${equipement.pdf_file.replace("uploads/", "")}`
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }
};