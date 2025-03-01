import { useContext, useState } from 'react';
import { ContractContext } from '../contexts/ContractProvider';
import { WalletContext } from '../contexts/WalletProvider';
import { useToast } from './use-toast';
import { CircleCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const useDeleteCampaign = () => {
  const { contract } = useContext(ContractContext);
  const { wallet } = useContext(WalletContext);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const deleteCampaign = async (campaignId) => {
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
      const prepare = contract.methods.deleteCampaign(campaignId);
      const result = await prepare.send({ from: wallet });

      toast({
        title: (
          <div className="flex items-center gap-1">
            <CircleCheck className="text-teal-500" /> Success!
          </div>
        ),
        description: (
          <>
            This campaign deleted successfully. Redirecting in 3 seconds...
          </>
        ),
      });

      setTimeout(() => {
        window.location.href = "/campaign";
      }, 3000);
    } catch (error) {
      console.error('Error deleting campaign:', error);
      toast({
        title: "Uh oh!",
        description: "Failed to delete campaign. Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { deleteCampaign, loading };
};

export default useDeleteCampaign;