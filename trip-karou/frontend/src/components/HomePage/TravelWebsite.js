import { useContext, useState } from "react";
import PackageCard from "./PackageCard";
import HeroSection from "./Hero";
import Dashboard from "./../../pages/Dashboard";
import "./TravelWebsite.css"; // Import the CSS file
import {MyContext}  from "./../../ContextApi/AppContext";
// import "./spinner.css"
const TravelWebsite = () => {
   

    const handleLoading = (data) => {
        setLoading(data);
        console.log(data);
    };

    const [loading, setLoading] = useState(false); // Spinner 
    const {searchResults} = useContext(MyContext)

    return (
        <>
            <HeroSection
                handleLoading={handleLoading}
            />

            {/* Top Destinations */}
            <section className="py-5" style={{ backgroundColor: "#e1f5fe" }}>
                <div className="container">
                    {loading && <div className="spinner"></div>}

                    <h2 className="section-title">Top Destinations of 2024</h2>

                    <div className="row">
                        {searchResults && searchResults.data.length > 0 ? (
                            searchResults.data.map((result) => (
                                <PackageCard
                                    key={result.trip_id}
                                    image={result.media[0]?.media_url || ""}
                                    title={result.package_name}
                                    description={result.description}
                                    price={result.price}
                                    offerTag={`${result.available_seats} seats available`}
                                    trip_id = {result.trip_id}
                                    agency_name = {result.user.name}
                                    media = {result.media}
                                />
                            ))
                        ) : (
                            <p className="text-center">
                                No trips found. Please try searching again!
                            </p>
                        )}
                    </div>

                    <div className="text-center mt-4">
                        <a
                            href={Dashboard}
                            className="btn btn-outline-primary load-more"
                        >
                            Load More
                        </a>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="why-choose-us py-5">
                <div className="container">
                    <h2 className="text-center mb-4">Why Choose PakTravels?</h2>
                    <div className="row">
                        {[
                            {
                                icon: "shield-alt",
                                title: "Safety & Security",
                                desc: "Your safety is our priority, with verified agencies and secure payment options.",
                            },
                            {
                                icon: "hiking",
                                title: "Memorable Adventures",
                                desc: "Experience the beauty of Pakistan with well-curated trips to top destinations.",
                            },
                            {
                                icon: "headset",
                                title: "24/7 Support",
                                desc: "Our team is always here to help before, during, and after your trip.",
                            },
                        ].map((feature, index) => (
                            <div key={index} className="col-md-4 text-center">
                                <i className={`fas fa-${feature.icon} mb-3`}></i>
                                <h5>{feature.title}</h5>
                                <p>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-dark text-white py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h5 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
                                Contact Us
                            </h5>
                            <p style={{ marginBottom: "0.5rem" }}>
                                Email: info@paktravels.com
                            </p>
                            <p>Phone: +92 345 9668442</p>
                        </div>
                        <div className="col-md-4 text-center">
                            <h5 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
                                Follow Us
                            </h5>
                            {["facebook-f", "instagram", "twitter"].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="text-white me-3"
                                    style={{ fontSize: "1.2rem" }}
                                >
                                    <i className={`fab fa-${social}`}></i>
                                </a>
                            ))}
                        </div>
                        <div className="col-md-4 text-md-end">
                            <p style={{ marginBottom: 0 }}>
                                © 2024 PakTravels. All Rights Reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default TravelWebsite