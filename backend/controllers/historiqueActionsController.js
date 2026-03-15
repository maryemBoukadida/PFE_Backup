// backend/controllers/historiqueActionsController.js
const HistoriqueAction = require("../models/HistoriqueAction");

exports.ajouterAction = async(req, res) => {
    try {
        const { type, message, dataId, ficheData, user } = req.body;

        const action = new HistoriqueAction({
            type,
            message,
            dataId,
            ficheData,
            user
        });

        await action.save();
        res.status(201).json(action);

    } catch (err) {
        console.error("Erreur ajouterAction :", err);
        res.status(500).json({ message: err.message });
    }
};

exports.getActions = async(req, res) => {
    try {
        const actions = await HistoriqueAction.find().sort({ date: -1 });
        res.json(actions);
    } catch (err) {
        console.error("Erreur getActions :", err);
        res.status(500).json({ message: err.message });
    }
};