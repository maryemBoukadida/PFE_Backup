const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ success: false, error: 'Accès non autorisé' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Optionnel : vérifier que l'utilisateur existe toujours dans la base
    const user = await User.findOne({ matricule: decoded.matricule });
    if (!user) {
      return res.status(401).json({ success: false, error: 'Utilisateur non trouvé' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Token invalide' });
  }
};