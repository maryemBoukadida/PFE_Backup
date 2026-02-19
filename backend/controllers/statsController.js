const Equipement = require("../models/Equipement");

// 🔹 Statistiques des équipements par lieu
exports.getStatsByLieu = async(req, res) => {
    try {
        const stats = await Equipement.aggregate([{
            $group: {
                _id: "$lieu_installation",
                count: { $sum: 1 }
            }
        }]);
        res.json(stats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔹 Statistiques par fournisseur
exports.getStatsByFournisseur = async(req, res) => {
    try {
        const stats = await Equipement.aggregate([{
            $group: {
                _id: "$fournisseur",
                count: { $sum: 1 }
            }
        }]);
        res.json(stats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};