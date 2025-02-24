import { useContext, useState } from 'react';
import { ContractContext } from '../contexts/ContractProvider';
import { WalletContext } from '../contexts/WalletProvider';
import { useToast } from './use-toast';
import Web3 from 'web3';
import { CircleCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      const goalInWei = Web3.utils.toWei(data.goal, 'ether');
      const prepare = contract.methods.createCampaign(
        data.title,
        data.description,
        data.imageURI,
        goalInWei,
        data.endsAt
      );
      const result = await prepare.send({ from: wallet });

      toast({
        title: (
          <div className="flex items-center gap-1">
            <CircleCheck className="text-teal-500" /> Success!
          </div>
        ),
        description: (
          <>
            Campaign created successfully.{" "}
            <Link to={'/c/'+(result.events.CampaignCreated.returnValues.campaignId).toString()} className="underline font-bold">
              View campaign.
            </Link>
          </>
        ),
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