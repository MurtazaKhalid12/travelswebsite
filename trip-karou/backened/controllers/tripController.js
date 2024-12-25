// controllers/tripController.js
const { Trip, Destination, Media, User } = require("../models");
const { Op } = require("sequelize");
// import '../db'
exports.search = async (req, res) => {
  try {
    // Extract query parameters
    const { destination, date, guests } = req.query;

    // Initialize where conditions for the Trip model
    const whereConditions = {};

    // Initialize include conditions for the associations
    const includeConditions = [
      {
        model: Destination,
        as: "destination",
        attributes: ["destination_id", "name", "province"],
        where: destination
          ? {
              name: { [Op.like]: `%${destination}%` },
            }
          : undefined, // No filter if 'destination' is not provided
      },
      {
        model: Media,
        as: "media",
        attributes: ["media_id", "media_type", "media_url","media_order"],
      },
      {
        model: User,
        as: "user", // Assuming the alias 'user' is used for the relation in the model
        attributes: ["user_id", "name", "email", "contact_number", "address"], // Include necessary user attributes
      },
    ];

    // Apply 'guests' filter if provided
    if (guests) {
      const guestsInt = parseInt(guests, 10);
      if (isNaN(guestsInt) || guestsInt < 1) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid number of guests." });
      }

      whereConditions.available_seats = { [Op.gte]: guestsInt };
      whereConditions.max_people = { [Op.gte]: guestsInt };
    }

    // Apply 'date' filter if provided
    if (date) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

      // Validate the date format
      if (!dateRegex.test(date)) {
        return res.status(400).json({
          success: false,
          message: "Invalid date format. Use YYYY-MM-DD.",
        });
      }

      // Convert date to a Date object to ensure proper comparison
      const parsedDate = new Date(date);

      // Ensure that only trips that include this date range are fetched
      whereConditions.start_date = { [Op.lte]: parsedDate };
      whereConditions.end_date = { [Op.gte]: parsedDate };
    }

    // Fetch trips with filtering and associations
    const trips = await Trip.findAll({
      where: whereConditions,
      include: includeConditions,
      attributes: [
        "trip_id",
        "user_id", // or 'user_id' if that's your foreign key column
        "destination_id",
        "package_name",
        "price",
        "start_date",
        "end_date",
        "max_people",
        "available_seats",
        "description",
        "created_at",
        "updated_at",
      ],
      order: [["start_date", "ASC"]], // Optional: Sort trips by start date
    });

    // Send successful response with data
    res.json({
      success: true,
      data: trips,
    });
  } catch (error) {
    console.error("Error fetching trips:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch trips",
      details: error.message,
    });
  }
};
exports.createTrip = async (req, res) => {
  try {
    const {
      package_name,
      price,
      start_date,
      end_date,
      max_people,
      available_seats,
      description,
      user_id,
      destination_id, // Array of destination IDs
    } = req.body;
    console.log(destination_id);
    // Create the new trip
    const newTrip = await Trip.create({
      package_name,
      price,
      start_date,
      end_date,
      max_people,
      available_seats: available_seats || max_people,
      description,
      user_id,
      destination_id,
    });

    // Associate multiple destinations with the trip
    if (destination_id && destination_id.length > 0) {
      const destinations = await Destination.findAll({
        where: { destination_id: destination_id },
      });
      await newTrip.addDestinations(destinations); // Adds multiple destinations to the trip
    }

    res
      .status(201)
      .json({ message: "Trip created successfully", trip: newTrip });
  } catch (error) {
    console.error("Error creating trip:", error);
    res
      .status(500)
      .json({ message: "Error creating trip", error: error.message });
  }
};
exports.createDestination = async (req, res) => {
  try {
    const { name, description, province, user_id } = req.body;
    console.log(req.body);
    console.log(user_id);
    // const userId = req.user.user_id; // Assume the user_id is stored in `req.user` after authentication middleware

    const destination = await Destination.create({
      name,
      description,
      province,
      user_id: user_id,
    });

    res.status(201).json({ success: true, destination });
  } catch (error) {
    console.error("Error creating destination:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to create destination" });
  }
};

exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.findAll();
    res.json(destinations);
  } catch (error) {
    console.error("Error fetching destinations:", error);
    res.status(500).json({ error: "Failed to fetch destinations" });
  }
};

