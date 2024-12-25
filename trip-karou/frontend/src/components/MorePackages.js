import React from "react";
import "./Packages.css";
import soloImg1 from "../assets/Pictures/Cards/card7.jpg";
import soloImg2 from "../assets/Pictures/Cards/card8.jpg";
import soloImg3 from "../assets/Pictures/Cards/card9.jpg";
import coupleImg1 from "../assets/Pictures/Cards/card10.jpg";
import coupleImg2 from "../assets/Pictures/Cards/card11.jpg";
import coupleImg3 from "../assets/Pictures/Cards/card12.jpg";
import background from "../assets/Pictures/Carousel/3c.avif"; // background image for packages section

const MorePackages = () => {
  const soloPackages = [
    {
      title: "3 DAYS TREKKING TRIP TO SPINKHOR LAKE KALAM",
      price: "Rs22,000",
      img: soloImg1,
    },
    {
      title: "TRIP TO HUNZA VALLEY & KHUNJRAB PASS",
      price: "Rs18,000",
      img: soloImg2,
    },
    {
      title: "SOLO TRIP TO SWAT, KALAM & MAHODAND LAKE",
      price: "Rs33,000",
      img: soloImg3,
    },
  ];

  const couplePackages = [
    {
      title: "3 DAYS HONEYMOON TOUR TO SHOGRAN VALLEY",
      price: "Rs82,000",
      img: coupleImg1,
    },
    {
      title: "3 DAYS HONEYMOON TOUR TO SWAT, KALAM",
      price: "Rs65,000",
      img: coupleImg2,
    },
    {
      title: "8 DAYS TOUR TO SKARDU, SHANGRILA, KHAPLU AND SHIGAR VALLEY",
      price: "Rs142,000",
      img: coupleImg3,
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
      {/* Solo Packages Section */}
      <div className="container-fluid p-0">
        <div className="container position-relative py-3">
          <h2
            className="text-white text-start mb-4"
            style={{ marginTop: "50px", fontWeight: 400 }}
          >
            Solo Packages
          </h2>
        </div>
      </div>
      <div className="container-fluid p-0">
        <div className="container position-relative py-3">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {soloPackages.map((pkg, index) => (
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
                          className="text-primary"
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

      {/* Couple Packages Section */}
      <div className="container-fluid p-0">
        <div className="container position-relative py-3">
          <h2
            className="text-white text-start mb-4"
            style={{ marginTop: "50px", fontWeight: 400 }}
          >
            Couple Packages
          </h2>
        </div>
      </div>
      <div className="container-fluid p-0">
        <div className="container position-relative py-3">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {couplePackages.map((pkg, index) => (
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
                          className="text-primary"
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

export default MorePackages;
