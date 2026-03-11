const express = require("express");
const router = express.Router();
const fichePosteController = require("../controllers/fichePosteController");

router.get("/", fichePosteController.getFichePoste);

router.get("/:id", fichePosteController.getFichePostesById); // <-- nouvelle route par ID

router.put("/:id", fichePosteController.enregistrerFichePostes);

// route pour envoyer la fiche poste
router.put("/envoyer/:id", fichePosteController.envoyerFichePostes);
module.exports = router;