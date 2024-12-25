import React, { useState } from "react";
import {
  Calendar,
  Users,
  DollarSign,
  MapPin,
  Clock,
  CreditCard,
  Mail,
  Lock,
  Loader,
  Send,
} from "lucide-react";
import { MyContext } from "../../ContextApi/AppContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Toast from "./Toast";
import ImageCarousel from "./Imagecarousal";
import ReviewCard from "./ReviewCard";
import MapDisplay from "./MapDisplay";
import BookingForm from "./BookingForm";
// Toast Component

// Add these animations to your tailwind.config.js

// Review Card Component

const Booking = () => {
  const { searchResults } = useContext(MyContext);
  const { trips_id } = useParams();
  console.log("searchResult", searchResults.data[0]);

  const tripdata = searchResults.data[0];
  const mapImage = tripdata.media.find(
    (media) => media.media_order === 6
  )?.media_url;

  const [trip, setTrip] = useState({
    trip_id: tripdata.trip_id,
    package_name: tripdata.package_name,
    price: tripdata.price,
    start_date: tripdata.start_date,
    end_date: tripdata.end_date,
    max_people: tripdata.max_people,
    available_seats: tripdata.available_seats,
    description: tripdata.description,
    destination: {
      name: tripdata.destination.name,
      province: tripdata.description.province,
    },
    media: tripdata?.media
      ? [...tripdata.media.filter((media) => media.media_order !== 6)]
      : [],
  });
  console.log(trip.media);

  const [reviews, setReviews] = useState([
    {
      review_id: 1,
      user: { name: "Alice Johnson" },
      review:
        "This trip exceeded all my expectations! The scenery was breathtaking and the guides were incredibly knowledgeable. Would definitely recommend!",
      created_at: "2024-03-20T10:30:00.000Z",
    },
    {
      review_id: 2,
      user: { name: "Bob Smith" },
      review:
        "A perfect blend of adventure and relaxation. The accommodations were comfortable and the local cuisine was amazing.",
      created_at: "2024-03-22T14:45:00.000Z",
    },
  ]);

  const [review, setReview] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!review.trim()) return;

    const newReview = {
      review_id: reviews.length + 1,
      user: { name: "Current User" },
      review: review,
      created_at: new Date().toISOString(),
    };

    setReviews([newReview, ...reviews]);
    setReview("");
    setToast({
      show: true,
      message: "Thank you for your review!",
      type: "success",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section with Carousel */}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Trip Details */}
          <div className="md:col-span-2 bg-white rounded-lg p-6 shadow-md">
            <h1 className="text-3xl font-bold mb-2">{trip.package_name}</h1>
            <div className="flex items-center text-blue-600 mb-6">
              <MapPin className="w-4 h-4 mr-1" />
              <span>
                {trip.destination.name}, {trip.destination.province}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>
                  {new Date(trip.start_date).toLocaleDateString()} -{" "}
                  {new Date(trip.end_date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span>{trip.available_seats} seats available</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>
                  {Math.ceil(
                    (new Date(trip.end_date) - new Date(trip.start_date)) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  days
                </span>
              </div>
              <div className="flex items-center space-x-2 text-green-600 font-semibold">
                <DollarSign className="w-5 h-5" />
                <span>Rs. {trip.price}</span>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">
              {trip.description}
            </p>

            <ImageCarousel images={trip.media} />
            {MapDisplay && <MapDisplay mapImage={mapImage} />}

            {/* Reviews Section */}
            <div className="border-t pt-8">
              <h2 className="text-2xl font-semibold mb-6">Reviews</h2>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <ReviewCard key={review.review_id} review={review} />
                ))}
              </div>

              {/* Add Review Form */}
              <form onSubmit={handleReviewSubmit} className="mt-8">
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share your experience..."
                  className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                />
                <button
                  type="submit"
                  className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Review</span>
                </button>
              </form>
            </div>
          </div>
          {/* Booking Form */}
          <BookingForm trip={trip}></BookingForm>
        </div>
      </div>
    </div>
  );
};

export default Booking;
