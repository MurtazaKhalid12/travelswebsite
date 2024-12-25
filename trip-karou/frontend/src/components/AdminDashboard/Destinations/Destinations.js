import React, { useState, useEffect } from "react";
import { MyContext } from "../../../ContextApi/AppContext";
import { useContext } from "react";
import DestinationList from "./DestinationList";

const CreateDestination = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [province, setProvince] = useState("");
  const [message, setMessage] = useState(null);
  const { user_id } = useContext(MyContext);
  const [triggerRefresh, setTriggerRefresh] = useState(false);


  useEffect(() => {
    if (message && message.type === "success") {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const destinationData = { name, description, province, user_id };
    console.log(user_id);
    console.log("fds" + user_id);
    try {
      const response = await fetch(
        "http://localhost:3302/trips/create/destinations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(destinationData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMessage({
          type: "success",
          text: "Destination created successfully!",
        });
        setName("");
        setDescription("");
        setProvince("");
        setTriggerRefresh((prev) => !prev);

      } else {
        setMessage({
          type: "error",
          text: data.error || "Failed to create destination",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="p-6 w-full">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-green-500">
          Create Destination
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Add a new destination to your travel packages
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          {message && (
            <div
              className={`mb-6 p-4 rounded-lg transition-all duration-300 ease-in-out transform ${
                message.type === "success"
                  ? "bg-green-100 text-green-800 border-l-4 border-green-500 shadow-sm"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              <div className="flex items-center">
                {message.type === "success" && (
                  <svg
                    className="w-5 h-5 mr-2 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <p className="font-medium">{message.text}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-200/30 rounded-xl outline-none hover:border-green-400 focus-visible:outline-none focus:border-emerald-400 transition-colors"
                  placeholder="Enter destination name"
                />
              </div>

              {/* Province Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Province
                </label>
                <input
                  type="text"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200/30 rounded-xl outline-none hover:border-green-400 focus-visible:outline-nonefocus:border-emerald-400 transition-colors"
                  placeholder="Enter province name"
                />
              </div>
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border-2 border-gray-200/30 rounded-xl outline-none hover:border-green-400 focus:border-emerald-400 transition-colors"
                placeholder="Enter detailed description of the destination"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Create Destination
              </button>
            </div>
            <div>
              <input type="hidden" name="user_id" value={user_id} />{" "}
              {/* Hidden field */}
            </div>
          </form>
        </div>
      </div>
      <DestinationList triggerRefresh={triggerRefresh} ></DestinationList>
    </div>
  );
};

export default CreateDestination;
