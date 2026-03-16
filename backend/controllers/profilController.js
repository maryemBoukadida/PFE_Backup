const Profil = require('../models/Profil');

exports.getProfil = async (req, res) => {
  try {
    const profil = await Profil.findOne({ matricule: req.user.matricule });
    res.json({ success: true, profil: profil || { matricule: req.user.matricule } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
exports.updateProfil = async (req, res) => {
  try {
    const profil = await Profil.findOneAndUpdate(
      { matricule: req.user.matricule },
      { ...req.body, updatedAt: new Date() },
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
    const profil = await Profil.findOneAndUpdate(
      { matricule: req.user.matricule },
      { photo: req.file.filename, updatedAt: new Date() },
      { new: true, upsert: true }
    );
    res.json({ success: true, photo: profil.photo });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};