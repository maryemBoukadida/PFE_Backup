const express = require("express");
const router = express.Router();

const {
    creerFicheCorrective,
    getFichesCorrective,
    getFicheCorrectiveById,
    envoyerFicheCorrective,
    validerFicheCorrective
} = require("../controllers/ficheCorrectiveController");

const Notification = require("../models/Notification");

// POST
router.post("/", creerFicheCorrective);

// GET ALL
router.get("/", getFichesCorrective);
// NOTIFICATIONS
router.get("/notifications", async(req, res) => {
    try {
        const notifications = await Notification.find({ type: "fiche_corrective" }).sort({ date: -1 });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: "Erreur récupération notifications" });
    }
});
// ENVOYER
router.put("/envoyer/:id", envoyerFicheCorrective);

// VALIDER
router.post("/valider", validerFicheCorrective);
// GET BY ID
router.get("/:id", getFicheCorrectiveById);




module.exports = router;