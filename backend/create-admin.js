const mongoose = require("mongoose"); const bcrypt = require("bcryptjs"); // Connexion à MongoDB 
mongoose.connect("mongodb://127.0.0.1:27017/gmao_db").then(() => console.log("✅ MongoDB connecté")).catch((err) => console.log("❌ Erreur connexion:", err));
// Schema Utilisateur
const userSchema = new mongoose.Schema({
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
}, { timestamps: true });
const User = mongoose.model("User", userSchema, "gestion_utilisateurs"); async function createAdmin() {
  try { // Vérifier si l'admin existe déjà 
    const existingAdmin = await User.findOne({ matricule: "saber" });
    if (existingAdmin) { console.log("❌ Cet utilisateur existe déjà"); mongoose.connection.close(); return; }
    // Hash le mot de passe 
    const hashedPassword = await bcrypt.hash("0000", 10);
    // Créer le nouvel admin 
    const newAdmin = new User({
      matricule: "saber", nom_complet: "Saber Ghali",
      password: hashedPassword,
      role: "admin", isActive: true,
    }); await newAdmin.save(); console.log("✅ Admin créé avec succès!");
    console.log("Matricule: saber"); console.log("Nom: Saber Ghali");
    console.log("Mot de passe: 0000"); console.log("Rôle: admin"); mongoose.connection.close();
  } catch (err) { console.error("❌ Erreur lors de la création:", err.message); mongoose.connection.close(); }
} createAdmin();