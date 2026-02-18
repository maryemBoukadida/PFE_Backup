const express = require("express");
const router = express.Router();
const controller = require("../controllers/equipementController");

// GET all
router.get("/", controller.getAll);

// POST create
router.post("/", controller.create);

// DELETE par code_patrimoine
// DELETE par ID Mongo
router.delete("/:id", controller.remove);

// PUT update par ID
router.put("/:id", controller.update);

module.exports = router;