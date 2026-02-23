const express = require("express");
const router = express.Router();
const inventaireController = require("../controllers/inventaireController");

router.get("/:type", inventaireController.getAllInventaires);
//router.post("/:type", inventaireController.createInventaire);
//router.delete("/:type/:id", inventaireController.deleteInventaire);

module.exports = router;