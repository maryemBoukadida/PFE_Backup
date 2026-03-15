const express = require("express");
const router = express.Router();
const HistoriqueAction = require("../models/HistoriqueAction"); // modèle mongoose

// GET toutes les actions
router.get("/", async(req, res) => {
    try {
        const actions = await HistoriqueAction.find().sort({ date: -1 });
        res.json(actions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// POST ajouter une action
router.post("/", async(req, res) => {
    try {
        const newAction = new HistoriqueAction(req.body);
        const savedAction = await newAction.save();
        res.status(201).json(savedAction);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;