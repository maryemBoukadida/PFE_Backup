const mongoose = require('mongoose');

const EtatSchema = new mongoose.Schema({
    etat: { type: String, default: "" },
    intervention: { type: String, default: "" },
    observations: { type: String, default: "" }
}, { _id: false }); // _id: false pour ne pas créer d'ID pour chaque sous-doc

// Liste de tous les emplacements
const emplacements = [
    "Fin de la Piste 27",
    "Fin de la Piste 09",
    "Seuil de la Piste 27",
    "Seuil de la Piste 09",
    "Zone de touchée des roues",
    "Axe de la Piste",
    "Retil",
    "CL EAST TAXI WAY",
    "CL WEST TAXI WAY"
];

// Génération dynamique du schema pour tous les emplacements
const feuxEncastresSchemaDefinition = {};
emplacements.forEach(emp => {
    feuxEncastresSchemaDefinition[emp] = {
        "Etat général": EtatSchema,
        "Etanchéité de balise": EtatSchema,
        "Etat général des saignées": EtatSchema,
        "Scellement et calage": EtatSchema,
        "Propreté intérieure de l'embase": EtatSchema,
        "Connectique, étanchéité, propreté": EtatSchema,
        "Nettoyage des feux": EtatSchema,
        "Examen visuel d’état des prismes et d’intégrité": EtatSchema,
        "Etat de surface": EtatSchema,
        "Etat de fixation : présence des écrous et serrage": EtatSchema
    };
});

const FicheFeuxEncastresSchema = new mongoose.Schema({
    feuxEncastres: feuxEncastresSchemaDefinition,
    observationsGenerales: { type: String, default: "" },
    date: { type: String, default: "" }, // peut être Date si vous préférez
    technicienOperateurs: { type: String, default: "" },
    signature: { type: String, default: "" }
}, { collection: 'ficheFeuxEncastres' }); // force le nom de la collection

// Création du modèle
const FicheFeuxEncastres = mongoose.model('FicheFeuxEncastres', FicheFeuxEncastresSchema);

module.exports = FicheFeuxEncastres;