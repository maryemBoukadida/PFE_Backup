const mongoose = require("mongoose");

const EquipementSchema = new mongoose.Schema({
    designation_equipement: String,
    lieu_installation: String,
    code_patrimoine: { type: String, unique: true },
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
    excel_file: String,
    pdf_file: String
}, { timestamps: true });

module.exports = mongoose.model("Equipement", EquipementSchema);