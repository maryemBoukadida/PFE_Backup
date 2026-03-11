const express = require("express");
const router = express.Router();

const ficheRegulateuresController = require("../controllers/ficheRegulateuresController");

router.get("/", ficheRegulateuresController.getFicheRegulateures);

router.put("/:id", ficheRegulateuresController.enregistrerFicheRegulateures);


// route pour envoyer la fiche
router.put("/envoyer/:id", ficheRegulateuresController.envoyerFicheRegulateures);

router.get("/:id", ficheRegulateuresController.getFicheRegulateuresById);



module.exports = router;