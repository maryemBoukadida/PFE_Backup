const express = require("express");
const router = express.Router();

const {
    creerFicheAnnFeuxSeq,
    getFichesAnnFeuxSeq,
    getFicheAnnFeuxSeqById,
    envoyerFicheAnnFeuxSeq,
    validerFicheAnnFeuxSeq
} = require("../controllers/ficheAnnFeuxSeqController");
const Notification = require("../models/Notification");

// POST enregistrer fiche
router.post("/", creerFicheAnnFeuxSeq);

// GET toutes les fiches
router.get("/", getFichesAnnFeuxSeq);

// GET fiche par ID
router.get("/:id", getFicheAnnFeuxSeqById);

// PUT envoyer fiche
router.put("/envoyer/:id", envoyerFicheAnnFeuxSeq);

// POST valider fiche
router.post("/valider", validerFicheAnnFeuxSeq);

// GET notifications
router.get("/notifications", async(req, res) => {
    try {
        const notifications = await Notification.find({ type: "fiche_ann_feux_sequentiels" }).sort({ date: -1 });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: "Erreur récupération notifications" });
    }
});

module.exports = router;