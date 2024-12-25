import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-6 mb-4 mb-md-0">
            <h5 className="fw-bold text-white">About Pak Travels</h5>
            <p className="text-white">
              Pak Travels is your gateway to exploring the breathtaking beauty
              of Pakistan. We offer curated tours and unforgettable experiences,
              ensuring you discover the rich culture, stunning landscapes, and
              warm hospitality of our country.
            </p>
          </div>
          <div className="col-lg-6 col-md-6 offset-lg-1">
            <div className="row">
              <div className="col-sm-4 col-6 mb-3">
                <h6 className="fw-bold text-white">Quick Links</h6>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="text-white text-decoration-none">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white text-decoration-none">
                      Tours
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white text-decoration-none">
                      About Us
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-sm-4 col-6 mb-3">
                <h6 className="fw-bold text-white">Support</h6>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="text-white text-decoration-none">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white text-decoration-none">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white text-decoration-none">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-sm-4 col-12 mb-3">
                <h6 className="fw-bold text-white">Contact</h6>
                <ul className="list-unstyled">
                  <li className="text-white">Email: info@paktravels.com</li>
                  <li className="text-white">Phone: +92 123 456 7890</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-4 bg-secondary" />
        <div className="row align-items-center">
          <div className="col-md-12 text-center mb-3 mb-md-0">
            <p className="mb-0 text-white">
              &copy; 2024 Pak Travels. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
