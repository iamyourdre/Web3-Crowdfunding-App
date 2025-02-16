import { useContext, useState } from 'react';
import { ContractContext } from '../contexts/ContractProvider';
import { WalletContext } from '../contexts/WalletProvider';
import { useToast } from './use-toast';
import Web3 from 'web3';

const useCreateCampaign = () => {
  const { contract } = useContext(ContractContext);
  const { wallet } = useContext(WalletContext);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const createCampaign = async (data) => {
    if (!contract || !wallet) {
      toast({
        title: "Uh oh!",
        description: "Please connect your wallet first.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const goalInWei = Web3.utils.toWei(0.05, 'ether');
      const prepare = contract.methods.createCampaign(
        data.title,
        data.description,
        data.imageURI,
        goalInWei,
        data.endsAt
      );
      console.log("prepare", prepare.arguments);
      await prepare.send({ from: wallet });

      toast({
        title: "Success!",
        description: "Campaign created successfully.",
        variant: "success",
      });
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast({
        title: "Uh oh!",
        description: "Failed to create campaign. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { createCampaign, loading };
};

export default useCreateCampaign;