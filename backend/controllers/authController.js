const User = require('../models/User');
const GestionUser = require('../models/GestionUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    let { matricule, password } = req.body;
    if (!matricule || !password) {
      return res.status(400).json({ success: false, message: 'Champs requis' });
    }
    matricule = matricule.toString();
    const user = await User.findOne({ matricule });
    if (!user) return res.status(400).json({ success: false, message: 'Utilisateur non trouvé' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Mot de passe incorrect' });

    const token = jwt.sign(
      { matricule: user.matricule, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const gest = await GestionUser.findOne({ matricule: user.matricule });
    const nom_complet = gest ? gest.nom_complet : user.matricule;

    res.json({
      success: true,
      token,
      user: { matricule: user.matricule, role: user.role, nom_complet }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};