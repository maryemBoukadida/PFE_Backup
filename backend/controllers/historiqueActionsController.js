// backend/controllers/historiqueActionsController.js
const HistoriqueAction = require("../models/HistoriqueAction");

// Import tous les modèles de fiches
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
    fiche_2250kva: require('../models/Fiche2250KVA'),
    fiche_olapion: require('../models/FicheOlapion'),
};

// ---------------- Ajouter une action ----------------
exports.ajouterAction = async(req, res) => {
    try {
        const { type, message, dataId } = req.body;

        // Vérifier si action existe déjà pour ce type + dataId
        const exists = await HistoriqueAction.findOne({ type, dataId });
        if (exists) {
            return res.status(200).json({ message: "Action déjà enregistrée", action: exists });
        }

        // récupérer la fiche correspondante dynamiquement
        const Model = models[type];
        if (!Model) return res.status(400).json({ message: "Type de fiche inconnu" });

        const fiche = await Model.findById(dataId);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });

        // utiliser technicien_operateur si défini
        const user = fiche.technicien_operateur || "Admin";

        // Ne créer l'action que si la fiche est validée
        if (fiche.etat && fiche.etat !== "validé") {
            return res.status(400).json({ message: "Fiche pas encore validée" });
        }

        const action = new HistoriqueAction({
            type,
            message,
            dataId,
            user,
        });

        await action.save();
        res.status(201).json(action);
    } catch (err) {
        console.error("Erreur ajouterAction :", err);
        res.status(500).json({ message: err.message });
    }
};

// ---------------- Récupérer toutes les actions ----------------
exports.getActions = async(req, res) => {
    try {
        const actions = await HistoriqueAction.find().sort({ date: -1 });
        res.json(actions);
    } catch (err) {
        console.error("Erreur getActions :", err);
        res.status(500).json({ message: err.message });
    }
};