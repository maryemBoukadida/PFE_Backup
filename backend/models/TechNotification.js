// models/TechNotification.js
const mongoose = require('mongoose');

const techNotificationSchema = new mongoose.Schema({
    dtiId: { type: mongoose.Schema.Types.ObjectId, ref: 'DTI' }, // référence à la DTI
    message: { type: String, required: true },
    technicien: { type: String, required: true }, // destinataire
    lu: { type: Boolean, default: false }, // si la notification a été lue
    createdAt: { type: Date, default: Date.now } // date de création
});

module.exports = mongoose.model('TechNotification', techNotificationSchema);