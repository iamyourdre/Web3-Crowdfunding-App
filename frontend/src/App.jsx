import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Base from './layout/Base';
import Index from './pages/Index';

function App() {
  return (
    <Router>
      <Base>
        <Routes>
          <Route path="/" element={<Index/>} />
        </Routes>
      </Base>
    </Router>
  );
}

export default App;