import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../../ContextApi/AppContext";
import axios from "axios";
import {
  Mail,
  Phone,
  Camera,
  Edit,
  Calendar,
  MapPin,
  Settings,
  Award,
  Activity,
} from "lucide-react";

const Profile = () => {
  const { user_id } = useContext(MyContext);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState({
    name: false,
    address: false,
    description: false,
    contact_number: false,
    email: false,
  });

  const [editedData, setEditedData] = useState({
    name: "",
    address: "",
    description: "",
    contact_number: "",
    email: "",
  });
  console.log("hello" + editedData.name);

  const handleSaveChanges = async () => {
    // Filter out unchanged fields
    const updatedFields = Object.keys(editedData).reduce((acc, key) => {
      if (editedData[key].trim() !== userProfile[key]?.trim()) {
        acc[key] = editedData[key];
      }
      return acc;
    }, {});

    // If no changes, do nothing
    if (Object.keys(updatedFields).length === 0) {
      alert("No changes to save.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3302/users/profileupdate/${user_id}`,
        updatedFields,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      alert("Profile updated successfully!");
      window.location.reload(); // Reload page to reflect updates
    } catch (error) {
      if (error.response && error.response.data) {
        // Error from server
        setError(`Failed to update profile: ${error.response.data.message}`);
      } else {
        // Network or other errors
        setError(`Failed to update profile: ${error.message}`);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:3302/users/profile/${user_id}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setUserProfile(data.user);
      } catch (err) {
        setError("Failed to fetch user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user_id]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile_picture", file);

      try {
        const response = await fetch(
          `http://localhost:3302/users/upload/${user_id}`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const data = await response.json();
        setUserProfile((prev) => ({
          ...prev,
          profile_picture: data.profile_picture,
        }));
        setImagePreview(data.profile_picture);
      } catch (error) {
        setError("Failed to upload image");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-8 h-8 border-3 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-sm text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-300">
      {/* Header Bar */}
      <div className="bg-green-500 border-b border-gray-200 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-white font-semibold">PakTravels</div>
            <button className="p-2 text-white hover:text-green-200 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Profile Info */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-green-300">
              {/* Profile Image */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative mb-4">
                  <div className="w-28 h-28 rounded-full border-4 border-green-100 bg-green-200 flex items-center justify-center overflow-hidden">
                    {userProfile?.profile_picture ? (
                      <img
                        src={`http://localhost:3302${
                          userProfile.profile_picture
                        }?t=${new Date().getTime()}`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-5xl text-green-700 font-medium">
                        {userProfile?.name?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 p-1.5 bg-green-600 rounded-full cursor-pointer hover:bg-green-700 transition-colors border-2 border-white">
                    <Camera className="w-4 h-4 text-white" />
                    <input
                      type="file"
                      required
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    <h1 className="text-xl font-semibold text-gray-900">
                      {isEditing.name ? (
                        <input
                          type="text"
                          required
                          name="name"
                          value={editedData.name || userProfile.name}
                          onChange={handleInputChange}
                          className="border-none"
                        />
                      ) : (
                        <span>
                          {editedData.name.trim() || userProfile?.name}
                        </span>
                      )}
                    </h1>
                    <button
                      onClick={() =>
                        setIsEditing((prev) => ({
                          ...prev,
                          name: !prev.name,
                        }))
                      }
                    >
                      <Edit className="w-4 h-4 text-gray-400 ml-4 hover:text-green-500 focus:text-green-500 active:text-green-500 transition-colors duration-200" />
                    </button>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium">
                    {userProfile?.role || "Tourist"}
                  </span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                  <Activity className="w-5 h-5 text-green-500 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Member Status</div>
                    <div className="font-medium text-gray-900">Active</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                  <Calendar className="w-5 h-5 text-green-500 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Member Since</div>
                    <div className="font-medium text-gray-900">
                      {new Date(userProfile.created_at).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                  <Award className="w-5 h-5 text-green-500 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Tours Completed</div>
                    <div className="font-medium text-gray-900">12 Tours</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact & Additional Info */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-green-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Contact Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="flex items-center p-4 bg-green-50 rounded-xl">
                  <Mail className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium text-gray-900 truncate">
                      {isEditing.email ? (
                        <div>
                          <input
                            type="email"
                            name="email"
                            value={editedData.email || ""}
                            onChange={handleInputChange}
                            className="border-none"
                            placeholder="Enter a valid email"
                          />
                          {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                            editedData.email
                          ) &&
                            editedData.email && (
                              <p className="text-red-500 text-sm">
                                Please enter a valid email address.
                              </p>
                            )}
                        </div>
                      ) : (
                        <span>
                          {editedData.email.trim() || userProfile?.email}
                        </span>
                      )}

                      <button
                        onClick={() =>
                          setIsEditing((prev) => ({
                            ...prev,
                            email: !prev.email,
                          }))
                        }
                      >
                        <Edit className="w-4 h-4 text-gray-400 ml-4 hover:text-green-500 focus:text-green-500 active:text-green-500 transition-colors duration-200" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Contact Number */}
                <div className="flex items-center p-4 bg-green-50 rounded-xl">
                  <Phone className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="font-medium text-gray-900">
                      {isEditing.contact_number ? (
                        <input
                          type="text"
                          name="contact_number"
                          value={editedData.contact_number || ""}
                          onChange={handleInputChange}
                          className="border-none"
                        />
                      ) : (
                        <span>
                          {editedData.contact_number.trim() ||
                            userProfile?.contact_number ||
                            "Not provided"}
                        </span>
                      )}
                      <button
                        onClick={() =>
                          setIsEditing((prev) => ({
                            ...prev,
                            contact_number: !prev.contact_number,
                          }))
                        }
                      >
                        <Edit className="w-4 h-4 text-gray-400 ml-4 hover:text-green-500 focus:text-green-500 active:text-green-500 transition-colors duration-200" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Address */}
                {userProfile.role ===
                  "agency"?(
                    <div className="flex items-center p-4 bg-green-50 rounded-xl">
                      <MapPin className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm text-gray-500">Address</div>
                        <div className="font-medium text-gray-900 truncate">
                          {isEditing.address ? (
                            <input
                              type="text"
                              name="address"
                              value={editedData.address || ""}
                              onChange={handleInputChange}
                              className="border-none"
                            />
                          ) : (
                            <span>
                              {editedData.address.trim() ||
                                userProfile?.address ||
                                ""}
                            </span>
                          )}
                          <button
                            onClick={() =>
                              setIsEditing((prev) => ({
                                ...prev,
                                address: !prev.address,
                              }))
                            }
                          >
                            <Edit className="w-4 h-4 text-gray-400 ml-4 hover:text-green-500 focus:text-green-500 active:text-green-500 transition-colors duration-200" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ):null}
              </div>
            </div>
            {/* About Section */}
            {userProfile?.role === "agency" ? (
              <div className="bg-white rounded-2xl p-6 shadow-md border border-green-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  About Me
                </h2>
                <div>
                  {isEditing.description ? (
                    <textarea
                      name="description"
                      value={editedData.description || ""}
                      onChange={handleInputChange}
                      className="border w-full rounded-md p-2"
                    />
                  ) : (
                    <p>
                      {editedData.description.trim() ||
                        userProfile?.description ||
                        "No description yet!"}
                    </p>
                  )}
                  <button
                    onClick={() =>
                      setIsEditing((prev) => ({
                        ...prev,
                        description: !prev.description,
                      }))
                    }
                  >
                    <Edit className="w-4 h-4 text-gray-400 ml-4 hover:text-green-500 focus:text-green-500 active:text-green-500 transition-colors duration-200" />
                  </button>
                </div>
              </div>
            ) : null}
            {(editedData.name !== "" ||
              editedData.address !== "" ||
              editedData.description !== "" ||
              editedData.email !== "" ||
              editedData.contact_number !== "") && (
              <div className="flex justify-end">
                <button
                  onClick={handleSaveChanges}
                  className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg transition-all duration-300 ease-in-out"
                >
                  Save changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
