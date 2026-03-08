const FichePapi = require("../models/fichePapiModel");
const HistoriquePapi = require("../models/HistoriquePapi");

// 🔹 Valider une fiche PAPI et la déplacer dans l'historique
exports.validerFiche = async(req, res) => {
    const { ficheId } = req.params;

    try {
        // 1️⃣ Récupérer la fiche
        const fiche = await FichePapi.findById(ficheId);
        if (!fiche) {
            console.log("❌ Fiche non trouvée :", ficheId);
            return res.status(404).json({ message: "Fiche non trouvée" });
        }
        console.log("📄 Fiche trouvée :", ficheId);

        // 2️⃣ Créer une entrée dans l'historique
        const hist = new HistoriquePapi({
            verifications: fiche.verifications,
            observations: fiche.observations,
            date: fiche.date,
            techniciens: fiche.techniciens
        });

        await historiqueEntry.save();
        console.log("✅ Fiche ajoutée à l'historique :", historiqueEntry._id);

        // 3️⃣ Supprimer la fiche originale ou changer son status
        await FichePapi.findByIdAndDelete(ficheId);
        console.log("🗑️ Fiche originale supprimée :", ficheId);

        res.json({ message: "Fiche validée et déplacée dans l'historique !" });

    } catch (err) {
        console.error("❌ Erreur lors de la validation :", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// 🔹 Récupérer toutes les fiches historiques
exports.getHistoriques = async(req, res) => {
    try {
        const historiques = await HistoriquePapi.find().sort({ date: -1 });
        console.log("📜 Historique récupéré :", historiques.length);
        res.json(historiques);
    } catch (err) {
        console.error("❌ Erreur récupération historique :", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
};