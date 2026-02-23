const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    matricule: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "technicien"], default: "technicien" }
});

module.exports = mongoose.model("User", userSchema);