import React from "react";
import { useState, useEffect } from "react";
import EditableField from "./EditableField";
import MediaUpload from "./MediaUpload";
import {
  Calendar,
  Users,
  DollarSign,
  X,
  MapPin,
  Check,
  AlertCircle,
  Upload as UploadIcon,
  Image as ImageIcon,
  Camera,
  Trash2,
} from "lucide-react";

const TripDetailsModal = ({ trip, isOpen, onClose, onSave, user_id }) => {
  const [editedTrip, setEditedTrip] = useState(trip);
  const [hasChanges, setHasChanges] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [tripMedia, setTripMedia] = useState([]);
  
  // Structured media state
  const [media, setMedia] = useState({
    mainImage: null,
    additionalImages: [null, null, null, null],
    mapImage: null
  });

  // Fetch trip media when modal opens
  useEffect(() => {
    const fetchTripMedia = async () => {
      if (!isOpen || !trip.trip_id) return;
      
      try {
        const response = await fetch(
          `http://localhost:3302/api/media/trip/${trip.trip_id}`
        );
        const data = await response.json();
        
        if (data.success) {
          setTripMedia(data.media);
          
          // Organize media into structured state
          const mainImage = data.media.find(m => m.media_order === 1);
          const additionalImages = Array(4).fill(null).map((_, idx) => 
            data.media.find(m => m.media_order === idx + 2)
          );
          const mapImage = data.media.find(m => m.media_order === 6);
          
          setMedia({
            mainImage: mainImage || null,
            additionalImages: additionalImages,
            mapImage: mapImage || null
          });
        }
      } catch (err) {
        console.error("Error fetching trip media:", err);
      }
    };

    fetchTripMedia();
  }, [isOpen, trip.trip_id]);

  // Fetch destinations
  useEffect(() => {
    const fetchDestinations = async () => {
      if (!isOpen) return;

      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3302/trips/destinations?user_id=${user_id}`
        );
        const data = await response.json();
        if (data.success) {
          setDestinations(data.destinations);
        }
      } catch (err) {
        console.error("Error fetching destinations:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchDestinations();
    }
  }, [isOpen, user_id]);

  // Reset states when trip changes
  useEffect(() => {
    setEditedTrip(trip);
    setHasChanges(false);
  }, [trip]);

  if (!isOpen) return null;

  const handleFieldChange = (field, value) => {
    setEditedTrip(prev => ({
      ...prev,
      [field]: value,
    }));
    setHasChanges(true);
  };

  const handleMediaUpload = async (mediaData, mediaOrder) => {
    // Update tripMedia array
    setTripMedia(prev => {
      const filtered = prev.filter(m => m.media_order !== mediaOrder);
      return [...filtered, { ...mediaData, media_order: mediaOrder }];
    });

    // Update structured media state
    if (mediaOrder === 1) {
      setMedia(prev => ({ ...prev, mainImage: mediaData }));
    } else if (mediaOrder === 6) {
      setMedia(prev => ({ ...prev, mapImage: mediaData }));
    } else {
      setMedia(prev => {
        const newAdditionalImages = [...prev.additionalImages];
        newAdditionalImages[mediaOrder - 2] = mediaData;
        return { ...prev, additionalImages: newAdditionalImages };
      });
    }
    
    setHasChanges(true);
  };

  const handleMediaDelete = (mediaOrder) => {
    // Update tripMedia array
    setTripMedia(prev => prev.filter(m => m.media_order !== mediaOrder));

    // Update structured media state
    if (mediaOrder === 1) {
      setMedia(prev => ({ ...prev, mainImage: null }));
    } else if (mediaOrder === 6) {
      setMedia(prev => ({ ...prev, mapImage: null }));
    } else {
      setMedia(prev => {
        const newAdditionalImages = [...prev.additionalImages];
        newAdditionalImages[mediaOrder - 2] = null;
        return { ...prev, additionalImages: newAdditionalImages };
      });
    }
    
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (hasChanges) {
      const updatedTrip = {
        ...editedTrip,
        media: tripMedia,
      };
      await onSave(updatedTrip);
      setHasChanges(false);
    }
  };

  const renderDetailsTab = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EditableField
          label="Package Name"
          value={editedTrip.package_name}
          onChange={(value) => handleFieldChange("package_name", value)}
        />
        <EditableField
          label="Price (Rs.)"
          value={editedTrip.price}
          type="number"
          onChange={(value) => handleFieldChange("price", value)}
        />
        <EditableField
          label="Start Date"
          value={editedTrip.start_date}
          type="date"
          onChange={(value) => handleFieldChange("start_date", value)}
        />
        <EditableField
          label="End Date"
          value={editedTrip.end_date}
          type="date"
          onChange={(value) => handleFieldChange("end_date", value)}
        />
        <EditableField
          label="Maximum People"
          value={editedTrip.max_people}
          type="number"
          onChange={(value) => handleFieldChange("max_people", value)}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Destination
          </label>
          <select
            className="w-full text-gray-900 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={editedTrip.destination_id || ""}
            onChange={(e) => handleFieldChange("destination_id", parseInt(e.target.value, 10))}
            disabled={loading}
          >
            <option value="">Select Destination</option>
            {destinations.map((dest) => (
              <option key={dest.destination_id} value={dest.destination_id}>
                {dest.name} - {dest.province}
              </option>
            ))}
          </select>
        </div>
      </div>
      <EditableField
        label="Description"
        value={editedTrip.description}
        type="textarea"
        onChange={(value) => handleFieldChange("description", value)}
      />
    </div>
  );

  const renderMediaTab = () => (
    <div className="space-y-6">
      <MediaUpload
        label="Main Card Image"
        onUpload={(mediaData) => handleMediaUpload(mediaData, 1)}
        preview={media.mainImage?.url}
        trip_id={trip.trip_id}
        onDelete={() => handleMediaDelete(1)}
        media_order={1}
        initialData={media.mainImage}
      />
      <div className="grid grid-cols-2 gap-4">
        {media.additionalImages.map((img, idx) => (
          <MediaUpload
            key={idx}
            label={`Additional Image ${idx + 1}`}
            onUpload={(mediaData) => handleMediaUpload(mediaData, idx + 2)}
            preview={img?.url}
            trip_id={trip.trip_id}
            onDelete={() => handleMediaDelete(idx + 2)}
            media_order={idx + 2}
            initialData={img}
          />
        ))}
      </div>
    </div>
  );

  const renderMapTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <MediaUpload
          label="Trip Route Map"
          onUpload={(mediaData) => handleMediaUpload(mediaData, 6)}
          preview={media.mapImage?.url}
          onDelete={() => handleMediaDelete(6)}
          trip_id={trip.trip_id}
          media_order={6}
          initialData={media.mapImage}
        />
        {!media.mapImage && (
          <p className="text-sm text-gray-500 text-center mt-2">
            Upload an image of the trip route or location map
          </p>
        )}
      </div>
      {media.mapImage && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Map Preview</h3>
          <div className="border rounded-lg p-4">
            <img
              src={media.mapImage.url}
              alt="Trip Map"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-gray-800">
            Trip Details
            {hasChanges && (
              <span className="text-sm text-gray-500 ml-2">(Unsaved changes)</span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="border-b">
          <nav className="flex">
            {["details", "media", "map"].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-3 font-medium ${
                  activeTab === tab
                    ? "border-b-2 border-green-500 text-green-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "details" && renderDetailsTab()}
          {activeTab === "media" && renderMediaTab()}
          {activeTab === "map" && renderMapTab()}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
            {hasChanges && (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetailsModal;