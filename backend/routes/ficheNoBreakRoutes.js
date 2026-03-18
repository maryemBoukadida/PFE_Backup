const express = require("express");
const router = express.Router();

const {
    creerFicheNoBreak,
    getFichesNoBreak,
    getFicheNoBreakById,
    envoyerFicheNoBreak,
    validerFicheNoBreak
} = require("../controllers/ficheNoBreakController");

const Notification = require("../models/Notification");

// POST
router.post("/", creerFicheNoBreak);

// GET ALL
router.get("/", getFichesNoBreak);

// NOTIFICATIONS
router.get("/notifications", async(req, res) => {
    try {
        const notifications = await Notification.find({ type: "fiche_nobreak" }).sort({ date: -1 });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: "Erreur récupération notifications" });
    }
});

// ENVOYER
router.put("/envoyer/:id", envoyerFicheNoBreak);
router.post("/valider", validerFicheNoBreak);
// GET BY ID
router.get("/:id", getFicheNoBreakById);

module.exports = router;