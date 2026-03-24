// routes/ficheSemesDgsRoutes.js
const express = require("express");
const router = express.Router();

const ficheSemesDgsController = require("../controllers/ficheSemesDgsController");

// =======================
// CREATE
// =======================
router.post("/", ficheSemesDgsController.creerFicheSemesDgs);

// =======================
// GET ALL
// =======================
router.get("/", ficheSemesDgsController.getFichesSemesDgs);

// =======================
// GET DERNIÈRE FICHE
// =======================
router.get("/last", ficheSemesDgsController.getFicheSemesDgs);

// =======================
// GET PAR ID
// =======================
router.get("/:id", ficheSemesDgsController.getFicheSemesDgsById);

// =======================
// UPDATE / ENREGISTRER
// =======================
router.put("/:id", ficheSemesDgsController.enregistrerFicheSemesDgs);

// =======================
// ENVOYER
// ⚠️ à mettre AVANT /:id sinon bug
// =======================
router.put("/envoyer/:id", ficheSemesDgsController.envoyerFicheSemesDgs);

// =======================
// VALIDER
// =======================
router.put("/valider", ficheSemesDgsController.validerFicheSemesDgs);

module.exports = router;