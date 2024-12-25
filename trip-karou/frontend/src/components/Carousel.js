import React from "react";
import img1 from "../assets/Pictures/Carousel/1c.avif";
import img2 from "../assets/Pictures/Carousel/2c.avif";
import img3 from "../assets/Pictures/Carousel/3c.avif";
import appStore from "../assets/Pictures/Apps/Apple.png";
import googlePlay from "../assets/Pictures/Apps/Google.png";

const Carousel = () => {
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide position-relative"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {/* First carousel item */}
        <div className="carousel-item active" data-bs-interval="2500">
          <img
            src={img1}
            className="d-block w-100"
            alt="First slide"
            style={{
              filter: "brightness(50%)",
              objectFit: "cover",
              height: "620px",
            }}
          />
        </div>

        {/* Second carousel item */}
        <div className="carousel-item" data-bs-interval="2500">
          <img
            src={img2}
            className="d-block w-100"
            alt="Second slide"
            style={{
              filter: "brightness(50%)",
              objectFit: "cover",
              height: "620px",
            }}
          />
        </div>

        {/* Third carousel item */}
        <div className="carousel-item" data-bs-interval="2500">
          <img
            src={img3}
            className="d-block w-100"
            alt="Third slide"
            style={{
              filter: "brightness(50%)",
              objectFit: "cover",
              height: "620px",
            }}
          />
        </div>
      </div>

      {/* Previous button */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      {/* Next button */}
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>

      {/* Carousel overlay text */}
      <div
        className="position-absolute start-50 translate-middle text-center w-100"
        style={{ top: "60%" }}
      >
        <h1
          className="text-white mb-3"
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 700,
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          Discover Pakistan's Beauty
        </h1>
        <p
          className="text-white mb-4 px-3"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            fontWeight: 400,
            textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          Embark on an unforgettable journey through Pakistan's majestic
          landscapes and vibrant cultural tapestry
        </p>
        <div className="d-flex justify-content-center mt-5">
          <p href="#" className="me-3">
            <img
              src={appStore}
              alt="Download on App Store"
              style={{
                height: "60px",
                transition: "transform 0.3s ease-in-out",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            />
          </p>
          <p href="#">
            <img
              src={googlePlay}
              alt="Get it on Google Play"
              style={{
                height: "60px",
                transition: "transform 0.3s ease-in-out",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
