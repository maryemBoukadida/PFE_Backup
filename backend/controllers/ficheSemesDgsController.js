const FicheSemesDgs = require("../models/ficheSemesDgs");
const Notification = require("../models/Notification");
const HistoriqueAction = require("../models/HistoriqueAction");

// =======================
// CRÉER UNE FICHE
// =======================
exports.creerFicheSemesDgs = async(req, res) => {
    try {
        const fiche = new FicheSemesDgs(req.body);
        const nouvelleFiche = await fiche.save();
        res.status(201).json(nouvelleFiche);
    } catch (error) {
        res.status(500).json({
            message: "Erreur création fiche semestrielle DGS",
            error: error.message
        });
    }
};


// =======================
// GET TOUTES LES FICHES
// =======================
exports.getFichesSemesDgs = async(req, res) => {
    try {
        const fiches = await FicheSemesDgs.find().sort({ date: -1 });
        res.json(fiches);
    } catch (error) {
        res.status(500).json({
            message: "Erreur récupération fiches DGS",
            error: error.message
        });
    }
};

// =======================
// GET DERNIÈRE FICHE
// =======================
exports.getFicheSemesDgs = async(req, res) => {
    try {
        const fiche = await FicheSemesDgs.findOne().sort({ date: -1 });

        if (!fiche) {
            return res.status(404).json({
                message: "Aucune fiche trouvée"
            });
        }

        res.json(fiche);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// =======================
// GET PAR ID
// =======================
exports.getFicheSemesDgsById = async(req, res) => {
    try {
        const fiche = await FicheSemesDgs.findById(req.params.id);

        if (!fiche) {
            return res.status(404).json({
                message: "Fiche semestrielle DGS non trouvée"
            });
        }

        res.json(fiche);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// =======================
// ENREGISTRER / METTRE À JOUR
// =======================
exports.enregistrerFicheSemesDgs = async(req, res) => {
    try {
        const { id } = req.params;

        const updatedData = {
            designation: req.body.designation,
            lieu_installation: req.body.lieu_installation,
            technicien: req.body.technicien,
            signature: req.body.signature,
            date: req.body.date,
            blocs: req.body.blocs,
            observations: req.body.observations
        };

        const fiche = await FicheSemesDgs.findByIdAndUpdate(
            id,
            updatedData, { new: true }
        );

        if (!fiche) {
            return res.status(404).json({
                message: "Fiche DGS non trouvée"
            });
        }

        res.json(fiche);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// =======================
// ENVOYER LA FICHE
// =======================
exports.envoyerFicheSemesDgs = async(req, res) => {
    try {
        const fiche = await FicheSemesDgs.findById(req.params.id);

        if (!fiche) {
            return res.status(404).json({ message: "Fiche non trouvée" });
        }

        // ✅ BON CHAMP
        if (!fiche.technicien || fiche.technicien.trim() === "") {
            return res.status(400).json({
                message: "Le champ technicien est vide"
            });
        }

        fiche.statut = "envoyee";
        await fiche.save();

        const notification = new Notification({
            type: "fiche_semes_dgs",
            message: `Le technicien ${fiche.technicien} a envoyé une fiche semestrielle DGS`,
            dataId: fiche._id,
            read: false
        });

        await notification.save();

        res.json({ message: "Fiche DGS envoyée avec succès" });

    } catch (error) {
        res.status(500).json({
            message: "Erreur envoi fiche DGS",
            error: error.message
        });
    }
};

// =======================
// VALIDER FICHE
// =======================
exports.validerFicheSemesDgs = async(req, res) => {
    try {
        const { ficheId, notifId } = req.body;

        if (!ficheId) {
            return res.status(400).json({ message: "ID de la fiche requis" });
        }

        const fiche = await FicheSemesDgs.findById(ficheId);

        if (!fiche) {
            return res.status(404).json({ message: "Fiche non trouvée" });
        }

        fiche.statut = "validée";
        await fiche.save();

        const historique = new HistoriqueAction({
            type: "fiche_semes_dgs",
            message: "Fiche semestrielle DGS validée",
            dataId: fiche._id,
            date: new Date()
        });

        await historique.save();

        if (notifId) {
            await Notification.findByIdAndUpdate(notifId, { read: true });
        }

        res.json({
            message: "Fiche validée et ajoutée à l'historique ✅",
            fiche
        });

    } catch (error) {
        res.status(500).json({
            message: "Erreur validation fiche DGS",
            error: error.message
        });
    }
};