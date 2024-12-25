import { useState } from "react";
import { useEffect } from "react";

const EditableField = ({ label, value, type = "text", onChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);
  
    useEffect(() => {
      setCurrentValue(value);
    }, [value]);
  
    const handleChange = (e) => {
      const newValue =
        type === "number" ? parseInt(e.target.value) : e.target.value;
      setCurrentValue(newValue);
      onChange(newValue);
    };
  
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        setIsEditing(false);
      }
    };
  
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <div
          className="relative text-gray-900 border rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50"
          onClick={() => setIsEditing(true)}
        >
          {isEditing ? (
            type === "textarea" ? (
              <textarea
                value={currentValue}
                onChange={handleChange}
                onBlur={() => setIsEditing(false)}
                onKeyPress={handleKeyPress}
                className="w-full min-h-[100px] focus:outline-none"
                autoFocus
              />
            ) : (
              <input
                type={type === "date" ? "date" : type}
                value={
                  type === "date" ? currentValue.split("T")[0] : currentValue
                }
                onChange={handleChange}
                onBlur={() => setIsEditing(false)}
                onKeyPress={handleKeyPress}
                className="w-full focus:outline-none"
                autoFocus
              />
            )
          ) : type === "date" ? (
            new Date(currentValue).toLocaleDateString()
          ) : (
            currentValue
          )}
        </div>
      </div>
    );
  };
  export default EditableField