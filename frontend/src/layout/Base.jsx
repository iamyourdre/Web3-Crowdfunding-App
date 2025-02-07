import Navbar from '../components/Navbar';
import React, { useEffect } from 'react';

const Base = ({ children }) => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}

export default Base;