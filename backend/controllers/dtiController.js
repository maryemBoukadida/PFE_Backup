const DTI = require('../models/DTI');
const TechNotification = require('../models/TechNotification'); // <-- modèle renommé

// 🔹 Créer DTI et notifications pour techniciens
exports.createDTI = async(req, res) => {
    try {
        const dtiData = {
            ...req.body,
            techniciens: Array.isArray(req.body.techniciens) ?
                req.body.techniciens : [req.body.techniciens],
        };

        // gérer l'image si upload avec multer
        if (req.file) dtiData.image = req.file.filename;

        const dti = new DTI(dtiData);
        await dti.save();

        // Créer une notification pour chaque technicien
        const notifications = dti.techniciens.map(t => ({
            dtiId: dti._id,
            message: `Nouvelle DTI ${dti.statut}`,
            technicien: t
        }));

        // ⚡ Utiliser le modèle TechNotification
        await TechNotification.insertMany(notifications);

        res.json({ message: "DTI créée ✅", dti });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
// 🔹 Récupérer toutes les DTI
exports.getAllDTI = async(req, res) => {
    try {
        const data = await DTI.find().sort({ createdAt: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 🔹 Optionnel: récupérer par statut
exports.getDTIByStatut = async(req, res) => {
    try {
        const { statut } = req.params;
        const data = await DTI.find({ statut }).sort({ createdAt: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Mettre à jour le statut DTI
exports.updateStatus = async(req, res) => {
    try {
        const { statut } = req.body; // en_cours ou terminee
        const dti = await DTI.findByIdAndUpdate(req.params.id, { statut }, { new: true });
        res.json(dti);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};