import React, { useEffect, useState } from 'react';

const TimeLeft = ({ endsAt }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [endsAt]);

  function calculateTimeLeft() {
    const diff = Number(endsAt) * 1000 - new Date().getTime();
    let timeLeft = {};

    if (diff > 0) {
      timeLeft = {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      };
    }

    return timeLeft;
  }

  return (
    <span>
      {timeLeft.days !== undefined ? (
        <span className='text-muted-foreground text-sm'>
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s left
        </span>
      ) : (
        <span>Campaign Ended</span>
      )}
    </span>
  );
};

export default TimeLeft;