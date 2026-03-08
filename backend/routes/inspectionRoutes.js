// get historique des fiches de balisages + validation (admin)

const express = require("express");
const router = express.Router();
const controller = require("../controllers/inspectionController");

router.post("/", controller.createInspection);
router.get("/", controller.getInspections);

// ✅ AJOUTER ÇA
router.post("/valider", controller.validerInspection);
router.get("/historiques", controller.getHistoriques);

module.exports = router;