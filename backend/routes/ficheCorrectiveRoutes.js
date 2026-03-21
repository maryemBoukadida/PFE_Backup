const express = require("express");
const router = express.Router();

const {
    creerFicheCorrective,
    getFichesCorrective,
    getFicheCorrectiveById,
    envoyerFicheCorrective,
    validerFicheCorrective,
    updateStock,
    getAllDesignations
} = require("../controllers/ficheCorrectiveController");

const Notification = require("../models/Notification");



// POST
router.post("/", creerFicheCorrective);

// GET ALL
router.get("/", getFichesCorrective);


// ✅ 🔥 METTRE AVANT :id
router.get("/all", getAllDesignations);
// UPDATE STOCK
router.put("/update-stock", updateStock);
// GET BY ID
router.get("/:id", getFicheCorrectiveById);

// ENVOYER
router.put("/envoyer/:id", envoyerFicheCorrective);

// VALIDER
router.post("/valider", validerFicheCorrective);



// NOTIFICATIONS
router.get("/notifications", async(req, res) => {
    try {
        const notifications = await Notification.find({ type: "fiche_corrective" }).sort({ date: -1 });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: "Erreur récupération notifications" });
    }
});

module.exports = router;