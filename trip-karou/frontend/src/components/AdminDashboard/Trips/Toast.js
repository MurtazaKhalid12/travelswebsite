import React from "react";
import { useEffect, useState } from "react";
import {
  Calendar,
  Users,
  DollarSign,
  X,
  MapPin,
  Check,
  AlertCircle,
  Upload as UploadIcon,
  Image as ImageIcon,
  Camera,
  Trash2,
} from "lucide-react";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div
        className={`${
          type === "success" ? "bg-green-500" : "bg-red-500"
        } text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3`}
      >
        {type === "success" ? (
          <Check className="w-5 h-5" />
        ) : (
          <AlertCircle className="w-5 h-5" />
        )}
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};
export default Toast;

// EditableField Component
