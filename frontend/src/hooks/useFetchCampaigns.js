import { useContext, useState, useEffect } from 'react';
import { ContractContext } from '../contexts/ContractProvider';
import { useToast } from './use-toast';

const useFetchCampaigns = () => {
  const { contract, loading: contractLoading } = useContext(ContractContext);
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const fetchAllCampaigns = async () => {
    if (!contract) return;
    setLoading(true);
    try {
      const campaigns = await contract.methods.getAllCampaigns().call();
      setCampaigns(campaigns.reverse());
    } catch (error) {
      console.error(error);
      toast({
        title: "Uh oh!",
        description: "An error occurred while fetching campaigns",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCampaigns();
  }, [contract]);

  return { loading: loading || contractLoading, campaigns, fetchAllCampaigns };
};

export default useFetchCampaigns;