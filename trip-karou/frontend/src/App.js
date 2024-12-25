import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Signup from "./pages/signup";
import Contact from "./pages/Contact";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import { Navigate } from "react-router-dom";
import Booking from "./pages/booking/Booking";
import { MyContext } from "./ContextApi/AppContext";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import TripsView from "./components/AdminDashboard/Trips/TripsView";
import Profile from "./components/Profile/Profile";
import Packages from "./components/Packages";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check if token exists
  console.log(token);
  return token ? children : <Navigate to="/Login" />;
};
const checkUserID = () => {
  const user_id = localStorage.getItem("userId"); // Check if token exists
  console.log(user_id);
  if (user_id) {
    return user_id;
  } else {
    return false;
  }
};
const checktoken = () => {
  const token = localStorage.getItem("token"); // Check if token exists
  if (token) {
    return true;
  } else {
    return false;
  }
};
const AdminDashboard1 = () => {
  const cat = localStorage.getItem("myCat");

  if (cat === "AdminDashboard") {
    return "agency";
  }

  return null; // Optional: specify a return value if the condition is not met
};

function App() {
  const [name, setName] = useState("Murtaza");
  const [searchResults, setSearchResults] = useState(() => {
    const savedResults = localStorage.getItem("searchResults");
    return savedResults ? JSON.parse(savedResults) : null;
  });
  const [signin, setsignin] = useState(checktoken);
  const [userrole, setuserrole] = useState(
    localStorage.getItem("userrole") || null
  );
  const [user_id, setuser_id] = useState(checkUserID);

  return (
    <Router>
      <div>
        <MyContext.Provider
          value={{
            searchResults,
            setSearchResults,
            signin,
            setsignin,
            userrole,
            setuserrole,
            user_id,
            setuser_id,
          }}
        >
          <Navbar />
          <Routes>
            <Route
              path="/AdminDashboard/Trips/TripsView"
              element={
                <ProtectedRoute> 
                  <TripsView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/AdminDashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking/:trip_id" element={<Booking />}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile></Profile>
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/packages" element={<Packages />} />
          </Routes>
        </MyContext.Provider>
      </div>
    </Router>
  );
}

export default App;
