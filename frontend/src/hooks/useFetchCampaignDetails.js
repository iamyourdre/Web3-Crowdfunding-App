import { useContext, useState, useEffect } from 'react';
import { ContractContext } from '../contexts/ContractProvider';

const useFetchCampaignDetails = (id) => {
  const { contract, loading: contractLoading } = useContext(ContractContext);
  const [loading, setLoading] = useState(true);
  const [campaignDetails, setCampaignDetails] = useState(null);

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      if (!contract) return;
      setLoading(true);
      try {
        const details = await contract.methods.getCampaignDetails(id).call();
        setCampaignDetails(details);
      } catch (error) {
        console.error('Error fetching campaign details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignDetails();
  }, [contract, id]);

  return { loading: loading || contractLoading, campaignDetails };
};

export default useFetchCampaignDetails;