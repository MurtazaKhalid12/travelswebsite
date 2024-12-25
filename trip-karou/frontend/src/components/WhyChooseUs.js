import React from "react";

const WhyChooseUs = () => {
  // Array of features
  const features = [
    {
      icon: "bi-globe",
      title: "Expert Local Guides",
      description:
        "Our knowledgeable guides provide authentic insights into Pakistan's culture and history, ensuring an immersive experience.",
    },
    {
      icon: "bi-shield-check",
      title: "Safety First",
      description:
        "We prioritize your security with comprehensive safety measures throughout your journey, giving you peace of mind.",
    },
    {
      icon: "bi-heart",
      title: "Unforgettable Experiences",
      description:
        "Create lasting memories with our carefully curated and unique travel experiences that showcase the best of Pakistan.",
    },
    {
      icon: "bi-cash-coin",
      title: "Value for Money",
      description:
        "Enjoy competitive prices without compromising on quality, ensuring you get the most out of your travel budget.",
    },
    {
      icon: "bi-calendar-check",
      title: "Flexible Itineraries",
      description:
        "Customize your trip with our flexible booking options to suit your preferences and schedule.",
    },
    {
      icon: "bi-people",
      title: "Small Group Tours",
      description:
        "Enjoy intimate group sizes for a more personalized and engaging travel experience.",
    },
    {
      icon: "bi-house-heart",
      title: "Authentic Accommodations",
      description:
        "Stay in carefully selected accommodations that reflect local culture and hospitality.",
    },
    {
      icon: "bi-headset",
      title: "24/7 Support",
      description:
        "Our dedicated support team is available round the clock to assist you throughout your journey.",
    },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5">Why Choose Pak Travels</h2>

        <div className="row g-4">
          {features.slice(0, 3).map((feature, index) => (
            <div className="col-md-4" key={index}>
              <div className="text-center">
                <i
                  className={`bi ${feature.icon} text-primary mb-3`}
                  style={{ fontSize: "2.5rem" }}
                ></i>
                <h5>{feature.title}</h5>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4 mt-4">
          {features.slice(3, 6).map((feature, index) => (
            <div className="col-md-4" key={index}>
              <div className="text-center">
                <i
                  className={`bi ${feature.icon} text-primary mb-3`}
                  style={{ fontSize: "2.5rem" }}
                ></i>
                <h5>{feature.title}</h5>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4 mt-4">
          {features.slice(6).map((feature, index) => (
            <div className="col-md-6" key={index}>
              <div className="text-center">
                <i
                  className={`bi ${feature.icon} text-primary mb-3`}
                  style={{ fontSize: "2.5rem" }}
                ></i>
                <h5>{feature.title}</h5>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
