const Document = require('../models/Document');
const fs = require('fs'); // pour la suppression des fichiers

// @desc    Récupérer tous les documents
// @route   GET /api/documents
exports.getDocuments = async (req, res) => {
  try {
    const documents = await Document.find().sort({ createdAt: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Créer un nouveau document (upload)
// @route   POST /api/documents
exports.createDocument = async (req, res) => {
  try {
    const { title } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ message: 'Aucun fichier' });
    if (!title) return res.status(400).json({ message: 'Titre requis' });

    const newDocument = new Document({
      title,
      description: req.body.description || '',
      fileType: file.mimetype,
      fileSize: file.size,
      filePath: file.path,
      originalName: file.originalname,
      uploadedBy: null, // temporaire
      tags: []
    });

    const savedDoc = await newDocument.save();
    res.status(201).json(savedDoc);
  } catch (error) {
  console.error("🔥 ERREUR COMPLETE :", error);
  res.status(500).json({ message: error.message });
}
};

// @desc    Supprimer un document par ID
// @route   DELETE /api/documents/:id
exports.deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document non trouvé' });
    }

    // Supprimer le fichier physique
    fs.unlinkSync(document.filePath);

    await document.deleteOne();
    res.json({ message: 'Document supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Supprimer plusieurs documents
// @route   DELETE /api/documents
exports.deleteMultipleDocuments = async (req, res) => {
  try {
    const { ids } = req.body; // ids doit être un tableau d'IDs
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Aucun ID fourni' });
    }

    // Récupérer tous les documents pour avoir les chemins des fichiers
    const documents = await Document.find({ _id: { $in: ids } });

    // Supprimer chaque fichier physique
    documents.forEach(doc => fs.unlinkSync(doc.filePath));

    // Supprimer les documents de la base
    await Document.deleteMany({ _id: { $in: ids } });

    res.json({ message: `${ids.length} document(s) supprimé(s)` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
};