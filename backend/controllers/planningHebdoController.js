const PlanningHebdo = require('../models/PlanningHebdoModel');

// @desc    Récupérer le planning hebdo avec filtres
// @route   GET /api/planning-hebdo
const getPlanningHebdo = async (req, res) => {
    try {
        const { annee, semaine, jour } = req.query;
        let filter = {};

        if (annee) filter.annee = parseInt(annee);
        if (semaine) filter.semaine = parseInt(semaine);
        if (jour) filter.jour = jour;

        console.log('🔍 Filtre Planning Hebdo:', filter);

        const plannings = await PlanningHebdo.find(filter).sort({ jour: 1, unite: 1 });
        
        console.log(`✅ ${plannings.length} entrées trouvées`);

        res.status(200).json({
            success: true,
            count: plannings.length,
            data: plannings
        });
    } catch (error) {
        console.error('❌ Erreur:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Créer une entrée de planning hebdo
// @route   POST /api/planning-hebdo
const createPlanningHebdo = async (req, res) => {
    try {
        const planning = await PlanningHebdo.create(req.body);
        
        res.status(201).json({
            success: true,
            data: planning
        });
    } catch (error) {
        console.error('❌ Erreur création:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Supprimer une entrée de planning hebdo
// @route   DELETE /api/planning-hebdo/:id
const deletePlanningHebdo = async (req, res) => {
    try {
        const planning = await PlanningHebdo.findByIdAndDelete(req.params.id);
        
        if (!planning) {
            return res.status(404).json({
                success: false,
                error: 'Planning non trouvé'
            });
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        console.error('❌ Erreur suppression:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Supprimer tout le planning d'une année
// @route   DELETE /api/planning-hebdo/year/:annee
const deletePlanningByYear = async (req, res) => {
    try {
        const { annee } = req.params;
        
        const result = await PlanningHebdo.deleteMany({ annee: parseInt(annee) });
        
        res.status(200).json({
            success: true,
            message: `${result.deletedCount} entrées supprimées pour l'année ${annee}`,
            data: result
        });
    } catch (error) {
        console.error('❌ Erreur suppression année:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Récupérer le planning pour une semaine spécifique (organisé par jour)
// @route   GET /api/planning-hebdo/semaine/:annee/:semaine
const getPlanningByWeek = async (req, res) => {
    try {
        const { annee, semaine } = req.params;
        
        const plannings = await PlanningHebdo.find({ 
            annee: parseInt(annee), 
            semaine: parseInt(semaine) 
        });

        // Organiser par jour et vacation pour faciliter l'affichage
        const organised = {};
        const jours = ['LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI', 'DIMANCHE'];
        
        jours.forEach(jour => {
            organised[jour] = {
                production: { '1ERE': null, '2EME': null },
                balisage: { '1ERE': null, '2EME': null }
            };
        });

        plannings.forEach(item => {
            if (item.unite === 'Production' && organised[item.jour]) {
                if (item.vacation === '1ERE' || item.vacation === '2EME') {
                    organised[item.jour].production[item.vacation] = {
                        equipement: item.equipement,
                        statut: item.statut
                    };
                }
            } else if (item.unite === 'Balisage' && organised[item.jour]) {
                if (item.vacation === '1ERE' || item.vacation === '2EME') {
                    organised[item.jour].balisage[item.vacation] = {
                        equipement: item.equipement,
                        statut: item.statut
                    };
                }
            }
        });

        res.status(200).json({
            success: true,
            semaine: semaine,
            annee: annee,
            data: organised
        });
    } catch (error) {
        console.error('❌ Erreur:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    getPlanningHebdo,
    createPlanningHebdo,
    deletePlanningHebdo,
    deletePlanningByYear,
    getPlanningByWeek
};