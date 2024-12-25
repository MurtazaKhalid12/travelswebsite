const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Booking = sequelize.define(
  "Booking",
  {
    booking_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    booking_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    number_of_people: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  },
  {
    timestamps: false,
    tableName: "bookings",
  }
);

module.exports = { Booking };