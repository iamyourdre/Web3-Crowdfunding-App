import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Base from './layout/Base';
import Index from './pages/Index';
import Campaign from './pages/Campaign';

function App() {
  return (
    <Router>
      <Base>
        <Routes>
          <Route path="/" element={<Index/>} />
          <Route path="/campaign" element={<Campaign/>} />
        </Routes>
      </Base>
    </Router>
  );
}

export default App;