import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from "./../New folder/logo-2.png";
import { Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import AdminDashboard from "./../components/AdminDashboard/AdminDashboard";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../ContextApi/AppContext";
import { useContext } from "react";

function Login() {
  // State for managing input fields
  const navigate = useNavigate();
  const { setsignin, setuserrole, setuser_id } = useContext(MyContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State for managing errors and loading state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError(""); // Clear previous errors
    setLoading(true); // Start loading state

    try {
      const response = await fetch("http://localhost:3302/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.user.userId);
        localStorage.setItem("userId", data.user.userId);
        setuser_id(data.user.userId);
        setsignin(true);
        // Save JWT token in localStorage
        localStorage.setItem("token", data.token);
        alert("Login successful!");

        if (data.user.role === "tourist") {
          setuserrole("tourist");
          // navigate("/dashboard");
          localStorage.setItem("userrole", "tourist"); // Save to localStorage
        } else if (data.user.role === "agency") {
          setuserrole("agency");
          console.log("Agency logged in");
          navigate("/AdminDashboard");
          localStorage.setItem("userrole", "agency"); // Save to localStorage

        }
        // Redirect to the dashboard
        console.log("Token:", data.token);
        console.log("Token from localStorage:", localStorage.getItem("token"));
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div
      className="bg-blue-100 h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('media/pictures/hero.jpg')",
        backgroundSize: "cover",
      }}
    >
      <div
        className="bg-white bg-opacity-80 rounded-lg shadow-lg  px-10 py-0 w-full max-w-md"
        style={{ marginTop: "35px" }}
      >
        <div className="flex justify-center mb-6">
          <div>
            <img src={logo} style={{ height: "60px" }}></img>
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-8center mb-2">
          Sign in with email
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4 relative">
            <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <a
              className="text-sm text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2"
              href="#"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#10b982] text-white py-2 rounded-lg font-semibold hover:bg-[#13c293] hover:scale-105 transition-all duration-200${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing in..." : "Get Started"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500">Or sign in with</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <div className="flex justify-center space-x-4">
          <button className="bg-white border border-gray-300 rounded-full p-3 w-12 h-12 flex items-center justify-center">
            <i className="fab fa-google text-xl text-gray-600"></i>
          </button>
          <button className="bg-white border border-gray-300 rounded-full p-3 w-12 h-12 flex items-center justify-center">
            <i className="fab fa-facebook-f text-xl text-gray-600"></i>
          </button>
          <button className="bg-white border border-gray-300 rounded-full p-3 w-12 h-12 flex items-center justify-center">
            <i className="fab fa-apple text-xl text-gray-600"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
