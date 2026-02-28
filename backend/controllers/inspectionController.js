const Inspection = require("../models/Inspection");

// 🔹 CREATE
exports.createInspection = async(req, res) => {
    try {
        const inspection = new Inspection(req.body);
        await inspection.save();
        res.status(201).json(inspection);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 🔹 GET ALL
exports.getInspections = async(req, res) => {
    try {
        const data = await Inspection.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};