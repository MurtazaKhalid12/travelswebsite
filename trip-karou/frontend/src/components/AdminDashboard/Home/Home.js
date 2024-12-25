import { MoreVertical, Users, Package, Calendar, Banknote, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useState, useEffect } from "react";
import React from "react";
import { useContext } from "react";
import { MyContext } from "../../../ContextApi/AppContext";

const Home1 = () => {
  const [bookingStats, setBookingStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [data, setdata] = useState([]);
  const { user_id } = useContext(MyContext);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await fetch(`http://localhost:3302/api/bookings/getbookingsinformation/${user_id}`);
        const data = await response.json();
        setdata(data.Tours[0].Total_Tours);
        
        const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const recent24HourBookings = data.RecentBookings.filter(booking => 
          new Date(booking.booking_date) > last24Hours
        );
        
        setBookingStats(data.data[0]);
        setRecentBookings(recent24HourBookings);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };

    fetchBookingData();
  }, [user_id]);

  const formatCurrency = (value) => {
    if (!value) return "Rs. 0.00";
    const number = parseFloat(value);
    return `Rs. ${number.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const bookingDate = new Date(date);
    const diffInHours = Math.floor((now - bookingDate) / (1000 * 60 * 60));
    
    if (diffInHours === 0) {
      const diffInMinutes = Math.floor((now - bookingDate) / (1000 * 60));
      return `${diffInMinutes} minutes ago`;
    }
    return `${diffInHours} hours ago`;
  };

  const metricCards = [
    {
      id: 1,
      title: "Total\nBookings",
      value: bookingStats?.Total_bookings || 0,
      icon: Users,
      trend: "+14%",
      trendUp: true,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      valueColor: "text-purple-700",
      type: "number"
    },
    {
      id: 2,
      title: "Number of\nPeople",
      value: bookingStats?.number_of_people || 0,
      icon: Users,
      trend: "+7.4%",
      trendUp: true,
      bgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
      valueColor: "text-cyan-700",
      type: "number"
    },
    {
      id: 3,
      title: "Number of\nTour",
      value: data || 0,
      icon: Package,
      trend: "+4.2%",
      trendUp: true,
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
      valueColor: "text-emerald-700",
      type: "number"
    },
    {
      id: 4,
      title: "Total Revenue\nTours",
      value: bookingStats?.Total_revenue_Tours || 0,
      icon: Banknote,
      trend: "-2.4%",
      trendUp: false,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      valueColor: "text-blue-700",
      type: "currency"
    }
  ];

  const MetricCard = ({ title, value, icon: Icon, trend, trendUp, bgColor, iconColor, valueColor, type }) => {
    const displayValue = type === 'currency' ? formatCurrency(value) : value.toString().padStart(2, '0');
    
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-3 items-start">
              <div className={`${bgColor} p-2.5 rounded-xl`}>
                <Icon className={iconColor} size={24} />
              </div>
              <div className="space-y-1">
                <span className="text-gray-600 font-medium whitespace-pre-line leading-tight">
                  {title}
                </span>
                <div className={`flex items-center ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
                  {trendUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  <span className="text-sm font-medium">{trend}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pl-1">
            {type === 'currency' ? (
              <div className="space-y-0.5">
                <span className={`text-lg font-bold ${valueColor}`}>Rs.</span>
                <p className={`text-3xl font-bold tracking-tight ${valueColor}`}>
                  {parseFloat(value).toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </p>
              </div>
            ) : (
              <p className={`text-4xl font-bold tracking-tight ${valueColor}`}>
                {displayValue}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's your booking activity from the last 24 hours.</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricCards.map((metric) => (
            <MetricCard key={metric.id} {...metric} />
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 flex justify-between items-center border-b border-gray-100">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Recent Bookings</h2>
              <p className="text-sm text-gray-500 mt-1">Bookings from the last 24 hours</p>
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-xl">
              <span className="text-sm font-medium text-blue-600">
                {recentBookings.length} new bookings
              </span>
            </div>
          </div>

          <div className="p-6">
            {recentBookings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr>
                      <th className="text-left font-medium text-gray-500 pb-4 pl-4">Package Name</th>
                      <th className="text-left font-medium text-gray-500 pb-4">Number of People</th>
                      <th className="text-left font-medium text-gray-500 pb-4">Name</th>
                      <th className="text-left font-medium text-gray-500 pb-4 pr-4">Booked</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking, index) => (
                      <tr 
                        key={index} 
                        className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 pl-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
                              <Package className="text-gray-500" size={20} />
                            </div>
                            <span className="font-medium text-gray-800">{booking.package_name}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                            {booking.number_of_people} People
                          </span>
                        </td>
                        <td className="py-4 text-gray-800 font-medium">{booking.name}</td>
                        <td className="py-4 pr-4 text-gray-600">{formatTimeAgo(booking.booking_date)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-3 text-sm font-medium text-gray-900">No Recent Bookings</h3>
                <p className="mt-2 text-sm text-gray-500">No bookings have been made in the last 24 hours.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home1;