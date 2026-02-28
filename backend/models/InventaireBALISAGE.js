/*const mongoose = require("mongoose");

const inventaireBALISAGESchema = new mongoose.Schema({
    code: { type: String, required: true },
    designation: { type: String },
    quantite: { type: Number, required: true },
}, { collection: "inventaireBALISAGE" });

// ❌ Cela déclenche OverwriteModelError si déjà défini
module.exports = mongoose.model("InventaireBALISAGE", inventaireBALISAGESchema);
*/
const mongoose = require("mongoose");

const inventaireBALISAGESchema = new mongoose.Schema({
    code: { type: String, required: true },
    designation: { type: String },
    quantite: { type: Number, required: true },
}, { collection: "inventaireBALISAGE" });

// ✅ Vérifie si le modèle existe déjà avant de le créer
module.exports = mongoose.models.InventaireBALISAGE || mongoose.model("InventaireBALISAGE", inventaireBALISAGESchema);