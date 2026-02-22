const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    let {
      matricule,
      password,
      role,
      nom_complet,
      telephone,
      department,
      email,
      badge,
      badge_validite,
    } = req.body;

    if (matricule) matricule = matricule.toString();

    if (!matricule || !password)
      return res.status(400).json({ message: "Matricule et mot de passe requis" });

    const existingUser = await User.findOne({ matricule });
    if (existingUser)
      return res.status(400).json({ message: "Matricule déjà utilisé" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      matricule,
      password: hashedPassword,
      role: role || "technicien",
      nom_complet,
      telephone,
      department,
      email,
      badge,
      badge_validite,
    });

    await newUser.save();
    res.json({ message: "Utilisateur créé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    let { matricule, password } = req.body;

    if (matricule) matricule = matricule.toString();

    if (!matricule || !password)
      return res.status(400).json({ message: "Matricule et mot de passe requis" });

    const user = await User.findOne({ matricule });
    if (!user)
      return res.status(400).json({ message: "Utilisateur non trouvé" });

    if (!user.password)
      return res.status(400).json({
        message: "Ce compte n'a pas encore de mot de passe.",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Mot de passe incorrect" });

    res.json({
      message: "Connexion réussie",
      role: user.role,
      matricule: user.matricule,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= GET USERS =================
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= UPDATE USER =================
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    delete updates.password;
    delete updates._id;
    delete updates.createdAt;
    delete updates.updatedAt;

    if (updates.matricule)
      updates.matricule = updates.matricule.toString();

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
    });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= SET PASSWORD =================
exports.setPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password)
      return res.status(400).json({ message: "Mot de passe requis" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(id, { password: hashedPassword });

    res.json({ message: "Mot de passe mis à jour" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= DELETE USER =================
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "Utilisateur supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= SET DEFAULT PASSWORDS =================
exports.setDefaultPasswords = async (req, res) => {
  try {
    const users = await User.find();
    let updatedCount = 0;

    for (let user of users) {
      if (!user.password) {
        user.password = await bcrypt.hash("123456", 10);
        if (!user.role) user.role = "technicien";
        user.matricule = user.matricule.toString();
        await user.save();
        updatedCount++;
      }
    }

    res.json({ message: `Mots de passe ajoutés: ${updatedCount}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};