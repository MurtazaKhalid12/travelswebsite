import React from "react";
import "./AboutUs.css"; // Make sure to create this CSS file for custom styling.
import atif from "../assets/About Us/atif.jfif"
import murtaza from "../assets/About Us/murtaza.jpeg"
import logo from "../assets/About Us/download.png"
const About = () => {
  return (
    <div>
      {/* About Us Header */}
      <section className="about-header">
        <h1>About Tripkro</h1>
        <p>Your trusted partner for exploring Pakistan, connecting tourists with top agencies to deliver the ultimate travel experience.</p>
      </section>

      {/* About Us Content */}
      <div className="container content-section">
        {/* Our Vision */}
        <div className="vision">
          <h2 className="section-title">Our Vision</h2>
          <p>To revolutionize tourism in Pakistan by bridging the gap between tourists and local travel agencies, ensuring safe, convenient, and memorable adventures.</p>
        </div>

        {/* Our Goals */}
        <div className="goals">
          <h2 className="section-title">Our Goals</h2>
          <ul>
            <li>Provide a digital platform for reliable, authentic travel experiences.</li>
            <li>Promote tourism across lesser-known destinations in Pakistan.</li>
            <li>Ensure user safety with verified agencies and real-time location tracking.</li>
            <li>Facilitate hassle-free booking and secure payment solutions.</li>
            <li>Foster a community-driven platform where tourists can share reviews and feedback.</li>
          </ul>
        </div>

        {/* Founders Section */}
        <div className="founders">
          <h2 className="section-title">Meet Our Founders</h2>
          <div className="row mt-4">
            {/* Founder 1 */}
            <div className="col-lg-3 col-md-4 mb-4 ">
              <div className="founder-card">
                <img src={atif} alt="Atif Khan" />
                <h5>Atif Khan</h5>
                <p>Co-Founder & CEO</p>
                <p>Atif is passionate about transforming Pakistan's tourism sector through digital innovation, with over 10 years of experience traveling across Pakistan.</p>
              </div>
            </div>
            
            {/* Founder 2 */}
            <div className="col-lg-3 col-md-4 mb-4">
              <div className="founder-card">
                <img src={murtaza} alt="Murtaza Khalid" />
                <h5>Murtaza Khalid</h5>
                <p>Co-Founder & CEO</p>
                <p>Murtaza ensures Tripkro operates smoothly, dedicated to building partnerships with local agencies and fostering community trust.</p>
              </div>
            </div>

            {/* Founder 3 */}
            <div className="col-lg-3 col-md-4 mb-4">
              <div className="founder-card">
                <img src={logo} alt="ChatGPT" />
                <h5>ChatGPT</h5>
                <p>Co-Founder & DA</p>
                <p>ChatGPT helps Atif and Murtaza develop the service with ease, crafting Tripkro's robust platform to provide a seamless user experience and secure transactions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;