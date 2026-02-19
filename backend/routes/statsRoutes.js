const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");

// Routes statistiques
router.get("/lieu", statsController.getStatsByLieu);
router.get("/fournisseur", statsController.getStatsByFournisseur);

module.exports = router;