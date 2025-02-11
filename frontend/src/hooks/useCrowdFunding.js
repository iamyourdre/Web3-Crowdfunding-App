import { useContext, useState, useEffect } from 'react';
import { ContractContext } from '../contexts/ContractProvider';
import { useToast } from './use-toast';

const useCrowdFunding = () => {
  const { contract, loading: contractLoading } = useContext(ContractContext);
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const fetchCampaigns = async () => {
    if (!contract) return;
    setLoading(true);
    try {
      const campaigns = await contract.methods.getAllCampaigns().call();
      setCampaigns(campaigns);
      console.log(campaigns);
    } catch (error) {
      console.error(error);
      toast({
        title: "Uh oh!",
        description: "An error occurred while fetching campaigns.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [contract]);

  return { loading: loading || contractLoading, campaigns, fetchCampaigns };
};

export default useCrowdFunding;