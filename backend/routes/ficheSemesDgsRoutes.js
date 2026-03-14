// routes/ficheSemesDgsRoutes.js
const express = require("express");
const router = express.Router();

const ficheSemesDgsController = require("../controllers/ficheSemesDgsController");

// 🔹 GET dernière fiche semestrielle DGS
router.get("/", ficheSemesDgsController.getFicheSemesDgs);

// 🔹 GET fiche DGS par ID
router.get("/:id", ficheSemesDgsController.getFicheSemesDgsById);

// 🔹 PUT : enregistrer / mettre à jour la fiche
router.put("/:id", ficheSemesDgsController.enregistrerFicheSemesDgs);

// 🔹 PUT : envoyer la fiche
router.put("/envoyer/:id", ficheSemesDgsController.envoyerFicheSemesDgs);

module.exports = router;