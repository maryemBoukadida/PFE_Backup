const FicheHorsSql = require("../models/FicheHorsSql");
const Notification = require("../models/Notification");
const HistoriqueAction = require("../models/HistoriqueAction");


// ================= CREER UNE FICHE =================
exports.creerFicheHorsSql = async(req, res) => {
    try {

        const fiche = new FicheHorsSql(req.body);

        const nouvelleFiche = await fiche.save();

        res.status(201).json(nouvelleFiche);

    } catch (error) {

        res.status(500).json({
            message: "Erreur lors de la création de la fiche Hors SQL",
            error: error.message
        });

    }
};


// ================= RECUPERER TOUTES LES FICHES =================
exports.getFichesHorsSql = async(req, res) => {

    try {

        const fiches = await FicheHorsSql.find().sort({ date: -1 });

        res.json(fiches);

    } catch (error) {

        res.status(500).json({
            message: "Erreur récupération fiches Hors SQL",
            error: error.message
        });

    }

};


// ================= RECUPERER FICHE PAR ID =================
exports.getFicheHorsSqlById = async(req, res) => {

    try {

        const fiche = await FicheHorsSql.findById(req.params.id);

        if (!fiche) {
            return res.status(404).json({
                message: "Fiche Hors SQL non trouvée"
            });
        }

        res.json(fiche);

    } catch (err) {

        res.status(500).json({ message: err.message });

    }

};


// ================= ENVOYER FICHE =================
exports.envoyerFicheHorsSql = async(req, res) => {

    try {

        const fiche = await FicheHorsSql.findById(req.params.id);

        if (!fiche) {
            return res.status(404).json({
                message: "Fiche Hors SQL non trouvée"
            });
        }

        if (!fiche.techniciens_operateurs || fiche.techniciens_operateurs.length === 0) {
            return res.status(400).json({
                message: "Le champ technicien est vide"
            });
        }

        fiche.statut = "envoyee";

        await fiche.save();

        const notification = new Notification({

            type: "fiche_hors_sql",

            message: `Le technicien ${fiche.techniciens_operateurs.join(", ")} a envoyé une fiche Hors SQL`,

            dataId: fiche._id,

            read: false

        });

        await notification.save();

        res.json({
            message: "Fiche Hors SQL envoyée avec succès"
        });

    } catch (err) {

        console.error("Erreur envoyerFicheHorsSql :", err);

        res.status(500).json({ message: err.message });

    }

};


// ================= VALIDER FICHE =================
exports.validerFicheHorsSql = async(req, res) => {

    try {

        const { ficheId, notifId } = req.body;

        if (!ficheId) {
            return res.status(400).json({
                message: "ID de la fiche requis"
            });
        }

        const fiche = await FicheHorsSql.findById(ficheId);

        if (!fiche) {
            return res.status(404).json({
                message: "Fiche Hors SQL non trouvée"
            });
        }

        fiche.statut = "validée";

        await fiche.save();

        const historique = new HistoriqueAction({

            type: "fiche_hors_sql",

            message: "Fiche Hors SQL validée",

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

    } catch (err) {

        console.error("Erreur validerFicheHorsSql :", err);

        res.status(500).json({ message: err.message });

    }

};