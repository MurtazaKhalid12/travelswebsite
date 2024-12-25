import React from "react";
import "./Packages.css";
import Img1 from "../assets/Pictures/Cards/card1.jpg";
import Img2 from "../assets/Pictures/Cards/card2.jpg";
import Img3 from "../assets/Pictures/Cards/card3.jpg";
import Img4 from "../assets/Pictures/Cards/card4.avif";
import Img5 from "../assets/Pictures/Cards/card5.avif";
import Img6 from "../assets/Pictures/Cards/card6.jpg";
import background from "../assets/Pictures/Carousel/2c.avif"; // background image for packages section

const Packages = () => {
  const popularPackages = [
    {
      title: "AUTUMN TOUR TO SKARDU, DEOSAI PLAINS & KHAPLU",
      price: "Rs30,000",
      img: Img1, // Use imported image
    },
    {
      title: "5 DAYS TRIP TO FAIRY MEADOWS AND NANGA PARBAT BASE CAMP",
      price: "Rs52,000",
      img: Img2, // Use imported image
    },
    {
      title: "5 DAYS TRIP TO HUNZA VALLEY & KHUNJRAB PASS",
      price: "Rs44,000",
      img: Img3, // Use imported image
    },
  ];

  const familyPackages = [
    {
      title: "7 DAYS FAMILY TRIP TO NARAN, HUNZA, NALTAR AND KHUNJERAB PASS",
      price: "Rs154,000",
      img: Img4, // Use imported image
    },
    {
      title: "4 DAYS TRIP TO KUMRAT VALLEY AND KATORA LAKE",
      price: "Rs92,000",
      img: Img5, // Use imported image
    },
    {
      title:
        "8 DAYS FAMILY TRIP TO SKARDU, DEOSAI PLAINS, SHIGAR VALLEY, AND SHANGRILA LAKE",
      price: "Rs177,000",
      img: Img6, // Use imported image
    },
  ];

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "auto",
        paddingBottom: "50px",
      }}
    >
      {/* Popular Packages Section */}
      <div className="container-fluid p-0">
        <div className="container position-relative py-3">
          <h2
            className="text-white text-start mb-4"
            style={{ marginTop: "50px", fontWeight: 400 }}
          >
            Popular Packages
          </h2>
        </div>
      </div>
      <div className="container-fluid p-0">
        <div className="container position-relative py-3">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {popularPackages.map((pkg, index) => (
              <div className="col" key={index}>
                <div
                  className="card h-100 shadow-sm mx-auto"
                  style={{
                    borderRadius: 0,
                    overflow: "hidden",
                    transition: "transform 0.3s ease",
                    width: "100%",
                    minHeight: "420px",
                    border: "none",
                  }}
                >
                  <div
                    style={{
                      height: "230px",
                      overflow: "hidden",
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    <img
                      src={pkg.img}
                      className="card-img-top"
                      alt={pkg.title}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                  <div className="card-body p-3 d-flex flex-column">
                    <div
                      className="d-flex justify-content-between align-items-start flex-grow-1"
                      style={{ marginTop: "15px" }}
                    >
                      <div style={{ flex: 1, maxWidth: "60%" }}>
                        <h6 className="card-title fw-bold text-start mb-2">
                          <strong className="text-green-500">{pkg.title}</strong>
                        </h6>
                      </div>
                      <div className="text-end" style={{ flex: "0 0 auto" }}>
                        <span
                          className="text-green-500"
                          style={{ fontSize: "1.1rem", fontWeight: 800 }}
                        >
                          {pkg.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Family Packages Section */}
      <div className="container-fluid p-0">
        <div className="container position-relative py-3">
          <h2
            className="text-white text-start mb-4"
            style={{ marginTop: "50px", fontWeight: 400 }}
          >
            Family Packages
          </h2>
        </div>
      </div>
      <div className="container-fluid p-0">
        <div className="container position-relative py-3">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {familyPackages.map((pkg, index) => (
              <div className="col" key={index}>
                <div
                  className="card h-100 shadow-sm mx-auto"
                  style={{
                    borderRadius: 0,
                    overflow: "hidden",
                    transition: "transform 0.3s ease",
                    width: "100%",
                    minHeight: "420px",
                    border: "none",
                  }}
                >
                  <div
                    style={{
                      height: "230px",
                      overflow: "hidden",
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    <img
                      src={pkg.img}
                      className="card-img-top"
                      alt={pkg.title}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                  <div className="card-body p-3 d-flex flex-column">
                    <div
                      className="d-flex justify-content-between align-items-start flex-grow-1"
                      style={{ marginTop: "15px" }}
                    >
                      <div style={{ flex: 1, maxWidth: "60%" }}>
                        <h6 className="card-title fw-bold text-start mb-2">
                          <strong>{pkg.title}</strong>
                        </h6>
                      </div>
                      <div className="text-end" style={{ flex: "0 0 auto" }}>
                        <span
                          className="text-green-500"
                          style={{ fontSize: "1.1rem", fontWeight: 800 }}
                        >
                          {pkg.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
