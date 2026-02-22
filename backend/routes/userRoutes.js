const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/users", userController.getUsers);
router.put("/users/:id", userController.updateUser);
router.put("/users/:id/set-password", userController.setPassword);
router.delete("/users/:id", userController.deleteUser);
router.post("/set-default-passwords", userController.setDefaultPasswords);

module.exports = router;