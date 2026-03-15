const express = require("express");
const router = express.Router();

const {
    creerFicheAnnInfrastructure,
    getFichesAnnInfrastructure,
    envoyerFicheAnnInfrastructure,
    getFicheAnnInfrastructureById,
    validerFicheAnnInfrastructure
} = require("../controllers/ficheAnnInfrastructureController");
const Notification = require("../models/Notification");

// POST enregistrer fiche
router.post("/", creerFicheAnnInfrastructure);

// GET toutes les fiches
router.get("/", getFichesAnnInfrastructure);

// GET fiche par ID
router.get("/:id", getFicheAnnInfrastructureById);
router.post("/valider", validerFicheAnnInfrastructure);


// ===================== ROUTE NOTIFICATIONS =====================
router.get("/notifications", async(req, res) => {
    try {
        const notifications = await Notification.find({ type: "fiche_ann_infrastructure" }).sort({ date: -1 });
        res.json(notifications);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur récupération notifications" });
    }
});


// PUT envoyer fiche
router.put("/envoyer/:id", envoyerFicheAnnInfrastructure);
module.exports = router;