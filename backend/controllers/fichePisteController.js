const FichePiste = require("../models/FichePiste");
const Notification = require("../models/Notification");

// récupérer la fiche
exports.getFichePiste = async(req, res) => {
    try {
        const fiche = await FichePiste.findOne();
        res.json(fiche);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// modifier la fiche
exports.updateFichePiste = async(req, res) => {

    try {

        const fiche = await FichePiste.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }
        );
        res.json({
            message: "Fiche enregistrée",
            fiche
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


/* envoyer fiche(technicien)*/
exports.envoyerFiche = async(req, res) => {
    try {
        const fiche = await FichePiste.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });

        // changer statut
        fiche.statut = "envoyee";
        await fiche.save();

        // créer notification admin dans la collection Notification.js
        const notification = new Notification({
            type: "fichePiste", // indique que c'est une fiche piste
            message: `Le technicien ${fiche.techniciensOperateurs[0]} a envoyé une fiche PISTE`,
            dataId: fiche._id, // id lié à la fiche
            read: false
        });

        await notification.save();

        res.json({ message: "Fiche envoyée et notification créée !" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// récupérer fiche Piste par id
exports.getFichePisteById = async(req, res) => {
    try {
        const fiche = await FichePiste.findById(req.params.id);
        if (!fiche) return res.status(404).json({ message: "Fiche non trouvée" });
        res.json(fiche);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};