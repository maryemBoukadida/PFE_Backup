const express = require("express");
const router = express.Router();

const {
    creerFicheAnnCable,
    getFichesAnnCable,
    getFicheAnnCableById,
    envoyerFicheAnnCable,
    validerFicheAnnCable
} = require("../controllers/ficheAnnCableController");

const Notification = require("../models/Notification");

// POST enregistrer fiche
router.post("/", creerFicheAnnCable);

// GET toutes les fiches
router.get("/", getFichesAnnCable);

// GET fiche par ID
router.get("/:id", getFicheAnnCableById);

// PUT envoyer fiche
router.put("/envoyer/:id", envoyerFicheAnnCable);

// POST valider fiche
router.post("/valider", validerFicheAnnCable);

// GET notifications
router.get("/notifications", async(req, res) => {
    try {
        const notifications = await Notification.find({ type: "fiche_ann_cable" }).sort({ date: -1 });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: "Erreur récupération notifications" });
    }
});

module.exports = router;