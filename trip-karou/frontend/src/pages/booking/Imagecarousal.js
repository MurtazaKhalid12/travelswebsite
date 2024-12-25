// Image Carousel Component
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(""); // For slide direction

  // Add keyboard event listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        handlePrevSlide();
      } else if (e.key === "ArrowRight") {
        handleNextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNextSlide = () => {
    setDirection("slide-left");
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrevSlide = () => {
    setDirection("slide-right");
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden group">
      {/* Carousel container with animation */}
      <div className="relative h-full w-full">
        <img
          src={images[currentIndex].media_url}
          alt={`Slide ${currentIndex + 1}`}
          className={`absolute w-full h-full object-cover transition-transform duration-500 ease-in-out ${
            direction === "slide-left"
              ? "animate-slideLeft"
              : direction === "slide-right"
              ? "animate-slideRight"
              : ""
          }`}
          onTransitionEnd={() => setDirection("")}
        />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 bg-black/20 px-4 py-2 rounded-full">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 ${
              index === currentIndex
                ? "w-6 h-2 bg-white rounded-full"
                : "w-2 h-2 bg-white/50 rounded-full hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
export default ImageCarousel;
