import React, { useState } from "react";
import axios from "axios";
import Skardu from "../assets/Pictures/Home/3.webp";
import agency from "../assets/Pictures/Home/2.webp";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact_number: "", // Changed to match API
    role: "",
    description: "",
    address: "",
    website: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
    show: false
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Transform contactNumber to contact_number to match API
      const apiFormData = {
        ...formData,
        contact_number: formData.contact_number
      };

      const response = await axios.post('http://localhost:3302/users/register', apiFormData);

      setStatus({
        type: 'success',
        message: 'Account created successfully! Redirecting to login...',
        show: true
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        contact_number: "",
        role: "",
        description: "",
        address: "",
        website: "",
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.msg || 'Registration failed. Please try again.',
        show: true
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full p-2.5 text-sm bg-white/80 border border-gray-200 rounded-lg " +
    "focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none " +
    "transition-all duration-200 ease-in-out hover:border-green-200";

  const labelClasses = "block text-xs font-semibold text-gray-700 mb-1.5 ml-1";

  // Success/Error Message Component
  const StatusMessage = ({ type, message }) => (
    <div
      className={`mb-4 p-4 rounded-lg text-sm font-medium animate-fade-in flex items-center justify-center
        ${type === 'success' 
          ? 'bg-green-50 text-green-700 border border-green-200' 
          : 'bg-red-50 text-red-700 border border-red-200'
        }`}
    >
      {type === 'success' ? (
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
      ) : (
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
        </svg>
      )}
      {message}
    </div>
  );

  // Get content based on role
  const getRoleContent = () => {
    if (formData.role === "agency") {
      return {
        image: agency,
        title: "Partner with Us",
        description:
          "Join our network of trusted travel agencies and reach thousands of adventure seekers.",
        tagline: "Transform Dreams into Reality",
      };
    }
    return {
      image: Skardu,
      title: "Discover Adventure",
      description:
        "Start your journey with us today and explore the world's most beautiful destinations.",
      tagline: "Adventure Awaits You",
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 my-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full rotate-12 bg-gradient-to-br from-green-100/40 to-emerald-100/40 rounded-full animate-pulse" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-green-200/30 to-transparent rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-200/30 to-transparent rounded-full blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="w-full max-w-6xl mx-auto relative">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Form Section */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-green-800 to-emerald-700 bg-clip-text text-transparent">
                  Create Account
                </h2>
                <p className="text-sm text-gray-600 text-center mt-1">
                  {getRoleContent().description}
                </p>
              </div>

              <div className="p-6">
                {status.show && (
                  <StatusMessage type={status.type} message={status.message} />
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className={labelClasses}>Role*</label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className={`${inputClasses} [&>option]:text-gray-700`}
                        style={{ colorScheme: "normal" }}
                      >
                        <option value="" disabled>
                          Select your role
                        </option>
                        <option value="tourist">Tourist</option>
                        <option value="agency">Agency</option>
                      </select>
                    </div>

                    <div>
                      <label className={labelClasses}>
                        {formData.role === "agency" ? "Agency Name*" : "Name*"}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label className={labelClasses}>Email*</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label className={labelClasses}>Password*</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label className={labelClasses}>Contact Number*</label>
                      <input
                        type="text"
                        name="contact_number"
                        value={formData.contact_number}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                      />
                    </div>

                    {formData.role === "agency" && (
                      <>
                        <div className="col-span-2">
                          <label className={labelClasses}>Description</label>
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="2"
                            className={`${inputClasses} resize-none`}
                          />
                        </div>

                        <div>
                          <label className={labelClasses}>Address</label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className={inputClasses}
                          />
                        </div>

                        <div>
                          <label className={labelClasses}>Website</label>
                          <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            className={inputClasses}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4
                      rounded-lg transition-all duration-300 
                      text-sm font-medium shadow-lg transform
                      focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                      ${loading 
                        ? 'opacity-70 cursor-not-allowed'
                        : 'hover:from-green-700 hover:to-emerald-700 hover:shadow-xl hover:-translate-y-0.5'
                      }`}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </form>

                <p className="text-center mt-6 text-sm text-gray-600">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
                  >
                    Login Here
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2 transform transition-all duration-500 hover:scale-105">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={getRoleContent().image}
                  alt={formData.role === "agency" ? "Travel Agency" : "Skardu"}
                  className="w-full h-[400px] object-cover transform transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-3xl font-bold text-white mb-3">
                      {getRoleContent().title}
                    </h3>
                    <p className="text-lg text-white/90">
                      {getRoleContent().tagline}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;