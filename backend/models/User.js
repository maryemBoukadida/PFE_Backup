const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    matricule: { type: String, required: true, unique: true },
    nom_complet: { type: String, default: "" },
    telephone: { type: String, default: "" },
    department: { type: String, default: "" },
    email: { type: String, default: null },
    badge: { type: String, default: null },
    badge_validite: { type: String, default: null },
    password: { type: String, default: null },
    role: { type: String, default: "technicien" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema, "gestion_utilisateurs");