import { useState, useEffect } from "react";
import { Camera, AlertCircle, CheckCircle, Lock } from "lucide-react";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-4 right-4 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} 
      text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-up z-50`}>
      {type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
      <span>{message}</span>
    </div>
  );
};

const MediaUpload = ({
  label,
  onUpload,
  trip_id,
  media_order,
  initialData,
  isRequired = false
}) => {
  // States for component
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadComplete, setUploadComplete] = useState(false);
  
  // States for media details
  const [mediaDetails, setMediaDetails] = useState({
    alt_text: "",
    description: "",
    media_type: "image",
  });

  // Handle initial data if provided
  useEffect(() => {
    if (initialData) {
      setMediaDetails({
        alt_text: initialData.alt_text || "",
        description: initialData.description || "",
        media_type: initialData.media_type || "image",
      });
      setPreviewUrl(initialData.url);
      setUploadComplete(true);
    }
  }, [initialData]);

  const validateFields = () => {
    if (!mediaDetails.alt_text.trim()) {
      setError("Alt text is required");
      return false;
    }
    if (!mediaDetails.description.trim()) {
      setError("Description is required");
      return false;
    }
    return true;
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!uploadComplete) {
      setDragActive(e.type === "dragenter" || e.type === "dragover");
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (uploadComplete) return;

    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      await handleFileUpload(file);
    } else {
      setToast({
        show: true,
        message: "Please upload an image file",
        type: "error"
      });
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      await handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file) => {
    if (!validateFields()) return;

    setUploading(true);
    setError(null);

    try {
      // Show immediate preview
      const tempPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(tempPreviewUrl);

      // Prepare form data
      const formData = new FormData();
      formData.append("media", file);
      formData.append("trip_id", trip_id);
      formData.append("media_order", media_order);
      formData.append("alt_text", mediaDetails.alt_text);
      formData.append("description", mediaDetails.description);
      formData.append("media_type", mediaDetails.media_type);

      // Upload to server
      const response = await fetch("http://localhost:3302/api/media/upload", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      // Update preview with actual URL
      setPreviewUrl(data.media_url);
      setUploadComplete(true);

      // Notify parent component
      onUpload({
        url: data.media_url,
        alt_text: mediaDetails.alt_text,
        description: mediaDetails.description,
        media_type: mediaDetails.media_type,
        media_order,
        media_id: data.media_id
      });

      setToast({
        show: true,
        message: "Upload successful",
        type: "success"
      });

    } catch (err) {
      setError(err.message || "Upload failed");
      setToast({
        show: true,
        message: "Failed to upload image",
        type: "error"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full space-y-4 bg-white p-6 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 gap-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <label className="block text-lg font-medium text-gray-900">
              {label} {isRequired && <span className="text-red-500">*</span>}
            </label>
            {uploadComplete && (
              <span className="text-sm text-green-500 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Upload Complete
              </span>
            )}
          </div>
        </div>

        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-4 transition-colors
            ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
            ${uploading ? "opacity-50" : ""}
            ${uploadComplete ? "border-green-500" : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id={`file-${media_order}`}
            className="hidden"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading || uploadComplete}
          />

          {previewUrl ? (
            <div className="relative group">
              <img
                src={previewUrl}
                alt={mediaDetails.alt_text}
                className="w-full h-48 object-cover rounded-lg"
              />
              {!uploadComplete && (
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                  <label
                    htmlFor={`file-${media_order}`}
                    className="px-4 py-2 bg-white text-gray-700 rounded-lg cursor-pointer"
                  >
                    Replace Image
                  </label>
                </div>
              )}
            </div>
          ) : (
            <label
              htmlFor={`file-${media_order}`}
              className="block w-full h-48 cursor-pointer"
            >
              <div className="h-full flex flex-col items-center justify-center">
                <Camera className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  {uploading ? "Uploading..." : "Drop image here or click to upload"}
                </p>
              </div>
            </label>
          )}
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alt Text *
            </label>
            <input
              type="text"
              value={mediaDetails.alt_text}
              onChange={(e) => setMediaDetails(prev => ({ ...prev, alt_text: e.target.value }))}
              disabled={uploadComplete}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500
                ${uploadComplete ? 'bg-gray-50' : ''}`}
              placeholder="Describe the image for accessibility"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              value={mediaDetails.description}
              onChange={(e) => setMediaDetails(prev => ({ ...prev, description: e.target.value }))}
              disabled={uploadComplete}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500
                ${uploadComplete ? 'bg-gray-50' : ''}`}
              rows="3"
              placeholder="Describe the content of this image"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(prev => ({ ...prev, show: false }))}
        />
      )}
    </div>
  );
};

export default MediaUpload;