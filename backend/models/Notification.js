const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    type: { type: String, required: true }, // ex: "inspection"
    message: { type: String, required: true },
    dataId: { type: mongoose.Schema.Types.ObjectId }, // id lié à l’inspection
    read: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
});

// ⚠️ Vérifie si le modèle existe déjà
module.exports =
    mongoose.models.Notification ||
    mongoose.model("Notification", notificationSchema);