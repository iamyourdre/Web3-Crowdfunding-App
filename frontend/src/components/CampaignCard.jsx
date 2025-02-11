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

export const CampaignCard = ({campaign}) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

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

  return (
    <Card>
      <img src={campaign.imageURI} alt={campaign.title} className="w-full h-48 rounded-t-xl object-cover" />
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">{campaign.title}</CardTitle>
        <CardDescription>
          {timeLeft.days !== undefined ? (
            <span>
              {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s left
            </span>
          ) : (
            <span>Campaign ended</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-end">
          <p className='text-4xl flex-1'>{campaign.totalContributions.toString()}</p>
          <p className='text-muted-foreground text-sm'>of {campaign.goal.toString()} ETH</p>
        </div>
        <Progress value={60} className="w-full" />
      </CardContent>
      <CardFooter>
        <Button>Contribute</Button>
      </CardFooter>
    </Card>
  )
}