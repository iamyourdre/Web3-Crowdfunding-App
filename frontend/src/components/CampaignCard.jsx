import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Progress } from "@/components/ui/progress"
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import ContributeDrawer from './ContributeDrawer';
import TimeLeft from './TimeLeft';

export const CampaignCard = ({ campaign, className, to }) => {
  const [timeLeft, setTimeLeft] = useState({});
  const percentage = (Number(campaign.totalContributions) / Number(campaign.goal)) * 100;
  const totalContributions = (Number(campaign.totalContributions) / 10 ** 18);
  const goal = (Number(campaign.goal) / 10 ** 18);

  return (
    <Link to={'/c/' + campaign.id || '#'}>
      <Card className={`flex flex-col ${className}`}>
        <img src={campaign.imageURI} alt={campaign.title} className="w-full h-48 rounded-t-xl object-cover" />
        <CardHeader className="pb-3 h-full">
          <CardTitle className="text-xl">{campaign.title}</CardTitle>
          <TimeLeft endsAt={campaign.endsAt} onTimeLeftChange={setTimeLeft} />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex items-end">
            <p className='text-4xl flex-1'>{(totalContributions)}</p>
            <p className='text-muted-foreground text-sm'>of {goal} ETH</p>
          </div>
          <Progress value={percentage < 100 ? percentage : 100} className="w-full" />
        </CardContent>
        <CardFooter>
          {timeLeft.days !== undefined ? (
            <ContributeDrawer />
          ) : (
            <Button variant="outline" className="w-full" disabled>Closed</Button>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};