import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchCampaignDetails from '../hooks/useFetchCampaignDetails';
import { CampaignCard } from '@/components/CampaignCard';
import { ArchiveX, Info } from 'lucide-react';
import _404 from './_404';
import Loading from '@/components/Loading';

const CampaignDetails = () => {
  const { id } = useParams();
  const { loading, campaignDetails } = useFetchCampaignDetails(id-1);

  if (!loading && !campaignDetails) {
    return (
      <_404 />
    );
  }

  return (
    <div className='box py-28'>
      {loading ? (
        <div>
          <Loading />&nbsp; Loading
        </div>
      ) : (
        <>
          <div className="grid lg:grid-cols-5 grid-cols-1 gap-6">
            <div className="lg:col-span-2 col-span-1">
              <CampaignCard campaign={campaignDetails} />
            </div>
            <div className="lg:col-span-3 col-span-1">
              <div className='mb-5'>
                <h1 className="text-3xl font-bold">
                  {campaignDetails.title}
                </h1>
                <p className="text-sm text-gray-500 mt-2 flex items-center">
                  <Info />&nbsp; {campaignDetails.description}
                </p>
                <p className="text-sm text-gray-500 mt-2 flex items-center">
                  Goals: {campaignDetails.description}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CampaignDetails;