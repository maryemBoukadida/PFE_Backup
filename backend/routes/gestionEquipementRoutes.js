const express = require("express");
const router = express.Router();

const {
    getBalisage,
    getPG,
    getAutre
} = require("../controllers/GestionEquipementController");

// ✅ route balisage
router.get("/balisage", getBalisage);

// ✅ route PG
router.get("/pg", getPG);
router.get("/autre", getAutre); // ✅ ajout

module.exports = router;