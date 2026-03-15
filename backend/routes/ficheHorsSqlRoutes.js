const express = require("express");
const router = express.Router();

const {
    creerFicheHorsSql,
    getFichesHorsSql,
    envoyerFicheHorsSql,
    getFicheHorsSqlById,
    validerFicheHorsSql
} = require("../controllers/ficheHorsSqlController");

const Notification = require("../models/Notification");


// ================= ENREGISTRER FICHE =================
router.post("/", creerFicheHorsSql);


// ================= RECUPERER TOUTES LES FICHES =================
router.get("/", getFichesHorsSql);


// ================= RECUPERER FICHE PAR ID =================
router.get("/:id", getFicheHorsSqlById);


// ================= VALIDER FICHE =================
router.post("/valider", validerFicheHorsSql);


// ================= ENVOYER FICHE =================
router.put("/envoyer/:id", envoyerFicheHorsSql);


// ================= NOTIFICATIONS =================
router.get("/notifications", async(req, res) => {

    try {

        const notifications = await Notification.find({
            type: "fiche_hors_sql"
        }).sort({ date: -1 });

        res.json(notifications);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Erreur récupération notifications"
        });

    }

});


module.exports = router;