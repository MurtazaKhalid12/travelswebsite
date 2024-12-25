const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Media = sequelize.define('Media', {
  media_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  trip_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  media_type: {
    type: DataTypes.ENUM('image', 'video', 'map', 'other'),  // Added map and other to match frontend options
    allowNull: false,
  },
  media_url: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  alt_text: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  uploaded_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
  media_order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: false,
  tableName: 'media',
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci'
});

module.exports = Media;