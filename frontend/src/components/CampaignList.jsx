import React, { useState, useEffect } from 'react';
import useFetchCampaigns from '../hooks/useFetchCampaigns';

import { CampaignCard } from './CampaignCard';
import Loading from './Loading';
import { Button } from './ui/button';

const CampaignList = () => {
  const { loading, campaigns } = useFetchCampaigns();
  const [visibleCount, setVisibleCount] = useState(3);

  if (loading) {
    return <div>
      <Loading />&nbsp; Loading Campaign
    </div>;
  }

  const loadMore = () => {
    setVisibleCount(prevCount => Math.min(prevCount + 3, campaigns.length));
  };
  return (
    <>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
        {campaigns.slice(0, visibleCount).map((campaign, index) => (
          <CampaignCard key={index} campaign={campaign} className={'h-full'} />
        ))}
      </div>
      {visibleCount < campaigns.length && (
        <div className="mt-5">
          <Button onClick={loadMore} variant="outline" size="lg">Load More</Button>
        </div>
      )}
    </>
  )
};

export default CampaignList;