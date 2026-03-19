const express = require("express");
const router = express.Router();

const {
    creerFicheBalisage,
    getFichesBalisage,
    getFicheBalisageById,
    envoyerFicheBalisage,
    validerFicheBalisage
} = require("../controllers/ficheBalisageController");

const Notification = require("../models/Notification");

// ================= ROUTES FICHE =================
router.post("/", creerFicheBalisage);
router.get("/", getFichesBalisage);
router.get("/:id", getFicheBalisageById);
router.put("/envoyer/:id", envoyerFicheBalisage);
router.post("/valider", validerFicheBalisage);

// ================= NOTIFICATIONS =================
router.get("/notifications", async(req, res) => {
    try {
        const notifications = await Notification.find({ type: "fiche_balisage" })
            .sort({ date: -1 });

        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: "Erreur notifications" });
    }
});

module.exports = router;