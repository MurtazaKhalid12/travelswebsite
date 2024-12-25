// models/index.js
const { Sequelize } = require('sequelize');
const { sequelize } = require('../config/db');

// Import models
const { Trip } = require('./Trip');
const Media = require('./Media');
const { Destination } = require('./Destination');
const User = require('./User'); // Import the User model

// Define Associations
const initializeAssociations = () => {
  // Trip <-> Destination
  Trip.belongsTo(Destination, { 
    foreignKey: 'destination_id', 
    as: 'destination',
    onDelete: 'RESTRICT'
  });
  
  Destination.hasMany(Trip, { 
    foreignKey: 'destination_id', 
    as: 'trips',
    onDelete: 'RESTRICT'
  });

  // Trip <-> Media
  Trip.hasMany(Media, { 
    foreignKey: 'trip_id', 
    as: 'media',
    onDelete: 'CASCADE'
  });
  
  Media.belongsTo(Trip, { 
    foreignKey: 'trip_id', 
    as: 'trip',
    onDelete: 'CASCADE'
  });

  // User <-> Trip
  User.hasMany(Trip, { 
    foreignKey: 'user_id', // The foreign key in the Trip table that refers to User
    as: 'trips',
    onDelete: 'CASCADE'
  });

  Trip.belongsTo(User, { 
    foreignKey: 'user_id', // The foreign key in the Trip table
    as: 'user', // Alias for the associated User
    onDelete: 'CASCADE'
  });
};

// Initialize associations
initializeAssociations();

// Export models and Sequelize instances
module.exports = {
  sequelize,
  Sequelize,
  Trip,
  Media,
  Destination,
  User
};
