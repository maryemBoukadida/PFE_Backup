const express = require("express");
const router = express.Router();

const {
    creerFicheQuiPapi,
    getFichesQuiPapi,
    getFicheQuiPapiById,
    envoyerFicheQuiPapi,
    validerFicheQuiPapi
} = require("../controllers/ficheQuiPapiController");
const Notification = require("../models/Notification");

// POST enregistrer fiche
router.post("/", creerFicheQuiPapi);

// GET toutes les fiches
router.get("/", getFichesQuiPapi);

// GET fiche par ID
router.get("/:id", getFicheQuiPapiById);

// PUT envoyer fiche
router.put("/envoyer/:id", envoyerFicheQuiPapi);

// POST valider fiche
router.post("/valider", validerFicheQuiPapi);

// GET notifications
router.get("/notifications", async(req, res) => {
    try {
        const notifications = await Notification.find({ type: "fiche_quinquennale_papi" }).sort({ date: -1 });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: "Erreur récupération notifications" });
    }
});

module.exports = router;