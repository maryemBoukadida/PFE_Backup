const mongoose = require("mongoose");

const EtatSchema = new mongoose.Schema({
    Normal: { type: Boolean, default: false },
    Anomalie: { type: Boolean, default: false },
    Observations: { type: String, default: "" }
}, { _id: false });

const FicheSemesDgsSchema = new mongoose.Schema({

    "Désignation": { type: String, default: "" },

    "Lieu d’installation": { type: String, default: "" },

    "Contrôle": {

        "Propreté": {
            "La fenêtre frontale de l’afficheur": EtatSchema,
            "Boîtier de commande opérateur": EtatSchema
        },

        "Porte du bloc laser": {
            "Examiner le joint de porte du bloc laser": EtatSchema
        },

        "Miroirs du bloc laser": {
            "L’étalonnage du télémètre à laser": EtatSchema,
            "Vérifier les miroirs de balayage": EtatSchema,
            "Nettoyer les miroir du laser": EtatSchema,
            "Nettoyer les lentilles du laser": EtatSchema
        },

        "Boutons d’arrêt d’urgence": {
            "Le fonctionnement d’arrêt d’urgence": EtatSchema
        },

        "Capteur de température": {
            "Capteur de température": EtatSchema
        },

        "Afficheur et bloc laser": EtatSchema,

        "Vérifier les ventilateurs": EtatSchema
    },

    "Observations générales": { type: String, default: "" },

    "Technicien Operateures": { type: String, default: "" },

    "Signature": { type: String, default: "" },

    "Date": { type: String, default: "" }

});

module.exports = mongoose.model(
    "FicheSemesDgs",
    FicheSemesDgsSchema,
    "ficheSemesDgs" // 🔴 force le nom exact de la collection
);