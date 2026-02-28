const express = require("express");
const router = express.Router();
const controller = require("../controllers/inspectionController");

router.post("/", controller.createInspection);
router.get("/", controller.getInspections);

module.exports = router;