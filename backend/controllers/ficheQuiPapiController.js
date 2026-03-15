const FicheQuiPapi = require("../models/ficheQuiPapi");
const Notification = require("../models/Notification");
const HistoriqueAction = require("../models/HistoriqueAction");

// ================= CREER UNE FICHE =================
exports.creerFicheQuiPapi = async(req, res) => {
    try {
        const fiche = new FicheQuiPapi(req.body);
        const nouvelleFiche = await fiche.save();
        res.status(201).json(nouvelleFiche);
    } catch (err) {
        res.status(500).json({ message: "Erreur création fiche PAPI", error: err.message });
    }
};

// ================= RECUPERER TOUTES LES FICHES =================
exports.getFichesQuiPapi = async(req, res) => {
    try {
        const fiches = await FicheQuiPapi.find().sort({ date: -1 });
        res.json(fiches);
    } catch (err) {
        res.status(500).json({ message: "Erreur récupération fiches PAPI", error: err.message });
    }
};

// ================= RECUPERER FICHE PAR ID =================
exports.getFicheQuiPapiById = async(req, res) => {
    try {
        const fiche = await FicheQuiPapi.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: "Fiche PAPI non trouvée" });
        res.json(fiche);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= ENVOYER FICHE =================
exports.envoyerFicheQuiPapi = async(req, res) => {
    try {
        const fiche = await FicheQuiPapi.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: "Fiche PAPI non trouvée" });
        if (!fiche.techniciens_operateurs || fiche.techniciens_operateurs.length === 0)
            return res.status(400).json({ message: "Le champ technicien est vide" });

        fiche.statut = "envoyee";
        await fiche.save();

        const notification = new Notification({
            type: "fiche_quinquennale_papi",
            message: `Le technicien ${fiche.techniciens_operateurs} a envoyé une fiche quinquennale PAPI`,
            dataId: fiche._id,
            read: false
        });
        await notification.save();

        res.json({ message: "Fiche PAPI envoyée avec succès" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ================= VALIDER FICHE =================
exports.validerFicheQuiPapi = async(req, res) => {
    try {
        const { ficheId, notifId } = req.body;
        if (!ficheId) return res.status(400).json({ message: "ID de la fiche requis" });

        const fiche = await FicheQuiPapi.findById(ficheId);
        if (!fiche) return res.status(404).json({ message: "Fiche PAPI non trouvée" });

        fiche.statut = "validée";
        await fiche.save();

        const historique = new HistoriqueAction({
            type: "fiche_quinquennale_papi",
            message: "Fiche quinquennale PAPI validée",
            dataId: fiche._id,
            date: new Date()
        });
        await historique.save();

        if (notifId) await Notification.findByIdAndUpdate(notifId, { read: true });

        res.json({ message: "Fiche validée et ajoutée à l'historique ✅", fiche });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};