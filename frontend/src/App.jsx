import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Base from './layout/Base';

function App() {
  return (
    <Router>
      <Base>
        <Routes>
          <Route path="/" element={(
            <>
              Hi!
            </>
          )} />
        </Routes>
      </Base>
    </Router>
  );
}

export default App;