exports.getUserDestinations = async (req, res) => {
  try {
    console.log(req.query);
    const userId = req.query.user_id; // Assume user_id is available in req.user after authentication

    const destinations = await Destination.findAll({
      where: { user_id: userId },
      attributes: [
        "destination_id",
        "name",
        "description",
        "province",
        "created_at",
      ], // Include only necessary fields
    });

    res.json({ success: true, destinations });
  } catch (error) {
    console.error("Error fetching user destinations:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch user destinations" });
  }
};
// const db = require('../db'); // Import the MySQL connection

exports.deleteDestination = async (req, res) => {
  try {
    // Step 2: Extract destination_id from request parameters
    const { destination_id } = req.params;

    // Step 3: Attempt to delete the destination
    const deleted = await Destination.destroy({
      where: { destination_id },
    });

    // Step 4: Check if deletion was successful
    if (deleted) {
      res
        .status(200)
        .json({ success: true, message: "Destination deleted successfully" });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Destination not found" });
    }
  } catch (error) {
    console.error("Error deleting destination:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to delete destination" });
  }
};
// controllers/tripController.js

exports.updateDestination = async (req, res) => {
  try {
    // Step 1: Extract destination_id from the request parameters
    const { destination_id } = req.params; // Use req.query if you’re passing destination_id as a query parameter

    // Step 2: Extract the updated data from the request body
    const { name, description, province } = req.body;

    // Step 3: Validate the input
    if (!name || !description || !province) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: name, description, province",
      });
    }

    // Step 4: Find and update the destination
    const [updated] = await Destination.update(
      { name, description, province },
      { where: { destination_id } }
    );

    // Step 5: Check if the update was successful
    if (updated) {
      const updatedDestination = await Destination.findOne({
        where: { destination_id },
      });
      res.status(200).json({ success: true, data: updatedDestination });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Destination not found" });
    }
  } catch (error) {
    console.error("Error updating destination:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to update destination" });
  }
};
exports.getUserTrips = async (req, res) => {
  try {
    const { user_id } = req.params; // Get user_id from query parameter
    console.log(req.params);
    console.log(user_id);
    console.log("Fetching trips for user_id:", user_id);

    // Find all trips for the specific user
    const userTrips = await Trip.findAll({
      where: { user_id: user_id },
      attributes: [
        "trip_id",
        "package_name",
        "price",
        "start_date",
        "end_date",
        "max_people",
        "available_seats",
        "description",
        "destination_id",
      ],
      order: [["created_at", "DESC"]], // Most recent trips first
    });

    if (!userTrips || userTrips.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No trips found for this user",
      });
    }

    // Send successful response with data
    res.json({
      success: true,
      trips: userTrips,
    });
  } catch (error) {
    console.error("Error fetching user trips:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch user trips",
      details: error.message,
    });
  }
};
exports.iddestinations = async (req, res) => {
  try {
    const { destination_id } = req.params; // Assume user_id is available in req.user after authentication

    const destinations = await Destination.findAll({
      where: { destination_id: destination_id },
      attributes: [
        "destination_id",
        "name",
        "description",
        "province",
        "created_at",
      ], // Include only necessary fields
    });

    res.json({ success: true, destinations });
  } catch (error) {
    console.error("Error fetching user destinations:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch user destinations" });
  }
};
exports.updateTrips = async (req, res) => {
  try {
    const { trip_id } = req.params;
    const updateData = req.body; // Get update data from request body

    // Update the trip
    const [updated] = await Trip.update(
      {
        package_name: updateData.package_name,
        price: updateData.price,
        start_date: updateData.start_date,
        end_date: updateData.end_date,
        max_people: updateData.max_people,
        description: updateData.description,
        destination_id: updateData.destination_id,
        // Don't update user_id as it shouldn't change
      },
      {
        where: { trip_id: trip_id },
      }
    );

    if (updated) {
      // Fetch the updated trip to return in response
      const updatedTrip = await Trip.findOne({
        where: { trip_id: trip_id },
      });

      res.json({
        success: true,
        message: "Trip updated successfully",
        data: updatedTrip,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }
  } catch (error) {
    console.error("Error updating trip:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update trip",
      details: error.message,
    });
  }
};
exports.deleteTrip = async (req, res) => {
  try {
    const { trip_id } = req.params;
    // check if trip exists
    const tripExists = await Trip.findByPk(trip_id);
    if (!tripExists) {
      return res.status(404).json({
        message: false,
        message: "Trip not found",
      });
    }

    await Trip.destroy({
      where: { trip_id },  
    });
  } catch (error) {
    console.error("Error deleting trip:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete trip",
      details: error.message,
    });
  }
};
