import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileDashboard from './ProfileDashboard';  // Ensure the correct import path
import Cards from './Cards';
import Profile from './Profile';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Display ProfileDashboard on the home route */}
        <Route path="/" element={<ProfileDashboard />} />
        {/* Display ProfileDashboard for specific profile based on profileKey */}
        <Route path="/profile/:profileKey" element={<ProfileDashboard />} />
        <Route path="/:profileName" element={<Profile />} /> {/* Dynamic route with profileName */}

        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
