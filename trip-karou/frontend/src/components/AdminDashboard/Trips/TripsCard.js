import React, { useState, useEffect } from "react";
import OnboardingOverlay from "./OnboardingOverlay";
import MediaUpload from "./MediaUpload";
import EditableField from "./EditableField";
import Toast from "./Toast";
import TripDetailsModal from "./TripsDetailsModal";
import axios from "axios";
import {
  Calendar, Users, DollarSign, MapPin,
  ImageIcon, Trash2, Loader, PlusCircle
} from "lucide-react";

const TripCards = ({ user_id = 23, trip_click ,settrip_click}) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingTripId, setDeletingTripId] = useState(null);
  const [error, setError] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [destinationsData, setDestinationsData] = useState({});
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
    duration: 3000
  });

  const showToast = (message, type = "success", duration = 3000) => {
    setToast({ show: true, message, type, duration });
  };

  const fetchTrips = async (customMessage) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3302/trips/getUserTrips/${user_id}`);
      const data = await response.json();
      
      if (data.success) {
        setTrips(data.trips);
        if (customMessage) {
          showToast(customMessage);
        }
      } else {
        throw new Error("Failed to fetch trips");
      }
    } catch (err) {
      showToast("Unable to load trips", "error", 4000);
      setError("Failed to load trips");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadTrips = async () => {
      if (trip_click) {

        await fetchTrips("New trip created successfully");
        settrip_click(false); // Reset the flag after fetching

      } else {
        await fetchTrips();
      }
      
    };
    loadTrips();
  }, [user_id, trip_click, settrip_click]);

  const handleDeleteTrip = async (tripId) => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;
    
    try {
      setDeletingTripId(tripId);
      setTrips(prevTrips => prevTrips.filter(trip => trip.trip_id !== tripId));
      
      await axios.delete(`http://localhost:3302/api/media/trip/${tripId}`);
      await axios.delete(`http://localhost:3302/trips/delete/${tripId}`);
      
      showToast("Trip deleted successfully");
      
    } catch (error) {
      showToast("Failed to delete trip", "error", 4000);
      await fetchTrips();
    } finally {
      setDeletingTripId(null);
    }
  };

  const fetchDestinationData = async (destinationId) => {
    if (!destinationId || destinationsData[destinationId]) return;
    
    try {
      const response = await fetch(`http://localhost:3302/trips/getdestinationsByID/${destinationId}`);
      const data = await response.json();
      if (data.success) {
        setDestinationsData(prev => ({
          ...prev,
          [destinationId]: data.destinations[0],
        }));
      }
    } catch (err) {
      showToast("Failed to load destination details", "error", 3000);
    }
  };

  useEffect(() => {
    const missingDestinations = trips
      .filter(trip => trip.destination_id && !destinationsData[trip.destination_id])
      .map(trip => trip.destination_id);

    missingDestinations.forEach(fetchDestinationData);
  }, [trips]);

  const handleViewDetails = (trip) => {
    setSelectedTrip(trip);
    setIsModalOpen(true);
  };

  const handleSaveTrip = async (updatedTrip) => {
    try {
      const response = await fetch(
        `http://localhost:3302/trips/updateTrip/${updatedTrip.trip_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTrip)
        }
      );

      const data = await response.json();
      if (data.success) {
        setTrips(prevTrips =>
          prevTrips.map(trip =>
            trip.trip_id === updatedTrip.trip_id ? updatedTrip : trip
          )
        );

        if (updatedTrip.destination_id) {
          fetchDestinationData(updatedTrip.destination_id);
        }

        showToast("Trip updated successfully");
        setIsModalOpen(false);
        setSelectedTrip(null);
        fetchTrips();
      } else {
        throw new Error(data.error || "Update failed");
      }
    } catch (err) {
      showToast("Failed to update trip", "error", 4000);
      fetchTrips();
    }
  };

  if (loading && trips.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-6 h-6 animate-spin text-blue-600 mr-3" />
        <span className="text-gray-600">Loading trips...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-red-50 rounded-lg text-center">
        <h3 className="text-red-600 font-medium mb-2">Failed to load trips</h3>
        <p className="text-gray-600 mb-4">Please refresh the page</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  if (!loading && trips.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-8 bg-white rounded-lg shadow-sm text-center">
        <h3 className="text-xl font-medium text-gray-800 mb-3">
          No Trips Available
        </h3>
        <p className="text-gray-600 mb-6">
          Create your first trip to get started
        </p>
        <button 
          onClick={() => window.location.href = '/create-trip'}
          className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Create Trip
        </button>
      </div>
    );
  }

  return (
    <>
      {showOnboarding && (
        <OnboardingOverlay onComplete={() => setShowOnboarding(false)} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <div
            key={trip.trip_id}
            className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {deletingTripId === trip.trip_id && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
                <Loader className="w-6 h-6 animate-spin text-gray-600" />
                <span className="ml-2 text-gray-600">Deleting trip...</span>
              </div>
            )}
            
            <div className="relative h-48">
              {trip.mainImage ? (
                <img
                  src={trip.mainImage}
                  alt={trip.package_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {trip.package_name}
                </h3>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {trip.available_seats} seats left
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {new Date(trip.start_date).toLocaleDateString()} -{" "}
                    {new Date(trip.end_date).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">{trip.max_people} max people</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span className="text-sm">Rs. {trip.price}</span>
                </div>

                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      {destinationsData[trip.destination_id]?.name ||
                        "Loading location..."}
                    </span>
                  </div>
                  {destinationsData[trip.destination_id]?.province && (
                    <span className="text-sm text-gray-500">
                      {destinationsData[trip.destination_id].province}
                    </span>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {trip.description}
                </p>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  data-tour="view-details"
                  onClick={() => handleViewDetails(trip)}
                  className="px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                  disabled={deletingTripId === trip.trip_id}
                >
                  View Details
                </button>
                <button
                  onClick={() => handleDeleteTrip(trip.trip_id)}
                  className="flex items-center px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={deletingTripId === trip.trip_id}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedTrip && (
        <TripDetailsModal
          trip={selectedTrip}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTrip(null);
          }}
          onSave={handleSaveTrip}
          user_id={user_id}
        />
      )}

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </>
  );
};

export default TripCards;