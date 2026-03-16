const express = require('express');
const router = express.Router();

// Route temporaire pour éviter l'erreur
router.get('/', (req, res) => {
  res.json({ message: 'Routes admin (à implémenter)' });
});

module.exports = router;