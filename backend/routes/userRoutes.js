const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require('../middleware/auth');
const userProfileController = require('../controllers/userProfileController');

// Routes publiques (authentification)
router.post("/register", userController.register);
router.post("/login", userController.login);

// Routes protégées pour l'utilisateur connecté
router.get('/me', auth, userProfileController.getMyInfo);
router.put('/me', auth, userProfileController.updateMyInfo);

// Routes pour l'admin (gestion des utilisateurs)
router.get("/users", auth, userController.getUsers); // à protéger par admin si nécessaire
router.put("/users/:id", auth, userController.updateUser);
router.put("/users/:id/set-password", auth, userController.setPassword);
router.delete("/users/:id", auth, userController.deleteUser);
router.post("/set-default-passwords", auth, userController.setDefaultPasswords);

module.exports = router;