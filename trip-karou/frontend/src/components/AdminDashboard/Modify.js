const ModifyPopup = ({ isOpen, onClose }) => {
    if (!isOpen) return null; // Return null if the popup should not be visible
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-80">
          <h2 className="text-xl font-semibold mb-4">Modify</h2>
          {/* Empty content for now */}
          <button
            onClick={onClose}
            className="px-4 py-2 mt-4 bg-red-500 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default ModifyPopup;
  