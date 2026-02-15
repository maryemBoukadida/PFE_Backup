const express = require("express");
const router = express.Router();
const Equipement = require("../models/Equipement");

// Route pour récupérer uniquement les stats "par lieu"
router.get("/stats", async(req, res) => {
    try {
        // Par lieu (SST1, SST2, Bureau, etc.)
        const parLieu = await Equipement.aggregate([{
            $group: {
                _id: "$lieu_installation",
                count: { $sum: 1 }
            }
        }]);

        res.json({ parLieu });

    } catch (err) {
        console.log("❌ Dashboard error:", err);
        res.status(500).json({ message: "Erreur dashboard" });
    }
});

module.exports = router;



// Stats par équipement et fournisseur
router.get("/stats-by-equipment", async(req, res) => {
    try {
        const stats = await Equipement.aggregate([{
            $group: {
                _id: { equipement: "$designation_equipement", fournisseur: "$fournisseur" },
                count: { $sum: 1 }
            }
        }]);
        res.json(stats);
    } catch (err) {
        console.log("❌ Dashboard error:", err);
        res.status(500).json({ message: "Erreur dashboard" });
    }
});