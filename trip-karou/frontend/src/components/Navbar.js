import React, { useEffect, useState, useContext } from "react";
import { Search, Menu, X, User, Bell, Calendar, Users, DollarSign } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import logo from "./../New folder/logo-2.png"; // Adjust the path as needed
import { MyContext } from "../ContextApi/AppContext";

function ProfileIcon() {
  return (
    <div className="flex items-center">
      <User size={24} color="#4A5568" /> {/* Customize size and color */}
      <span className="ml-2">Profile</span>
    </div>
  );
}

function userrole1(userrole) {
  if (userrole === "tourist") {
    return null;
  } else if (userrole === "agency") {
    return "AdminDashboard";
  }
}

function NotificationBell() {
  const { user_id } = useContext(MyContext);
  const [showNotifications, setShowNotifications] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [newBookingCount, setNewBookingCount] = useState(0);

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
    setNewBookingCount(0); // Reset the counter when notifications are viewed
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`http://localhost:3302/api/bookings/user/${user_id}`);
        const result = await response.json();
        console.log("Fetched bookings:", result.data); // Debug log
        if (Array.isArray(result.data)) {
          setBookings(result.data);
          setNewBookingCount(result.data.length); // Set the counter to the number of new bookings
        } else {
          setBookings([]);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      }
    };

    fetchBookings();
  }, [user_id]);

  return (
    <div className="relative">
      <Bell size={24} color="#4A5568" onClick={handleBellClick} className="cursor-pointer" />
      {newBookingCount > 0 && (
        <span className="absolute top-0 right-0 block h-4 w-4 rounded-full ring-2 ring-white bg-red-400 text-white text-xs flex items-center justify-center">
          {newBookingCount}
        </span>
      )}
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4">
          <h4 className="font-bold mb-2 text-green-500">Latest Bookings</h4>
          <ul className="space-y-2">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <li key={booking.booking_id} className="p-2 border rounded-lg shadow-sm">
                  <div className="flex items-center mb-1">
                    <Calendar size={16} className="mr-2 text-gray-500" />
                    <span className="font-medium text-green-500">Booking Date:</span>
                    <span className="ml-1">{new Date(booking.booking_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <Users size={16} className="mr-2 text-gray-500" />
                    <span className="font-medium text-green-500">Number of People:</span>
                    <span className="ml-1">{booking.number_of_people}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign size={16} className="mr-2 text-gray-500" />
                    <span className="font-medium text-green-500">Total Price:</span>
                    <span className="ml-1">PKR {booking.total_price}</span>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No bookings available</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { signin, userrole } = useContext(MyContext);
  const dashboard = userrole1(userrole);

  const navLinks = [
    { name: "Packages", path: "/packages" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  if (dashboard) {
    navLinks.unshift({ name: "Dashboard", path: `/${dashboard}` });
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        isScrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 no-underline">
          <img src={logo} alt="PakTravels Logo" className="h-8 w-auto no-underline" />
          <span className="text-2xl font-bold text-gray-800 no-underline">PakTravels</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(
            (link) =>
              ((link.name === "Dashboard" && signin) || link.name !== "Dashboard") && (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-emerald-500 no-underline"
                        : "text-gray-700 hover:text-emerald-500 no-underline"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              )
          )}
        </div>

        <div className="hidden md:flex items-center gap-6 no-underline">
          <div>
            <Link to="/profile" className="no-underline">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:text-emerald-500 transition-colors duration-200"
                aria-label="Profile"
              >
                <User size={20} className="text-emerald-500" />
                <span>Profile</span>
              </button>
            </Link>
          </div>

          {userrole === "tourist" && <NotificationBell />}

          <div className="flex items-center gap-3">
            {!signin ? (
              <Link to="/login">
                <button className="px-4 py-2 font-medium text-gray-700 hover:text-emerald-500 transition-colors duration-200">
                  Sign In
                </button>
              </Link>
            ) : (
              <button
                className="px-4 py-2 font-medium text-gray-700 hover:text-emerald-500 transition-colors duration-200"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                Log out
              </button>
            )}
            <Link to="/signup">
              <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium transition transform duration-200 hover:bg-emerald-600 hover:shadow-md active:scale-95">
                Sign Up
              </button>
            </Link>
          </div>
        </div>

        <button
          className="md:hidden text-gray-800 hover:text-emerald-500 transition-colors duration-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 ${
                    isActive ? "text-emerald-500" : "text-gray-700 hover:text-emerald-500"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            <div className="flex flex-col gap-2 mt-4">
              <Link to="/signin">
                <button className="text-gray-700 hover:text-emerald-500 px-4 py-2 font-medium transition-colors duration-200">
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium transition transform duration-200 hover:bg-emerald-600 active:scale-95">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
