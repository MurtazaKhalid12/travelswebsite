import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { MyContext } from "../../../ContextApi/AppContext";
import { MapPin, Calendar, Loader2, Navigation, CheckCircle, XCircle } from "lucide-react";

const DestinationList = ({ userId, triggerRefresh }) => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const { user_id } = useContext(MyContext);
  const [editMode, setEditMode] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `http://localhost:3302/trips/destinations`,
          { params: { user_id: user_id } }
        );
        setDestinations(response.data.destinations);
      } catch (err) {
        setError("Failed to fetch destinations");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [userId, user_id,triggerRefresh]);

  // Toggle edit mode for a specific destination
  const toggleEditMode = (destinationId) => {
    setEditMode((prev) => ({
      ...prev,
      [destinationId]: !prev[destinationId],
    }));
  };

  // Initialize form data for editing a destination
  const startEditing = (destination) => {
    setFormData({
      ...formData,
      [destination.destination_id]: {
        name: destination.name,
        description: destination.description,
        province: destination.province,
      },
    });
    toggleEditMode(destination.destination_id);
  };

  // Handle save for a specific destination
  const handleSave = async (destinationId) => {
    const updatedData = formData[destinationId];
    try {
      await axios.put(
        `http://localhost:3302/trips/destination/update/${destinationId}`,
        updatedData,
        { headers: { "Content-Type": "application/json" } }
      );
      // Update local state with saved data
      setDestinations((prev) =>
        prev.map((dest) =>
          dest.destination_id === destinationId
            ? { ...dest, ...updatedData }
            : dest
        )
      );

      setMessage({ text: "Destination updated successfully!", type: "success" });
      toggleEditMode(destinationId);
    } catch (error) {
      console.error("Failed to update destination:", error);
      setMessage({ text: "Failed to update destination. Please try again.", type: "error" });
    }
  };

  // Handle changes in form input fields
  const handleInputChange = (destinationId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [destinationId]: {
        ...prev[destinationId],
        [field]: value,
      },
    }));
  };

  // Handle delete for a specific destination
  const handleDelete = async (destinationId) => {
    try {
      await axios.delete(
        `http://localhost:3302/trips/destination/delete/${destinationId}`
      );

      // Remove the deleted destination from the local state
      setDestinations((prev) =>
        prev.filter((dest) => dest.destination_id !== destinationId)
      );

      setMessage({ text: "Destination deleted successfully!", type: "success" });
    } catch (error) {
      console.error("Failed to delete destination:", error);
      setMessage({ text: "Failed to delete destination. Please try again.", type: "error" });
    }
  };

  // Reset message after a few seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-gray-50/50 border border-green-500/20 rounded-xl">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
          <p className="text-gray-600">Loading destinations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-gray-50/50 border border-green-500/20 rounded-xl">
        <div className="bg-red-50 p-4 rounded-xl text-red-600 flex items-center gap-2">
          <XCircle className="w-6 h-6" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/50 p-8 min-h-screen">
      <div className="max-w-7xl mx-auto border border-green-500/20 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm">
        {message && (
          <div className={`p-4 rounded-xl ${message.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"} flex items-center gap-2 mb-4`}>
            {message.type === "success" ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
            <span>{message.text}</span>
          </div>
        )}

        <div className="flex items-center justify-between p-6 border-b border-green-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Navigation className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Your Destinations
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and view all your travel destinations
              </p>
            </div>
          </div>
          <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-500/20">
            <span className="text-green-600 font-medium">
              {destinations.length} Destinations
            </span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {destinations.map((destination) => (
            <div
              key={destination.destination_id}
              className="flex items-center p-4 border border-green-500 rounded-lg bg-white shadow-sm hover:shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-green-500/10"
            >
              <div className="flex-shrink-0 p-2 bg-green-50 rounded-lg">
                <MapPin className="w-6 h-6 text-green-500" />
              </div>
              <div className="flex-1 ml-6">
                {editMode[destination.destination_id] ? (
                  <>
                    <input
                      type="text"
                      value={formData[destination.destination_id]?.name || ""}
                      onChange={(e) =>
                        handleInputChange(destination.destination_id, "name", e.target.value)
                      }
                      className="block w-full mb-2 border border-gray-300 rounded-md p-2"
                    />
                    <textarea
                      value={formData[destination.destination_id]?.description || ""}
                      onChange={(e) =>
                        handleInputChange(destination.destination_id, "description", e.target.value)
                      }
                      className="block w-full mb-2 border border-gray-300 rounded-md p-2"
                      rows={3}
                    />
                    <input
                      type="text"
                      value={formData[destination.destination_id]?.province || ""}
                      onChange={(e) =>
                        handleInputChange(destination.destination_id, "province", e.target.value)
                      }
                      className="block w-full mb-2 border border-gray-300 rounded-md p-2"
                    />
                  </>
                ) : (
                  <>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {destination.name}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {destination.description}
                    </p>
                    <div className="text-gray-500 text-sm mt-2">
                      <span className="font-medium">Province:</span>{" "}
                      {destination.province}
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center ml-4 text-gray-500">
                <Calendar className="w-4 h-4 mr-1.5" />
                <time dateTime={destination.created_at}>
                  {new Date(destination.created_at).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "short", day: "numeric" }
                  )}
                </time>
              </div>
              <div className="flex gap-2 ml-6">
                <button
                  onClick={() =>
                    editMode[destination.destination_id]
                      ? handleSave(destination.destination_id)
                      : startEditing(destination)
                  }
                  className="px-3 py-1 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors duration-300"
                >
                  {editMode[destination.destination_id] ? "Save" : "Modify"}
                </button>
                <button
                  onClick={() => handleDelete(destination.destination_id)}
                  className="px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationList;
