require("dotenv").config();
const { Booking } = require("../models/Booking");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const { sequelize } = require("../config/db");

const Trip = require("../models/Trip");
const createCheckoutSession = async (req, res) => {
  try {
    const {
      userId,
      tripId,
      numberOfPeople,
      totalPrice,
      successUrl,
      cancelUrl,
    } = req.body;

    // First create the booking
    const booking = await Booking.create({
      user_id: userId,
      trip_id: tripId,
      booking_date: new Date(),
      number_of_people: numberOfPeople,
      total_price: parseFloat(totalPrice).toFixed(2),
      updated_at: new Date(),
    });

    const [trip] = await sequelize.query(
      "SELECT * FROM trips WHERE trip_id = ?",
      {
        replacements: [tripId],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!trip) {
      throw new Error("Trip not found");
    }

    const updatedSeats = trip.available_seats - numberOfPeople;
    if (updatedSeats < 0) {
      throw new Error("Not enough seats available");
    }

    // Update trip seats using raw query
    await sequelize.query(
      "UPDATE trips SET available_seats = ? WHERE trip_id = ?",
      {
        replacements: [updatedSeats, tripId],
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    console.log("Booking successfully created and trip seats updated");
    // Then create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Trip ID: ${tripId}`,
              description: `Booking for ${numberOfPeople} people`,
            },
            unit_amount: parseInt(totalPrice * 100), // Convert dollars to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      payment_intent_data: {
        metadata: {
          bookingId: booking.id, // Store booking ID in payment metadata
        },
      },
    });

    // Return both booking details and session URL
    res.status(200).json({
      success: true,
      bookingId: booking.id,
      sessionId: session.id,
      sessionUrl: session.url,
    });
  } catch (error) {
    console.error("Error in checkout process:", error);
    res.status(500).json({ error: "Unable to process checkout and booking" });
  }
};

const getBookinginformation = async (req, res) => {
  try {
    // Destructure user_id from req.params
    const { user_id } = req.params; // tripkkarou/getbookinginformation/3

    // Get bookings with trip information using JOIN
    const bookings = await sequelize.query(
      `SELECT 
        sum(b.number_of_people) as number_of_people,
        count(b.booking_id) as Total_bookings,
        sum(b.total_price) as Total_revenue_Tours,
        count(t.package_name) as Number_of_Packages,
        t.available_seats
      FROM bookings b
      LEFT JOIN trips t ON b.trip_id = t.trip_id
      WHERE t.user_id = ?
      ORDER BY b.booking_date DESC`,
      {
        replacements: [user_id], // Use replacements to safely inject the user_id
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (bookings.length == 0) {
      return res.status(404).json({
        success: false,
        message: "No bookings were found for this user",
      });
    }

    const RecentBookings = await sequelize.query(
      `SELECT 
        u.name,
        b.number_of_people,
        b.booking_date,
        t.package_name
      FROM bookings b
      INNER JOIN users u ON b.user_id = u.user_id
      LEFT JOIN trips t ON b.trip_id = t.trip_id
      WHERE t.user_id =  ?
      ORDER BY b.booking_date DESC`,
      {
        replacements: [user_id],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    const Tours = await sequelize.query(
      `SELECT
          count(t.package_name) as Total_Tours
       FROM trips t
       WHERE t.user_id = ?`,
      {
        replacements: [user_id],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    res.status(200).json({
      success: true,
      data: bookings,
      RecentBookings: RecentBookings,
      Tours: Tours,
    });
  } catch (error) {
    console.error("Error fetching booking information:", error);
    res.status(500).json({
      success: false,
      error: "Unable to fetch booking information",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await sequelize.query(
      `SELECT 
        u.user_id,
        u.name,
        u.email,
        b.booking_id,
        b.trip_id,
        b.booking_date,
        b.number_of_people,
        b.total_price
      FROM users u
      INNER JOIN bookings b ON u.user_id = b.user_id
      WHERE u.user_id = ?`,
      {
        replacements: [user_id],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user information:", error);
    res.status(500).json({
      success: false,
      error: "Unable to fetch user information",
    });
  }
};

module.exports = {
  createCheckoutSession,
  getBookinginformation,
  getUserById,
};