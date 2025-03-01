import { useContext, useState } from 'react';
import { ContractContext } from '../contexts/ContractProvider';
import { WalletContext } from '../contexts/WalletProvider';
import { useToast } from './use-toast';
import { CircleCheck } from 'lucide-react';

const useClaim = () => {
  const { contract } = useContext(ContractContext);
  const { wallet } = useContext(WalletContext);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const claim = async (campaignId) => {
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
      const prepare = contract.methods.claimV2(campaignId);
      const result = await prepare.send({ from: wallet });

      toast({
        title: (
          <div className="flex items-center gap-1">
            <CircleCheck className="text-teal-500" /> Success!
          </div>
        ),
        description: "Funds claimed successfully.",
      });
    } catch (error) {
      console.error('Error claiming funds:', error);
      toast({
        title: "Uh oh!",
        description: "Failed to claim funds. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { claim, loading };
};

export default useClaim;