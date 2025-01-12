

import React, { useState, useEffect } from 'react';
import RoomProvider from './RoomProvider';
import RoomEntry from './RoomEntry';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <RoomProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RoomEntry />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </RoomProvider>
  );
};

export default App;