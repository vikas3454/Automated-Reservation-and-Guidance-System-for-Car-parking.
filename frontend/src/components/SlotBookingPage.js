import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SlotBookingPage.css";

const SlotBookingPage = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchLocations = async () => {
      const token = localStorage.getItem("token"); // Retrieve token if required
      try {
        const response = await axios.get("http://localhost:5000/routes/locations", {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined, // Add token if available
          },
        });
        setLocations(response.data); // Update state with the fetched data
        setLoading(false);
      } catch (err) {
        console.error("Error fetching locations:", err);
        setError(err.response?.data?.message || "Failed to fetch locations");
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleLocationSelect = (location) => {
    console.log(locations);
    navigate(`/slot-details/${locations.id}`, { state: location }); // Pass location data to the slot-details page
  };

  if (loading) {
    return <div>Loading locations...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="slot-booking-page">
      <h2>Select your location for slot booking</h2>
      <div className="locations-list">
        {locations.map((location) => (
          <div
            key={location.id}
            className="location-card"
            onClick={() => handleLocationSelect(location)}
          >
            <h3>{location.name}</h3>
            <div className="slot-info">
              <div className="slot-field">
                <strong>No. of Slots Vacant:</strong> {location.vacant}
              </div>
              <div className="slot-field">
                <strong>Occupied:</strong> {location.occupied}
              </div>
              <div className="slot-field">
                <strong>Reserved:</strong> {location.reserved}
              </div>
            </div>
          </div>
        ))}
      </div>
      {locations.length === 0 && <p>No locations available.</p>}
    </div>
  );
};

export default SlotBookingPage;
