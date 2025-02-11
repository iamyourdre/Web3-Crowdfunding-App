import React, { useEffect } from 'react';
import useCrowdFunding from '../hooks/useCrowdFunding';

import { CampaignCard } from './CampaignCard';
import Loading from './Loading';
import { Button } from './ui/button';

const CampaignList = () => {
  const { loading, campaigns } = useCrowdFunding();

  if (loading) {
    return <div>
      <Loading />&nbsp; Loading Campaign
    </div>;
  }

  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {campaigns.map((campaign, index) => (
          <CampaignCard key={index} campaign={campaign} />
        ))}
      </div>
      <div className="mt-5">
        <Button onClick={() => {}}>Load More</Button>
      </div>
    </>
  )
};

export default CampaignList;