const express = require("express");
const router = express.Router();
const {
    getDesignationsByType,
    addOrUpdateEquipement
} = require("../controllers/stockController");

const upload = require("../middlewares/upload");

router.get("/designations/:type", getDesignationsByType);

router.post(
    "/equipement", addOrUpdateEquipement);

module.exports = router;