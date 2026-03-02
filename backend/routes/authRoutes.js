// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");

// La route doit être POST /api/login
router.post("/login", login);  // ← POST, pas GET

module.exports = router;