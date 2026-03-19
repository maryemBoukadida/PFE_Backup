const express = require("express");
const router = express.Router();

const {
    creerFiche2250KVA,
    getFiches2250KVA,
    getFiche2250KVAById,
    envoyerFiche2250KVA,
    validerFiche2250KVA
} = require("../controllers/fiche2250KVAController");

const Notification = require("../models/Notification");

router.post("/", creerFiche2250KVA);
router.get("/", getFiches2250KVA);
router.get("/:id", getFiche2250KVAById);
router.put("/envoyer/:id", envoyerFiche2250KVA);
router.post("/valider", validerFiche2250KVA);

// notifications
router.get("/notifications", async(req, res) => {
    try {
        const notifications = await Notification.find({ type: "fiche_2250kva" }).sort({ date: -1 });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: "Erreur notifications" });
    }
});

module.exports = router;