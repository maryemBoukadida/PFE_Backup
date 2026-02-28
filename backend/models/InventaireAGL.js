const mongoose = require("mongoose");

const inventaireAGLSchema = new mongoose.Schema({
    code: { type: String, required: true },
    quantite: { type: Number, required: true },
    designations: [{ type: String }],
}, { collection: "inventaireAGL" });

//module.exports = mongoose.model("InventaireAGL", inventaireAGLSchema);*/
module.exports = mongoose.models.InventaireAGL || mongoose.model("InventaireAGL", inventaireAGLSchema);