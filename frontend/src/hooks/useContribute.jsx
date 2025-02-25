import { useContext, useState } from 'react';
import { ContractContext } from '../contexts/ContractProvider';
import { WalletContext } from '../contexts/WalletProvider';
import { useToast } from './use-toast';
import Web3 from 'web3';
import { Link } from 'react-router-dom';
import { CircleCheck } from 'lucide-react';

const useContribute = () => {
  const { contract } = useContext(ContractContext);
  const { wallet } = useContext(WalletContext);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const contribute = async (campaignId, amount) => {
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
      const amountInWei = Web3.utils.toWei(amount, 'ether');
      const prepare = contract.methods.contribute(Number(campaignId)-1);
      const result = await prepare.send({ from: wallet, value: amountInWei });

      toast({
        title: (
          <div className="flex items-center gap-1">
            <CircleCheck className="text-teal-500" /> Success!
          </div>
        ),
        description: (
          <>
          Contribution sent successfully!{' '}
          <Link target='_blank' to={'https://sepolia.etherscan.io/tx/'+result.transactionHash} className="underline font-bold">
            Check on Etherscan
          </Link>
          </>
        ),
      });
    } catch (error) {
      console.error('Error sending contribution:', error);
      toast({
        title: "Uh oh!",
        description: "Failed to send contribution. Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { contribute, loading };
};

export default useContribute;