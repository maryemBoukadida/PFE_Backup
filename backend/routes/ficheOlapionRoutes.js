const express = require("express");
const router = express.Router();

const {
    creerFicheOlapion,
    getFichesOlapion,
    getFicheOlapionById,
    envoyerFicheOlapion,
    validerFicheOlapion
} = require("../controllers/ficheOlapionController");

const Notification = require("../models/Notification");

// ================= ROUTES FICHE =================
router.post("/", creerFicheOlapion);
router.get("/", getFichesOlapion);
router.get("/:id", getFicheOlapionById);
router.put("/envoyer/:id", envoyerFicheOlapion);
router.post("/valider", validerFicheOlapion);

// ================= NOTIFICATIONS =================
router.get("/notifications", async(req, res) => {
    try {
        const notifications = await Notification.find({ type: "fiche_olapion" })
            .sort({ date: -1 });

        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: "Erreur notifications" });
    }
});

module.exports = router;