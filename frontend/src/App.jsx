import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Base from './layout/Base';
import { Button } from './components/ui/button';

function App() {
  return (
    <Router>
      <Base>
        <Routes>
          <Route path="/" element={(
            <>
              Hi!
              <Button>Button</Button>
            </>
          )} />
        </Routes>
      </Base>
    </Router>
  );
}

export default App;