import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ReservationPage.css';

const ReservationPage = () => {
  const { state } = useLocation(); // Access the slot and location passed from SlotDetailsPage
  const navigate = useNavigate();

  // Always call hooks at the top level
  const [user, setUser] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [reservationTime, setReservationTime] = useState('');

  // Fetch user profile data from the backend (unconditionally call useEffect here)
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/routes/profile', {
          headers: { Authorization: `Bearer ${token}` },  // Send token for authorization
        });
        setUser(response.data.user);  // Set user data from response
      } catch (error) {
        console.error('Error fetching user profile:', error);
        navigate('/login');  // Redirect to login if user is not authenticated
      }
    };

    fetchUserProfile();
  }, [navigate]); // The hook is not conditional, it runs once after the component mounts

  // Early return only after hooks are called
  if (!state || !state.slot || !state.location) {
    return <div>Loading...</div>; // Wait until slot and location are available
  }

  const { slot, location } = state;

  // Handle form submission to make the reservation
  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/routes/reserve', {
        slot: slot.name,
        location: location.name,
        vehicleNumber,
        reservationTime,
      });
      alert('Reservation successful!');
      navigate('/');  // Redirect to dashboard after successful reservation
    } catch (error) {
      console.error('Error during reservation:', error);
      alert('Error during reservation!');
    }
  };

  return (
    <div className="reservation-page">
      <h2>Reserve Slot {slot.name} at {location.name}</h2>
      
      {/* Reservation Details Box */}
      <div className="reservation-box">
        {/* Display user information */}
        {user ? (
          <div className="user-info">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ) : (
          <div>Loading user data...</div>
        )}

        {/* Display slot and location details */}
        <div className="slot-location-info">
          <p><strong>Slot Location:</strong> {location.name}</p>
          <p><strong>Slot Number:</strong> {slot.name}</p>
        </div>

        {/* Vehicle selection */}
        {user && (
          <div>
            <label htmlFor="vehicleNumber">Select Vehicle</label>
            <select
              id="vehicleNumber"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
            >
              <option value="">--Select Vehicle--</option>
              {user.VehicleNumber1 && <option value={user.VehicleNumber1}>{user.VehicleNumber1}</option>}
              {user.VehicleNumber2 && <option value={user.VehicleNumber2}>{user.VehicleNumber2}</option>}
              {user.VehicleNumber3 && <option value={user.VehicleNumber3}>{user.VehicleNumber3}</option>}
            </select>
          </div>
        )}

        {/* Date and Time */}
        <div>
          <label htmlFor="reservationTime">Select Time</label>
          <input
            type="datetime-local"
            id="reservationTime"
            value={reservationTime}
            onChange={(e) => setReservationTime(e.target.value)}
          />
        </div>

        {/* Reserve Button */}
        <button onClick={handleSubmit}>Reserve Slot</button>
      </div>
    </div>
  );
};

export default ReservationPage;
