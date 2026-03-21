const Inventaire = require("../models/Inventaire");


// 🔹 récupérer liste selon type
exports.getDesignationsByType = async(req, res) => {
    try {
        const { type } = req.params;

        const data = await Inventaire.findOne()
            .sort({ updatedAt: -1 })
            .lean();
        if (!data) {
            return res.status(404).json({ message: "Inventaire vide" });
        }

        let result = [];

        if (type === "balisage") {
            result = data.balisage_gmao || [];
        } else if (type === "pg") {
            result = data.PG_gmao || [];
        } else {
            result = data.autre || [];
        }

        res.status(200).json(result);

    } catch (error) {
        console.error(" getDesignationsByType ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

// 🔥 AJOUT / UPDATE (VERSION PROPRE)
exports.addOrUpdateEquipement = async(req, res) => {
    try {
        console.log("📥 BODY:", req.body);

        let {
            designation,
            quantite,
            emplacement
        } = req.body;

        // 🔥 validation
        if (!designation || !quantite || !emplacement) {
            return res.status(400).json({
                message: "designation, quantite et emplacement sont obligatoires"
            });
        }

        const data = await Inventaire.findOne().sort({ updatedAt: -1 });

        if (!data) {
            return res.status(404).json({ message: "Inventaire introuvable" });
        }

        // 🔥 mapping propre
        let collectionName;

        if (emplacement === "balisage") {
            collectionName = "balisage_gmao";
        } else if (emplacement === "pg") {
            collectionName = "PG_gmao";
        } else {
            collectionName = "autre";
        }

        // 🔥 sécurité tableau
        if (!Array.isArray(data[collectionName])) {
            data[collectionName] = [];
        }

        const collection = data[collectionName];

        // 🔍 recherche par designation uniquement
        const index = collection.findIndex(
            item =>
            item.designation &&
            item.designation.toLowerCase() === designation.toLowerCase()
        );

        console.log("🔎 INDEX:", index);

        if (index !== -1) {
            // ✅ UPDATE : SEULEMENT STOCK
            console.log("✏️ UPDATE STOCK");

            collection[index].stock =
                (collection[index].stock || 0) + Number(quantite);

        } else {

            collection.push({
                designation,
                stock: Number(quantite),
                type: collectionName
            });
        }

        await data.save();

        console.log(" SAVE OK");

        res.status(200).json({
            message: index !== -1 ?
                "Stock mis à jour " : "Equipement ajouté "
        });

    } catch (error) {
        console.error(" ERREUR:", error);
        res.status(500).json({ error: error.message });
    }
};