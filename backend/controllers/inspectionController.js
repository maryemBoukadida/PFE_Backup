// inspectioncontroller : valide admin + envoie de la fiche à l'historique 
const Inspection = require("../models/Inspection");
const InspecTech = require("../models/Inspec_tech");
const Historique = require("../models/Historique");

// 🔹 CREATE
exports.createInspection = async(req, res) => {
    try {
        const inspection = new Inspection(req.body);
        await inspection.save();
        res.status(201).json(inspection);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 🔹 GET ALL
exports.getInspections = async(req, res) => {
    try {
        const data = await Inspection.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// valideer fiche
exports.validerInspection = async(req, res) => {
    const { inspectionId } = req.body;

    try {
        const fiche = await InspecTech.findById(inspectionId);

        if (!fiche) {
            return res.status(404).json({ message: "Fiche non trouvée" });
        }

        await Historique.create({
            matricule: fiche.matricule,
            date: fiche.date,
            periode: fiche.periode,
            inspections: fiche.inspections,
        });

        fiche.validated = true;
        await fiche.save();

        res.json({ message: "Fiche validée avec succès" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// ✅ GET HISTORIQUE
exports.getHistoriques = async(req, res) => {
    try {
        const historiques = await Historique.find().sort({ date: -1 });
        res.json(historiques);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};