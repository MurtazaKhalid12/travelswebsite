// app.js

const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const { sequelize } = require('./config/db');
const authenticate = require('./middlewares/authMiddleware');
const cors = require('cors'); // Import CORS middleware
const multer = require('multer');
const router = require('./routes/userRoutes');
const helmet = require('helmet');


const nodemailer = require('nodemailer');

// Set up the transporter using Mailtrap


// Function to send verification email



// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Connect to MySQL Database
connectDB();

// Middleware
app.use(express.json()); // For parsing JSON data
app.use(express.urlencoded({ extended: false })); // For parsing form data
app.use(express.static(path.join(__dirname, 'public')));

// Set View Engine to EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());


app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "https://js.stripe.com"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    workerSrc: ["'self'", "blob:", "https://m.stripe.network"],
  }
}));

app.use('/api/media', require('./routes/mediaRoutes'));


app.use('/media', express.static(path.join(__dirname, 'media_files')));

// Define Routes
// app.use('/auth', require('./routes/authRoutes'));
// app.use('/bookings', require('./routes/bookingRoutes'));
// app.use('/media', require('./routes/mediaRoutes'));
// app.use('/reviews', require('./routes/reviewRoutes'));
app.use('/trips', require('./routes/tripRoutes'));
app.use('/users',require('./routes/userRoutes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Static file serving
app.use('/api/bookings',require('./routes/bookingRoutes'))
// app.use('/agency',require('./routes/agencyRoutes'));
// app.use('/agencies', require('./routes/agencyRoutes'));

// Home Route
app.get('/', (req, res) => {
  res.render('home');
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const { sequelize } = require('./config/db');


app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: false })); // To parse form data