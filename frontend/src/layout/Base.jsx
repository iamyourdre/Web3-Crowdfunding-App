import { Toaster } from '@/components/ui/toaster';
import Navbar from '../components/Navbar';
import React, { useEffect } from 'react';

const Base = ({ children }) => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen color-primary">
      <Navbar />
      {children}
      <Toaster />
    </div>
  );
}

export default Base;