const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userProfileController = require('../controllers/userProfileController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `profil-${req.user.matricule}${ext}`);
  }
});
const upload = multer({ storage });

router.get('/', auth, userProfileController.getProfil);
router.put('/', auth, userProfileController.updateProfil);
router.post('/photo', auth, upload.single('photo'), userProfileController.uploadPhoto);

module.exports = router;