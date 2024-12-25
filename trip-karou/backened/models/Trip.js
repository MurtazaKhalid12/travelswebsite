// models/Trip.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Trip = sequelize.define('Trip', {
  trip_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'trip_id'
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'user_id'
  },
  destination_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'destination_id',
    references: {
      model: 'destinations',
      key: 'destination_id'
    }
  },
  package_name: {
    type: DataTypes.STRING(150),
    allowNull: false,
    field: 'package_name'
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'price'
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'start_date'
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'end_date'
  },
  max_people: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'max_people'
  },
  available_seats: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'available_seats'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'description'
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
    field: 'created_at'
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
    field: 'updated_at'
  }
}, {
  timestamps: false,
  tableName: 'trips',
  underscored: true
});

module.exports = { Trip };