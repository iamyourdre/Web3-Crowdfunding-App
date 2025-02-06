import Navbar from '../components/Navbar';
import React, { useEffect } from 'react';

const Base = ({ children }) => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="bg-background min-h-screen text-foreground">
      <Navbar />
      {children}
    </div>
  );
}

export default Base;