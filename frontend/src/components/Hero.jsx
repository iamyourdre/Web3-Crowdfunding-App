import React from 'react';
import heroBg from '../assets/grainy-blur.png';
import heroImg1 from '../assets/3d-glassy-abstract-robot-hand-with-science-symbol.png';
import { Button } from './ui/button';
import { Github } from 'lucide-react';

const Hero = () => {
  return (
    <div className="bg-cover"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="box bg-background/80 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-screen md:pt-0">
        <div className="flex flex-col min-h-screen justify-center">
          <p className="flex text-5xl lg:text-6xl font-black">
            <span className="absolute">
              Innovational
              <span className="blur-xl block
                bg-gradient-to-r from-purple-600 via-pink-400 to-blue-400 to-90%
                bg-clip-text box-content text-transparent select-none">
                Crowdfunding
              </span>
              Technology
            </span>
            <span className="relative">
              Innovational
              <span className="relative block pb-2.5
                bg-gradient-to-r from-purple-600 via-pink-400 to-blue-400 to-90%
                bg-clip-text text-transparent select-auto">
                Crowdfunding
              </span>
              <span className='relative -top-2.5'>Technology</span>
            </span>
          </p>
          <p className="text-lg mt-3 mb-6">
            Join us in revolutionizing the way projects are funded. Connect your wallet and start supporting innovative ideas today!
          </p>
          <div className="flex gap-2">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-400 text-foreground to-90% px-14 py-6">
              Get Started
            </Button>
            <Button className="py-6" variant="outline">
              <Github /> Github
            </Button>
          </div>
        </div>
        <div className="hidden md:flex justify-center items-center">
          <img src={heroImg1} alt="Hero" className="w-72 lg:w-96 ml-10" />
        </div>
      </div>
    </div>
  );
};

export default Hero;