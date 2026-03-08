const express = require("express");
const router = express.Router();
const { validerFiche, getHistoriques } = require("../controllers/historiquePapiController");

// 🔹 Valider une fiche (admin)
router.post("/valider/:ficheId", validerFiche);

// 🔹 Obtenir toutes les fiches historiques
router.get("/historiques", getHistoriques);

module.exports = router;