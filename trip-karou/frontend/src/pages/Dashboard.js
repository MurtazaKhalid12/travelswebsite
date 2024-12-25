import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Dashboard.css'; // Import the CSS file
import logo from "./../New folder/logo-2.png"
import profile from "./../New folder/t.png"
const ScheduleItem = ({ title, date, image, participants }) => {
  return (
    <div className="schedule-item">
      <div className="schedule-item-image-container">
        <img 
          src={image} 
          alt={title}
          className="schedule-item-image"
        />
      </div>
      <div className="schedule-item-content">
        <div className="schedule-item-details">
          <h4 className="schedule-item-title">{title}</h4>
          <p className="schedule-item-date">{date}</p>
          <div className="schedule-item-participants">
            <i className="fas fa-user-friends participant-icon"></i>
            <span className="participant-count">+{participants}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Schedule = () => {
  const scheduleItems = [
    {
      title: "Crooked Forest",
      date: "16 June - 20 June",
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b",
      participants: 2
    },
    {
      title: "Gioc Waterfall",
      date: "22 June - 26 June",
      image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9",
      participants: 4
    }
  ];

  return (
    <div className="schedule-container">
      <h3 className="schedule-header">My Schedule</h3>
      <div className="schedule-items-container">
        {scheduleItems.map((item, index) => (
          <ScheduleItem 
            key={index}
            {...item}
          />
        ))}
      </div>

      <style jsx>{`
        /* Schedule Container */
        .schedule-container {
          background: white;
          border-radius: 20px;
          padding: 24px;
          width: 100%;
          max-width: 320px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .schedule-header {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 16px;
        }

        .schedule-items-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Schedule Item */
        .schedule-item {
          display: flex;
          align-items: center;
          padding: 8px;
          gap: 12px;
          border-radius: 12px;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .schedule-item:hover {
          background-color: #f9fafb;
        }

        .schedule-item-image-container {
          position: relative;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          overflow: hidden;
        }

        .schedule-item-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .schedule-item-content {
          flex: 1;
        }

        .schedule-item-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .schedule-item-title {
          font-size: 14px;
          font-weight: 500;
          color: #1f2937;
          margin: 0;
        }

        .schedule-item-date {
          font-size: 12px;
          color: #6b7280;
          margin: 0;
        }

        .schedule-item-participants {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .participant-icon {
          font-size: 12px;
          color: #10b981;
        }

        .participant-count {
          font-size: 12px;
          color: #10b981;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .schedule-container {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};


const Calendar = () => {
  // Calendar configuration
  const currentDate = new Date(2021, 5); // June 2021
  const daysInMonth = new Date(2021, 6, 0).getDate();
  const firstDay = new Date(2021, 5, 1).getDay();
  const highlightedDates = [16, 17, 20]; // Days to highlight in green

  // Day names
  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  // Generate calendar days array
  const generateCalendarDays = () => {
    const days = [];
    const totalDays = daysInMonth;

    // Add days
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        day: i,
        isHighlighted: highlightedDates.includes(i),
        isToday: false // Could be dynamic based on current date
      });
    }

    return days;
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-header">June 2021</h2>
      
      {/* Weekday headers */}
      <div className="calendar-weekdays">
        {weekDays.map(day => (
          <div key={day} className="weekday">{day}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="calendar-grid">
        {generateCalendarDays().map(({ day, isHighlighted }) => (
          <div 
            key={day} 
            className={`calendar-day ${isHighlighted ? 'highlighted' : ''}`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};




const Dashboard = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const sidebarLinks = [
    { icon: "home", text: "Dashboard", active: true },
    { icon: "ticket-alt", text: "My Tickets" },
    { icon: "heart", text: "Favorite" },
    { icon: "envelope", text: "Message", notifications: 4 },
    { icon: "exchange-alt", text: "Transaction" },
    { icon: "cog", text: "Settings" }
  ];

  const destinations = [
    {
      name: "Mount Forel",
      location: "Greenland",
      rating: 4.8,
      image: "https://storage.googleapis.com/a1aa/image/boQH23tkUYbYIVLcv1whqXdWKFT8RKd5nze8aifWRwLfk8TnA.jpg"
    },
    {
      name: "Eco Camping",
      location: "Patagonia",
      rating: 4.5,
      image: "https://storage.googleapis.com/a1aa/image/ofiekBKh7CgAgkNS049t4vCb6EBmjXRp3mdS2oeKcnHGl8TnA.jpg"
    },
    {
      name: "Mount Everest",
      location: "Nepal",
      rating: 4.7,
      image: "https://storage.googleapis.com/a1aa/image/x8A1nTHP7Cq0Hph9A9kIBfN29Pm7E5HWjWMypPNDFQRLJfpTA.jpg"
    }
  ];

  return (
    <div className="flex min-h-screen bg-blue-50">
      {/* Sidebar */}
      <div 
        className={`${
          isSidebarCollapsed ? "w-20" : "w-64"
        } bg-white transition-all duration-300 p-6 rounded-r-3xl shadow-lg`}
      >
        <button
          onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center mb-6"
        >
          <i className="fas fa-bars text-gray-600"></i>
        </button>

        <div className="flex items-center mb-8">
          <img style = {{height:'50px', width:'50px'}}src={logo} alt="Logo" className="w-8 h-8" />
          <span className={`ml-2 font-bold text-xl ${isSidebarCollapsed ? "hidden" : "block"}`}>
            TripKaro
          </span>
        </div>

        <nav className="space-y-6">
          {sidebarLinks.map((link, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center ${
                link.active ? "text-green-600 no-underline" : "text-gray-600 no-underline"
              } hover:text-green-600 transition-colors`}
            >
              <i className={`fas fa-${link.icon} ${isSidebarCollapsed ? "text-xl no-underline" : "mr-3 no-underline"}`}></i>
              {!isSidebarCollapsed && (
                <span>{link.text}</span>
              )}
              {link.notifications && !isSidebarCollapsed && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 no-underline">
                  {link.notifications}
                </span>
              )}
            </a>
          ))}
        </nav>

        {!isSidebarCollapsed && (
          <div className="mt-12 bg-green-50 p-4 rounded-xl relative">
            <span className="text-green-600 font-semibold">50% Discount!</span>
            <p className="text-sm text-gray-600 mt-1">
              Get a discount on certain days and don't miss it
            </p>
            <button className="absolute bottom-4 right-4 bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              Hello, Jeremy! <span className="wave">👋</span>
            </h1>
            <p className="text-gray-600 mt-1">Welcome back and explore the world.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Destination..."
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
            
            <div className="relative">
              <i className="fas fa-bell text-gray-400 text-xl"></i>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
            
            <div className="flex items-center gap-3">
              <img

              style={{width:"50px", height:"50px"}}
                src={profile}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">Jeremy Zuck</p>
                <p className="text-sm text-gray-500">Traveler Enthusiast</p>
              </div>
            </div>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {destinations.map((dest, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold text-lg">{dest.name}</h3>
              <p className="text-gray-500">{dest.location}</p>
              <div className="flex items-center gap-1 text-yellow-500 mt-2">
                <i className="fas fa-star"></i>
                <span>{dest.rating}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Best Destinations */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              Best Destination <span>🌈</span>
            </h2>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <i className="fas fa-filter text-gray-600"></i>
            </button>
          </div>

          <p className="text-gray-500 mb-4">100 Destinations found</p>
          
          {/* Destinations list */}
          {/* Add your destinations list here */}
        </div>
      
      </div>
      <div style={{marginTop:'40px'}}>
        <Calendar></Calendar>
        <Schedule></Schedule>
        </div>
    </div>
  );
};

export default Dashboard;