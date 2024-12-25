import { useState, useEffect } from 'react';
import { Plus, Calendar, Users, MapPin, DollarSign, Clock, X } from 'lucide-react';
import { MyContext } from '../../../ContextApi/AppContext';
import { useContext } from 'react';
import TripCards from './TripsCard';
const CreateTripModal = ({ isOpen, onClose, onSubmit, user_id,settrip_click }) => {
  const [formData, setFormData] = useState({
    package_name: '',
    price: '',
    start_date: '',
    end_date: '',
    max_people: '',
    description: '',
    destination_id: ''
  });

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      if (!isOpen) return;
      
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3302/trips/destinations?user_id=${user_id}`);
        const data = await response.json();
        console.log('Fetched destinations:', data);
        if (data.success) {
          setDestinations(data.destinations);
        } else {
          setError('Failed to load destinations');
        }
      } catch (err) {
        console.error('Error fetching destinations:', err);
        setError('Error loading destinations. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [isOpen, user_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    settrip_click(true);
    
    console.log('Submitting form data:', formData);

    try {
      const response = await fetch('http://localhost:3302/trips/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          user_id: user_id,
          available_seats: formData.max_people
        })
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (data.success) {
        onSubmit(data.trip);
        onClose();
      } else {
        setError(data.message || 'Failed to create trip');
      }
    } catch (err) {
      console.error('Error creating trip:', err);
      setError('Error creating trip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDestinationChange = (e) => {
    const selectedDestinationId = parseInt(e.target.value, 10);  // Convert to number
    console.log('Selected destination_id:', selectedDestinationId);
    setFormData(prev => ({
      ...prev,
      destination_id: selectedDestinationId
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Create New Trip</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Package Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formData.package_name}
                onChange={(e) => setFormData({...formData, package_name: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rs.)</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formData.start_date}
                onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formData.end_date}
                onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Maximum People</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formData.max_people}
                onChange={(e) => setFormData({...formData, max_people: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
              <select 
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                value={formData.destination_id}
                onChange={handleDestinationChange}
                required
                disabled={loading}
              >
                <option value="">Select Destination</option>
                {destinations.map((dest) => (
                  <option key={dest.destination_id} value={dest.destination_id}>
                    {dest.name} - {dest.province}
                  </option>
                ))}
              </select>
              {loading && (
                <p className="text-sm text-gray-500 mt-1">Loading destinations...</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Trip'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Trips = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trips, setTrips] = useState([]);
  const {user_id} = useContext(MyContext);
  console.log("Current user_id:", user_id);
  const [trip_click,settrip_click] = useState(false);
   const hello = ()=>{
    settrip_click(true);
   }
  const handleCreateTrip = (newTrip) => {
    console.log('New trip created:', newTrip);
    setTrips(prevTrips => [...prevTrips, newTrip]);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Trip Management</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Trip
          </button>
        </div>

        <CreateTripModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateTrip}
          user_id={user_id}
          settrip_click = {settrip_click}
          
          
        />
        <TripCards 
        trip_click = {trip_click}
        user_id={ user_id}
        settrip_click={settrip_click}

        ></TripCards>
      </div>
    </div>
  );
};

export default Trips;