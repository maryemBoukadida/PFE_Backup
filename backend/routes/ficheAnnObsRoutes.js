const express = require("express");
const router = express.Router();

const {
    creerFicheAnnObs,
    getFichesAnnObs,
    envoyerFicheAnnObs,
    getFicheAnnObsById,
    validerFicheAnnObs
} = require("../controllers/ficheAnnObsController");

const Notification = require("../models/Notification");

// créer fiche
router.post("/", creerFicheAnnObs);

// récupérer fiches
router.get("/", getFichesAnnObs);

// récupérer fiche par id
router.get("/:id", getFicheAnnObsById);

// valider
router.post("/valider", validerFicheAnnObs);

// notifications
router.get("/notifications", async(req, res) => {
    try {
        const notifications = await Notification.find({
            type: "fiche_ann_obs",
        }).sort({ date: -1 });

        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: "Erreur récupération notifications" });
    }
});

// envoyer
router.put("/envoyer/:id", envoyerFicheAnnObs);

module.exports = router;