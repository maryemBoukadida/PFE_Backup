// backend/config/database.js
const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        await mongoose.connect("mongodb://localhost:27017/gmao_db"); // options retirées
        console.log("✅ MongoDB CONNECTÉ AVEC SUCCÈS");
    } catch (err) {
        console.error("❌ Erreur MongoDB :", err);
        process.exit(1);
    }
};

module.exports = connectDB;