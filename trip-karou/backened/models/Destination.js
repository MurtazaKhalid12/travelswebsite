const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db"); // Import the database configuration

const Destination = sequelize.define(
  "Destination",
  {
    destination_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true, // Optional field based on the schema
    },
    province: {
      type: DataTypes.STRING(50),
      allowNull: true, // Optional field based on the schema
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "user_id",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Automatically set the timestamp
    },

    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Automatically set and update timestamp
    },
  },
  {
    timestamps: false, // Disable Sequelize's automatic timestamps
    tableName: "destinations", // Ensure the correct table name is used
  }
);

module.exports = { Destination };
