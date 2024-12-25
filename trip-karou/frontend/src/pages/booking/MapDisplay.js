
const MapDisplay = ({ mapImage }) => {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md mt-8">
        <h2 className="text-2xl font-semibold mb-4">Trip Route Map</h2>
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
          <img
            src={mapImage}
            alt="Trip Route Map"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  };
  export default MapDisplay