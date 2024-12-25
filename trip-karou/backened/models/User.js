const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('tourist', 'agency'),
    allowNull: false,
  },
  contact_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profile_picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {  // New field for description
    type: DataTypes.TEXT,
    allowNull: true,
  },
  address: {  // New field for address
    type: DataTypes.STRING,
    allowNull: true,
  },
  isVerified:{
    type:DataTypes.BOOLEAN,
    allowNull:true,
  },
  website: {  // New field for website
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,  // Disable Sequelize's automatic timestamps (createdAt, updatedAt)
  tableName: 'Users', // Ensure the correct table name is used
});

module.exports = User;
