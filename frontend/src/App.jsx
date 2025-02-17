import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Base from './layout/Base';
import Index from './pages/Index';
import Campaign from './pages/Campaign';
import CreateCampaign from './pages/CreateCampaign';
import CampaignDetails from './pages/CampaignDetails';

function App() {
  return (
    <Router>
      <Base>
        <Routes>
          <Route path="/" element={<Index/>} />
          <Route path="/campaign" element={<Campaign/>} />
          <Route path="/campaign/create" element={<CreateCampaign/>} />
          <Route path="/c/:id" element={<CampaignDetails />} />
        </Routes>
      </Base>
    </Router>
  );
}

export default App;