const User = require("../models/User");
const bcrypt = require("bcryptjs"); // Import bcryptjs library
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");
require("dotenv").config(); // For accessing environment variables
const multer = require("multer"); // Import multer library
const { db } = require("../config/db");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "79046e19057459", // Replace with your Mailtrap username
    pass: "79dce75b76fe31", // Replace with your Mailtrap password
  },
});

async function sendVerificationEmail(to, token) {
  const verificationLink = `http://localhost:3302/users/verify-email?token=${token}`;

  const mailOptions = {
    from: '"Trip Karou" <no-reply@tripkarou.com>',
    to: to,
    subject: "Verify Your Email",
    html: `<p>Welcome to Trip Karou! Please verify your email by clicking the link below:</p>
           <a href="${verificationLink}">Verify Email</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to:", to);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Adjust the path as needed

// const db = require('./db')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/profile_pictures"); // Directory to store images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

exports.upload1 = upload.single("profile_picture");

exports.registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    contact_number,
    description,
    address,
    website,
  } = req.body;

  try {
    // Validate email
    if (!email) {
      return res.status(400).json({ msg: "Email is required" });
    }

    // Validate password
    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters" });
    }

    // Check if the user already exists
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user with isVerified set to false
    user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      contact_number,
      description,
      address,
      website,
      isVerified: false, // New field to track email verification
    });

    // Generate a verification token
    const verificationToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "10d" }
    );

    // Send verification email
    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      msg: "User registered successfully. Please verify your email.",
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};
// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (!user.isVerified) {
      return res.status(401).json({ message: "User not verified." });
    }
    // Compare passwords
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.user_id, role: user.role }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Token expiration
    );

    // Send token and user info as response
    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        userId: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, contact_number, password, address, description } =
      req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (contact_number) user.contact_number = contact_number;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    if (address) user.address = address;
    if (description) user.description = description;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully.", user });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ message: "Email already Exist" });
    } else {
      console.error(error);
      res.status(500).json({ message: "Server error.", error: error.message });
    }
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.params; // Extract user ID from the JWT token (from middleware)

    // Find the user by ID
    const user = await User.findOne({ where: { user_id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (!user.isVerified) {
      return res.status(401).json({ message: "User not verified." });
    }

    res.status(200).json({
      message: "Login successful.",
      user: {
        userId: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
        contact_number: user.contact_number,
        profile_picture: user.profile_picture,
        description: user.description,
        created_at: user.created_at,
        address: user.address,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.upload = async (req, res) => {
  const userId = req.params.user_id;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const profilePicturePath = `/uploads/profile_pictures/${req.file.filename}`;

  try {
    // Use Sequelize's `update` method
    const [updatedRows] = await User.update(
      { profile_picture: profilePicturePath },
      { where: { user_id: userId } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "Profile picture uploaded successfully",
      profile_picture: profilePicturePath,
    });
  } catch (err) {
    console.error("Error updating profile picture:", err);
    res.status(500).json({ error: "Failed to save profile picture" });
  }
};
exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Server Time (UTC):", new Date().toISOString());
    console.log(
      "Token Expiration Time (UTC):",
      new Date(decoded.exp * 1000).toISOString()
    );
    console.log(decoded);

    const email = decoded.email;
    console.log(email);

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if already verified
    if (user.isVerified) {
      return res.status(400).json({ msg: "User is already verified" });
    }

    // Mark the user as verified
    user.isVerified = true;
    await user.save();

    // Redirect to login page after successful verification
    return res.redirect("http://localhost:3000/login");
  } catch (error) {
    console.error("Verification error:", error.message);
    return res.status(400).json({ msg: "Invalid or expired token" });
  }
};
