import React, { useState } from "react";
import { Mail, Lock, Users, Loader, CreditCard } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { useContext } from "react";
import { MyContext } from "../../ContextApi/AppContext";
const stripePromise = loadStripe(
  "pk_test_51QO13rG0Zi2MezpWG7zD5HKPa14EfldzYiAgN9xtdRbGeviicsSVmoF6FTVGDMH2le3sQzWAuctp29xcQJzMZ59A00SPlHvQYA"
);

const BookingForm = ({ trip }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const {user_id} = useContext(MyContext);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [bookingData, setBookingData] = useState({
    email: "",
    numberOfGuests: 1,
    creditCardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleGuestsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > trip.available_seats) {
      setError(`Maximum ${trip.available_seats} seats available`);
      setBookingData({
        ...bookingData,
        numberOfGuests: trip.available_seats,
      });
    } else if (value < 1) {
      setError("Minimum 1 guest required");
      setBookingData({
        ...bookingData,
        numberOfGuests: 1,
      });
    } else {
      setError("");
      setBookingData({
        ...bookingData,
        numberOfGuests: value,
      });
    }
  };

  const handleEmailChange = (e) => {
    setBookingData({ ...bookingData, email: e.target.value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const stripe = await stripePromise;

      const bookingRequest = {
        userId: user_id,
        tripId: trip.trip_id,
        numberOfPeople: bookingData.numberOfGuests,
        totalPrice: parseFloat(trip.price) * bookingData.numberOfGuests,
        successUrl: window.location.origin + "/booking/success",
        cancelUrl: window.location.origin + "/booking/cancel",
      };

      const response = await fetch(
        "http://localhost:3302/api/bookings/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingRequest),
        }
      );

      const session = await response.json();

      if (response.ok) {
        await stripe.redirectToCheckout({ sessionId: session.sessionId });
      } else {
        throw new Error(session.error || "Unable to create checkout session");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      setToast({
        show: true,
        message: "Failed to proceed with booking. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md h-fit sticky top-8">
      <h2 className="text-2xl font-semibold mb-6">Book Your Adventure</h2>
      <form onSubmit={handleBookingSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="relative">
            <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={bookingData.email}
              onChange={handleEmailChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Number of Guests
          </label>
          <div className="relative">
            <Users className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={bookingData.numberOfGuests}
              onChange={handleGuestsChange}
              min="1"
              max={trip.available_seats}
              className={`
    appearance-none 
    w-full 
    pl-10 
    pr-4 
    py-2
    bg-transparent
    placeholder:text-slate-400
    text-slate-700
    text-sm
    border
    border-slate-200
    rounded-md
    transition
    duration-300
    ease
    focus:outline-none
    focus:border-blue-500
    hover:border-blue-300
    shadow-sm
    focus:shadow
    ${error ? "border-red-500" : ""}
  `}
              required
            />

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <p className="text-gray-500 text-sm mt-1">
              Available seats: {trip.available_seats}
            </p>
          </div>
        </div>

        <div className="pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Trip Cost</span>
            <span className="font-semibold">Rs. {trip.price}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Number of Guests</span>
            <span className="font-semibold">
              × {bookingData.numberOfGuests}
            </span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between">
              <span className="font-semibold">Total Amount</span>
              <span className="font-bold text-lg">
                Rs.{" "}
                {(parseFloat(trip.price) * bookingData.numberOfGuests).toFixed(
                  2
                )}
              </span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || error}
          className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              <span>Complete Booking</span>
            </>
          )}
        </button>

        {toast.show && (
          <div
            className={`mt-4 p-3 rounded-lg ${
              toast.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {toast.message}
          </div>
        )}

        <p className="text-xs text-gray-500 text-center mt-4">
          By clicking "Complete Booking", you agree to our terms and conditions
          and cancellation policy.
        </p>
      </form>
    </div>
  );
};

export default BookingForm;
