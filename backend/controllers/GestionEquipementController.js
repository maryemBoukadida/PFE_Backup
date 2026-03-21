const Inventaire = require("../models/Inventaire");

//  GET BALISAGE
exports.getBalisage = async(req, res) => {
    try {
        const data = await Inventaire.findOne()
            .sort({ updatedAt: -1 })
            .lean();

        if (!data) {
            return res.status(404).json({ message: "Inventaire vide" });
        }

        res.status(200).json(data.balisage_gmao || []);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//  GET PG (corrigé comme balisage)
exports.getPG = async(req, res) => {
    try {
        const data = await Inventaire.findOne()
            .sort({ updatedAt: -1 })
            .lean();


        if (!data) {
            return res.status(404).json({ message: "Inventaire vide" });
        }

        res.status(200).json(data.PG_gmao || []);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//  GET AUTRE (nouvelle fonction)
exports.getAutre = async(req, res) => {
    try {
        const data = await Inventaire.findOne()
            .sort({ updatedAt: -1 })
            .lean();

        if (!data) {
            return res.status(404).json({ message: "Inventaire vide" });
        }

        res.status(200).json(data.autre || []);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};