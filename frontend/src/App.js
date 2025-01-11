import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignupPage from "./components/Signup";  
import LoginPage from "./components/Login";  
import Dashboard from "./components/Dashboard";
import SlotBookingPage from "./components/SlotBookingPage";
import SlotDetailsPage from "./components/SlotDetailsPage";
import ReservationPage from './components/ReservationPage';
const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/signup" element={<SignupPage />} /> 
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/SlotBookingPage" element={<SlotBookingPage />} /> 
          <Route path="/slot-details/:locationId" element={<SlotDetailsPage />} />
          <Route path="/reservation" element={<ReservationPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
