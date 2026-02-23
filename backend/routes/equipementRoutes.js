const express = require("express");
const router = express.Router();
const controller = require("../controllers/equipementController");
const equipementController = require("../controllers/equipementController");
// 🔹 Route pour récupérer le fichier Excel
router.get("/file/:code", equipementController.getFileByCode);


// GET all
router.get("/", controller.getAll);

// POST create
router.post("/", equipementController.createEquipement);

// DELETE par code_patrimoine
// DELETE par ID Mongo
router.delete("/:id", controller.remove);

// PUT update par ID
router.put("/:id", controller.update);



module.exports = router;