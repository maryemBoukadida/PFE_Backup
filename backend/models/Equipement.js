const mongoose = require("mongoose");

const EquipementSchema = new mongoose.Schema({
    designation_equipement: String,
    lieu_installation: String,
    code_patrimoine: String,
    adresse_ip: String,
    fournisseur: String,
    installateur: String,
    plaque: String,
    contact: String,
    tel_direct: String,
    gsm: String,
    tel_office: String,
    fax: String,
    feuille: String,

    // fichier Excel (on stocke juste le nom ou le chemin)
    excel_file: { type: String }
});

module.exports = mongoose.model("Equipement", EquipementSchema);