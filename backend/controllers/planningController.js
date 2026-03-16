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

// Fonctions utilitaires pour la gestion des dates
function ajouterJours(dateStr, jours) {
    const [jour, mois, annee] = dateStr.split('/').map(Number);
    const date = new Date(annee, mois - 1, jour);
    date.setDate(date.getDate() + jours);
    const newJour = date.getDate().toString().padStart(2, '0');
    const newMois = (date.getMonth() + 1).toString().padStart(2, '0');
    const newAnnee = date.getFullYear();
    return `${newJour}/${newMois}/${newAnnee}`;
}

function getJourSemaine(dateStr) {
    const [jour, mois, annee] = dateStr.split('/').map(Number);
    return new Date(annee, mois - 1, jour).getDay();
}

// @desc    Dupliquer un planning pour une nouvelle année
// @route   POST /api/planning/duplicate
const duplicatePlanning = async (req, res) => {
    try {
        console.log('📥 req.body reçu :', req.body);
        let { anneeSource, anneeCible } = req.body;

        anneeSource = parseInt(anneeSource);
        anneeCible = parseInt(anneeCible);

        console.log('📅 anneeSource:', anneeSource, 'anneeCible:', anneeCible);

        const sourceTasks = await Planning.find({ annee: anneeSource });
        console.log(`📊 ${sourceTasks.length} tâches trouvées`);

        if (sourceTasks.length === 0) {
            return res.status(404).json({
                success: false,
                error: `Aucune tâche trouvée pour l'année ${anneeSource}`
            });
        }

        // Calcul du décalage calendaire entre les deux années
        const dateRefSource = new Date(anneeSource, 0, 1); // 1er janvier année source
        const dateRefCible = new Date(anneeCible, 0, 1);   // 1er janvier année cible
        const diffJours = Math.round((dateRefCible - dateRefSource) / (1000 * 60 * 60 * 24));
        console.log(`📅 Décalage calendaire : ${diffJours} jours`);

        const moisList = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];

        const newTasks = [];

        for (const task of sourceTasks) {
            const newTask = task.toObject();
            delete newTask._id;
            delete newTask.createdAt;
            delete newTask.updatedAt;

            newTask.annee = anneeCible;

            if (newTask.date_affichage) {
                try {
                    const [jour, mois, annee] = newTask.date_affichage.split('/').map(Number);
                    if (!jour || !mois || !annee) {
                        console.warn(`⚠️ Format de date invalide : ${newTask.date_affichage}`);
                        continue;
                    }

                    // Créer la date source
                    const dateSource = new Date(annee, mois - 1, jour);
                    // Ajouter le décalage
                    const dateCible = new Date(dateSource);
                    dateCible.setDate(dateSource.getDate() + diffJours);

                    // Vérifier si c'est un dimanche (0 = dimanche)
                    if (dateCible.getDay() === 0) {
                        console.log(`⚠️ La date ${newTask.date_affichage} tombe un dimanche en ${anneeCible}, décalage au lundi`);
                        dateCible.setDate(dateCible.getDate() + 1);
                    }

                    // Formater la nouvelle date
                    const newJour = dateCible.getDate().toString().padStart(2, '0');
                    const newMois = (dateCible.getMonth() + 1).toString().padStart(2, '0');
                    const newAnnee = dateCible.getFullYear();
                    newTask.date_affichage = `${newJour}/${newMois}/${newAnnee}`;

                    // Mettre à jour le mois
                    newTask.mois = moisList[dateCible.getMonth()];

                    // Recalculer le numéro de semaine
                    const firstDayOfMonth = new Date(newAnnee, dateCible.getMonth(), 1);
                    const dayOfWeek = firstDayOfMonth.getDay();
                    const adjustedFirstDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Lundi = 0
                    const semaineNum = Math.floor((dateCible.getDate() + adjustedFirstDay - 1) / 7) + 1;
                    newTask.semaine = `SEMAINE ${semaineNum}`;

                } catch (err) {
                    console.error(`❌ Erreur traitement date ${newTask.date_affichage}:`, err);
                    continue;
                }
            }

            // Vérifier les champs requis
            const requiredFields = ['mois', 'semaine', 'equipement', 'tache', 'type', 'code_tache', 'statut', 'priorite', 'frequence', 'annee'];
            const missing = requiredFields.filter(f => !newTask[f]);
            if (missing.length > 0) {
                console.warn('⚠️ Tâche ignorée - champs manquants:', missing);
                continue;
            }

            newTasks.push(newTask);
        }

        if (newTasks.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Aucune tâche valide à dupliquer'
            });
        }

        console.log(`🚀 Insertion de ${newTasks.length} tâches pour ${anneeCible}...`);
        const createdTasks = await Planning.insertMany(newTasks);
        console.log(`✅ ${createdTasks.length} tâches créées avec succès`);

        res.status(201).json({
            success: true,
            message: `Planning dupliqué de ${anneeSource} vers ${anneeCible}`,
            count: createdTasks.length,
            data: createdTasks
        });

    } catch (error) {
        console.error('❌ Erreur duplicatePlanning :', error);
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
                    parStatut: { $push: { statut: "$statut", count: 1 } },
                    parType: { $push: { type: "$type", count: 1 } },
                    parFrequence: { $push: { frequence: "$frequence", count: 1 } },
                    parMois: { $push: { mois: "$mois", count: 1 } }
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

// @desc    Supprimer toutes les tâches d'une année
// @route   DELETE /api/planning/year/:annee
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
    deletePlanningByYear
};