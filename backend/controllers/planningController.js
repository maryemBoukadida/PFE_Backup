const Planning = require('../models/PlanningModel');

// @desc    Récupérer toutes les tâches avec filtres
// @route   GET /api/planning
const getPlannings = async (req, res) => {
    try {
        const { annee, mois, semaine, statut, type, equipement, frequence } = req.query;
        let filter = {};

        if (annee) filter.annee = parseInt(annee);
        if (mois) filter.mois = mois;
        if (semaine) filter.semaine = semaine;
        if (statut) filter.statut = statut;
        if (type) filter.type = type;
        if (equipement) filter.equipement = { $regex: equipement, $options: 'i' };
        if (frequence) filter.frequence = frequence;

        const plannings = await Planning.find(filter).sort({ date_affichage: 1 });
        res.status(200).json({
            success: true,
            count: plannings.length,
            data: plannings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Récupérer une tâche par ID
// @route   GET /api/planning/:id
const getPlanningById = async (req, res) => {
    try {
        const planning = await Planning.findById(req.params.id);
        if (!planning) {
            return res.status(404).json({
                success: false,
                error: 'Tâche non trouvée'
            });
        }
        res.status(200).json({
            success: true,
            data: planning
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


// @desc    Créer une nouvelle tâche
// @route   POST /api/planning
const createPlanning = async (req, res) => {
    try {
        const planning = await Planning.create(req.body);
        res.status(201).json({
            success: true,
            data: planning
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Mettre à jour une tâche
// @route   PUT /api/planning/:id
const updatePlanning = async (req, res) => {
    try {
        const planning = await Planning.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!planning) {
            return res.status(404).json({
                success: false,
                error: 'Tâche non trouvée'
            });
        }
        res.status(200).json({
            success: true,
            data: planning
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Supprimer une tâche
// @route   DELETE /api/planning/:id
const deletePlanning = async (req, res) => {
    
    try {
        const planning = await Planning.findByIdAndDelete(req.params.id);
        if (!planning) {
            return res.status(404).json({
                success: false,
                error: 'Tâche non trouvée'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Tâche supprimée avec succès'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Dupliquer un planning pour une nouvelle année
// @route   POST /api/planning/duplicate
const duplicatePlanning = async (req, res) => {
    try {
        const { anneeSource, anneeCible } = req.body;
        
        const sourceTasks = await Planning.find({ annee: anneeSource });
        
        if (sourceTasks.length === 0) {
            return res.status(404).json({
                success: false,
                error: `Aucune tâche trouvée pour l'année ${anneeSource}`
            });
        }

        const newTasks = [];
        for (const task of sourceTasks) {
            const newTask = task.toObject();
            delete newTask._id;
            delete newTask.createdAt;
            delete newTask.updatedAt;
            
            newTask.annee = anneeCible;
            
            if (newTask.date_affichage) {
                const [day, month, year] = newTask.date_affichage.split('/');
                if (day && month && year) {
                    newTask.date_affichage = `${day}/${month}/${anneeCible}`;
                }
            }
            
            newTasks.push(newTask);
        }

        const createdTasks = await Planning.insertMany(newTasks);
        
        res.status(201).json({
            success: true,
            message: `Planning dupliqué de ${anneeSource} vers ${anneeCible}`,
            count: createdTasks.length,
            data: createdTasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Récupérer les statistiques
// @route   GET /api/planning/stats
const getStats = async (req, res) => {
    try {
        const { annee } = req.query;
        let matchStage = {};
        if (annee) matchStage.annee = parseInt(annee);

        const stats = await Planning.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    parStatut: {
                        $push: {
                            statut: "$statut",
                            count: 1
                        }
                    },
                    parType: {
                        $push: {
                            type: "$type",
                            count: 1
                        }
                    },
                    parFrequence: {
                        $push: {
                            frequence: "$frequence",
                            count: 1
                        }
                    },
                    parMois: {
                        $push: {
                            mois: "$mois",
                            count: 1
                        }
                    }
                }
            }
        ]);

        const formattedStats = {
            total: stats[0]?.total || 0,
            parStatut: {},
            parType: {},
            parFrequence: {},
            parMois: {}
        };

        if (stats[0]) {
            stats[0].parStatut.forEach(item => {
                formattedStats.parStatut[item.statut] = (formattedStats.parStatut[item.statut] || 0) + 1;
            });
            
            stats[0].parType.forEach(item => {
                formattedStats.parType[item.type] = (formattedStats.parType[item.type] || 0) + 1;
            });
            
            stats[0].parFrequence.forEach(item => {
                formattedStats.parFrequence[item.frequence] = (formattedStats.parFrequence[item.frequence] || 0) + 1;
            });
            
            stats[0].parMois.forEach(item => {
                formattedStats.parMois[item.mois] = (formattedStats.parMois[item.mois] || 0) + 1;
            });
        }

        res.status(200).json({
            success: true,
            data: formattedStats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// ✅ NOUVELLE FONCTION: Supprimer toutes les tâches d'une année
const deletePlanningByYear = async (req, res) => {
    try {
        const annee = parseInt(req.params.annee);
        
        const result = await Planning.deleteMany({ annee });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                error: `Aucune tâche trouvée pour l'année ${annee}`
            });
        }
        
        res.status(200).json({
            success: true,
            message: `${result.deletedCount} tâches supprimées pour l'année ${annee}`,
            count: result.deletedCount
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    getPlannings,
    getPlanningById,
    createPlanning,
    updatePlanning,
    deletePlanning,
    duplicatePlanning,
    getStats,
    deletePlanningByYear  // ✅ AJOUTÉ ICI
};