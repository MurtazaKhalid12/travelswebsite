// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); // Import the user controller
const authenticate = require("./../middlewares/authMiddleware");
// Route to register a new user
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.put("/profileupdate/:userId",userController.updateProfile);
router.get("/profile/:userId",  userController.getProfile);
router.post("/upload/:user_id", userController.upload1,userController.upload)
router.get("/verify-email",userController.verifyEmail)
module.exports = router;
