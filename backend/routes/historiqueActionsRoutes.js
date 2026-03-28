// backend/routes/historiqueActions.js
const express = require("express");
const router = express.Router();
const HistoriqueAction = require("../models/HistoriqueAction");

// Importer tous les modèles
const models = {
    fiche_effar: require('../models/ficheEffar'),
    fiche_hors_sql: require('../models/FicheHorsSql'),
    fiche_ann_infrastructure: require('../models/ficheAnnInfrastructure'),
    fiche_ann_tgbt: require('../models/ficheAnnTgbt'),
    fiche_ann_voie: require('../models/ficheAnnVoie'),
    fiche_piste: require('../models/FichePiste'),
    fiche_dgs: require('../models/FicheDGS'),
    fiche_lvp: require('../models/FicheLVP'),
    fiche_feux_obstacles: require('../models/FicheFeuxObstacles'),
    fiche_regulateures: require('../models/FicheRegulateures'),
    fiche_postes: require('../models/FichePoste'),
    fiche_aides_radios: require('../models/FicheAidesRadios'),
    fiche_feux_encastres: require('../models/ficheFeuxEncastres'),
    fiche_semes_regulateures: require('../models/ficheSemesRegulateures'),
    fiche_semes_postes: require('../models/ficheSemesPostes'),
    fiche_semes_dgs: require('../models/ficheSemesDgs'),
    fiche_brigade: require('../models/Brigade'),
    fiche_balisage: require('../models/FicheBalisage'),
    fiche_corrective: require('../models/ficheCorrective'),
    fiche_nobreak: require('../models/FicheNoBreak'),
    fiche_papi_avant: require('../models/ficheAnnPaMa'),
    fiche_ann_obs: require('../models/ficheAnnObs'),
};

// GET toutes les actions
router.get("/", async(req, res) => {
    try {
        const actions = await HistoriqueAction.find().sort({ date: -1 });
        res.json(actions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// GET fiche par type et dataId
router.get("/fiche/:type/:dataId", async(req, res) => {
    const { type, dataId } = req.params;
    try {
        const Model = models[type];
        if (!Model) return res.status(400).json({ message: "Type de fiche inconnu" });
        const fiche = await Model.findById(dataId);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });
        res.json(fiche);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// POST ajouter action
router.post("/", async(req, res) => {
    try {
        const newAction = new HistoriqueAction(req.body);
        const savedAction = await newAction.save();
        res.status(201).json(savedAction);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;