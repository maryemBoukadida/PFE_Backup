const express = require("express");
const router = express.Router();
const {
    creerFicheEffar,
    getFichesEffar,
    envoyerFicheEffar,
    getFicheEffarById,
    validerFicheEffar
} = require("../controllers/ficheEffarController");
const Notification = require("../models/Notification");

// POST créer fiche
router.post("/", creerFicheEffar);

// GET toutes les fiches
router.get("/", getFichesEffar);

// GET fiche par ID
router.get("/:id", getFicheEffarById);

// PUT envoyer fiche
router.put("/envoyer/:id", envoyerFicheEffar);

// POST valider fiche
router.post("/valider", validerFicheEffar);

// GET notifications
router.get("/notifications", async(req, res) => {
    try {
        const notifications = await Notification.find({ type: "fiche_effar" }).sort({ date: -1 });
        res.json(notifications);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur récupération notifications" });
    }
});

module.exports = router;