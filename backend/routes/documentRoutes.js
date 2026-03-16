const express = require('express');
const router = express.Router();
const { getDocuments, createDocument, deleteDocument, deleteMultipleDocuments } = require('../controllers/documentController');
const multer = require('multer');
const path = require('path');

// Configuration de multer pour l'upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // dossier où stocker les fichiers
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100 Mo
});

// Routes
router.route('/')
  .get(getDocuments)
  .post(upload.single('file'), createDocument)
  .delete(deleteMultipleDocuments); // Pour suppression multiple

router.route('/:id')
  .delete(deleteDocument);

module.exports = router;