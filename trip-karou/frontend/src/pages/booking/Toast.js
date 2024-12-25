import React, { useState } from "react";

const Toast = ({ message, type, onClose }) => {
    React.useEffect(() => {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }, [onClose]);
  
    const styles = {
      success: "bg-green-100 text-green-800 border-green-300",
      error: "bg-red-100 text-red-800 border-red-300",
      info: "bg-blue-100 text-blue-800 border-blue-300",
    };
  
    return (
      <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg border ${styles[type]} max-w-md animate-fade-in`}>
        <div className="font-semibold mb-1">{type.charAt(0).toUpperCase() + type.slice(1)}</div>
        <div className="text-sm">{message}</div>
      </div>
    );
  };
  export default Toast;