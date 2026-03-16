const GestionUser = require('../models/GestionUser');
const Profil = require('../models/Profil');

exports.getMyInfo = async (req, res) => {
  try {
    const user = await GestionUser.findOne({ matricule: req.user.matricule });
    if (!user) return res.status(404).json({ success: false, error: 'Utilisateur non trouvé' });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateMyInfo = async (req, res) => {
  try {
    const { nom_complet, email, telephone } = req.body;
    const updateData = {};
    if (nom_complet !== undefined) updateData.nom_complet = nom_complet;
    if (email !== undefined) updateData.email = email;
    if (telephone !== undefined) updateData.telephone = telephone;
    updateData.updatedAt = new Date();

    const user = await GestionUser.findOneAndUpdate(
      { matricule: req.user.matricule },
      { $set: updateData },
      { new: true }
    );
    if (!user) return res.status(404).json({ success: false, error: 'Utilisateur non trouvé' });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getProfil = async (req, res) => {
  try {
    let profil = await Profil.findOne({ matricule: req.user.matricule });
    if (!profil) profil = { matricule: req.user.matricule };
    res.json({ success: true, profil });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateProfil = async (req, res) => {
  try {
    const { photo, poste, date_embauche, adresse, telephone_perso, date_naissance } = req.body;
    const updateData = { photo, poste, date_embauche, adresse, telephone_perso, date_naissance, updatedAt: new Date() };
    const profil = await Profil.findOneAndUpdate(
      { matricule: req.user.matricule },
      { $set: updateData },
      { new: true, upsert: true }
    );
    res.json({ success: true, profil });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.uploadPhoto = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, error: 'Aucun fichier' });
    const filename = req.file.filename;
    const profil = await Profil.findOneAndUpdate(
      { matricule: req.user.matricule },
      { photo: filename, updatedAt: new Date() },
      { new: true, upsert: true }
    );
    res.json({ success: true, photo: profil.photo });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};