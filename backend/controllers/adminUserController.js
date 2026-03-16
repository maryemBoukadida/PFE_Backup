const GestionUser = require('../models/GestionUser');
const Profil = require('../models/Profil');

exports.getUserComplet = async (req, res) => {
  try {
    const { matricule } = req.params;
    const user = await GestionUser.findOne({ matricule });
    if (!user) return res.status(404).json({ success: false, error: 'Utilisateur non trouvé' });
    const profil = await Profil.findOne({ matricule }) || {};
    const complet = { ...user.toObject(), ...profil.toObject() };
    res.json({ success: true, data: complet });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateUserComplet = async (req, res) => {
  try {
    const { matricule } = req.params;
    const { nom_complet, email, telephone, department, role, actif, photo, poste, date_embauche, adresse, telephone_perso, date_naissance } = req.body;

    // Mise à jour de GestionUser
    await GestionUser.findOneAndUpdate(
      { matricule },
      { nom_complet, email, telephone, department, role, actif, updatedAt: new Date() },
      { new: true }
    );

    // Mise à jour de Profil (upsert)
    await Profil.findOneAndUpdate(
      { matricule },
      { photo, poste, date_embauche, adresse, telephone_perso, date_naissance, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    res.json({ success: true, message: 'Utilisateur mis à jour' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};