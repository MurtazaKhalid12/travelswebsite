import React, { useContext, useState } from "react";
import hero from "../../assets/Pictures/Home/hero.jpg";
import "@fontsource/poppins"; // Defaults to weight 400.
import axios from "axios"; // For API requests
import {MyContext} from "./../../ContextApi/AppContext"

const HeroSection = ({ handleLoading }) => {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);
  const {setSearchResults} = useContext(MyContext);
  const styles = {
    heroSection: {
      height: "80vh",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 20px",
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${hero})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
    },
    title: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: "3rem",
      fontWeight: 700,
      color: "white",
      textAlign: "center",
      marginBottom: "2rem",
      textShadow: "0 2px 10px rgba(5, 150, 105, 0.2)",
      lineHeight: 1.2,
    },
    heroContent: {
      position: "relative",
      zIndex: 2,
      width: "100%",
      maxWidth: "1200px",
      padding: "0 20px",
    },
    searchContainer: {
      background: "rgba(255, 255, 255, 0.95)",
      padding: "20px",
      borderRadius: "15px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(10px)",
      maxWidth: "1000px",
      margin: "0 auto",
    },
    searchForm: {
      display: "flex",
      gap: "20px",
      alignItems: "center",
    },
    inputGroup: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },
    label: {
      fontSize: "0.9rem",
      color: "#666",
    },
    input: {
      padding: "15px",
      border: "1.5px solid #10b982",
      borderRadius: "8px",
      fontSize: "1rem",
      outline: "none",
      backgroundColor: "white",
      width: "100%",
    },
    button: {
      padding: "15px 40px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "1.1rem",
      cursor: "pointer",
      fontWeight: "600",
      marginTop: "24px",
    },
    spinner: {
      width: "50px",
      aspectRatio: "1",
      display: "grid",
      border: "4px solid #0000",
      borderRadius: "50%",
      borderRightColor: "#25b09b",
      animation: "spin 1s infinite linear",
      margin: "50px auto",
    },
    "@keyframes spin": {
      "100%": { transform: "rotate(1turn)" },
    },
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent page refresh

    handleLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3302/trips/search-trips",
        {
          params: {
            destination,
            date,
            guests,
          },
        }
      );

   
        localStorage.removeItem('searchResults');
 

      console.log("Search Results:", response.data);
      if (response.data && response.data.success) {
        console.log("Trips found:", response.data.data); // Log the trips data
        localStorage.setItem('searchResults', JSON.stringify(response.data));
        handleLoading(false);
        setSearchResults(response.data)
        
      } else {
        console.error("Invalid API response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  return (
    <section style={styles.heroSection}>
      <div style={styles.heroContent}>
        <h1 style={styles.title}>
          Life's an adventure, Explore Pakistan with PakTravels!
        </h1>

        <div style={styles.searchContainer}>
          <form style={styles.searchForm} onSubmit={handleSearch}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Destination</label>
              <input
                type="text"
                placeholder="Where do you want to go?"
                style={styles.input}
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Date</label>
              <input
                type="date"
                required
                style={styles.input}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Guests</label>
              <input
                type="number"
                placeholder="Number of guests"
                min="1"
                required
                style={styles.input}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />
            </div>

            <button type="submit" style={styles.button}>
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
