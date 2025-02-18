import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Progress } from "@/components/ui/progress"
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

export const CampaignCard = ({campaign, className, to}) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const percentage = (Number(campaign.totalContributions) / Number(campaign.goal)) * 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const difference = Number(campaign.endsAt) * 1000 - new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  }

  const totalContributions = (Number(campaign.totalContributions) / 10 ** 18);
  const goal = (Number(campaign.goal) / 10 ** 18);

  return (
    <Link to={'/c/'+campaign.id || '#'} >
      <Card className={`flex flex-col ${className}`}>
        <img src={campaign.imageURI} alt={campaign.title} className="w-full h-48 rounded-t-xl object-cover" />
        <CardHeader className="pb-3 h-full">
          <CardTitle className="text-xl">{campaign.title}</CardTitle>
          <CardDescription>
            {timeLeft.days !== undefined ? (
              <span>
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s left
              </span>
            ) : (
              <span>Campaign Ended</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex items-end">
            <p className='text-4xl flex-1'>{(totalContributions)}</p>
            <p className='text-muted-foreground text-sm'>of {goal} ETH</p>
          </div>
          <Progress value={percentage} className="w-full" />
        </CardContent>
        <CardFooter>
          {timeLeft.days !== undefined ? (
            <Button to={to} className="w-full">Contribute</Button>
          ) : (
            <Button variant="outline" to={to} className="w-full" disabled>Closed</Button>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}