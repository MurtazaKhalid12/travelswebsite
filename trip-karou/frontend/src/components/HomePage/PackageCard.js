import { useNavigate } from "react-router-dom";
import cover from "../../assets/Pictures/Cards/card1.jpg"
const PackageCard = ({media , title, description, price, offerTag,trip_id,agency_name }) => {
    const navigate = useNavigate();
    const coverImage = media?.find(item => item.media_order === 1)?.media_url || cover;

  function handleBooking()
  {
    navigate(`/booking/${trip_id}`)
  }
    const styles = {
      card: {
        border: "none",
        borderRadius: "15px",
        overflow: "hidden",
        backgroundColor: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        height: "100%",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      },
      imageContainer: {
        position: "relative",
        height: "220px",
        overflow: "hidden",
      },
      image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transition: "transform 0.3s ease",
      },
      cardBody: {
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      },
      title: {
        fontSize: "1.5rem",
        fontWeight: "600",
        color: "#333",
        margin: "0",
      },
      
      description: {
        margin: "0",
        color: "#666",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
      },
      offerTag: {
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "10px 15px",
        borderRadius: "6px",
        textAlign: "center",
        fontSize: "0.9rem",
        fontWeight: "500",
      },
      bookButton: {
        backgroundColor: "#007BFF",
        color: "white",
        padding: "12px",
        width: "100%",
        border: "none",
        borderRadius: "6px",
        fontSize: "1rem",
        fontWeight: "500",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        marginTop: "auto",
      },
    };
  
    return (
      <div className="col-md-4 col-sm-6 mb-4">
        <div
          style={styles.card}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
          }}
        >
          <div style={styles.imageContainer}>
            <img src={coverImage} alt={title} style={styles.image} />
          </div>
          <div style={styles.cardBody}>
            <h5 style={styles.title}>{title}</h5>
            <p style={styles.description}>Agency:{agency_name}</p>
            <p style={styles.description}>{description}</p>
            {offerTag && <div style={styles.offerTag}>{offerTag}</div>}
            <button
              style={styles.bookButton}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
              onClick={handleBooking}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    );
  };
  export default PackageCard 