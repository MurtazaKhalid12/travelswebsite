import React, { useState } from "react";
import {
  Bell,
  Search,
  Home,
  Settings,
  Briefcase,
  FileText,
  CreditCard,
  CheckSquare,
  BarChart2,
  ChevronDown,
} from "lucide-react";
import { MapPin } from "lucide-react";
import Trips from "./Trips/TripsView"
// import Expenses from "./Destinations";
import Home1 from "./Home/Home";
import Destinations from './Destinations/Destinations'

const Dashboard = () => {
  const [currentView, setCurrentView] = useState("Home");

  // Component mapping object
  const componentMap = {
    Home: <Home1 />,
    Destinations: <Destinations />,
    Trips: <Trips />,
   
    Reports: <div>Reports Component</div>,
    Advances: <div>Advances Component</div>,
    Cards: <div>Cards Component</div>,
    Approvals: <div>Approvals Component</div>,
    Analytics: <div>Analytics Component</div>,
    "My Settings": <div>Settings Component</div>,
  };

  const sidebarItems = [
    { icon: Home, label: "Home" },
    { icon: MapPin, label: "Destinations" },
    { icon: Briefcase, label: "Trips" },
    { icon: FileText, label: "Reports" },
    { icon: CreditCard, label: "Advances" },
    { icon: CreditCard, label: "Cards" },
    { icon: CheckSquare, label: "Approvals" },
    { icon: BarChart2, label: "Analytics" },
    { icon: Settings, label: "My Settings" },
  ];

  const handleSidebarClick = (label) => {
    setCurrentView(label);
  };

  // Function to render the current component
  const renderCurrentView = () => {
    return componentMap[currentView] || <div>Component not found</div>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-8">
          <div className="text-purple-600 text-xl font-semibold flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg"></div>
            Expinova
          </div>
          <span className="font-semibold">{currentView}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <Bell className="text-gray-600 cursor-pointer" />
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src="/api/placeholder/32/32"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <span>Jayson</span>
            <ChevronDown size={16} />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white min-h-[calc(100vh-4rem)] p-4 border-r">
          <div className="space-y-1">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">My View</span>
              <ChevronDown size={16} />
            </div>
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSidebarClick(item.label)}
                className={`flex items-center gap-3 w-full p-2 rounded-lg transition-colors ${
                  currentView === item.label
                    ? "bg-green-500 text-white"
                    : "text-gray-600 hover:bg-green-400 hover:text-white"
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-8">
            <button className="flex items-center justify-between w-full p-2 hover:bg-green-500 hover:text-white rounded-lg transition-colors">
              <span className="font-medium">Agency View</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;