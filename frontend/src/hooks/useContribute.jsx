import { useContext, useState } from 'react';
import { ContractContext } from '../contexts/ContractProvider';
import { WalletContext } from '../contexts/WalletProvider';
import { useToast } from './use-toast';
import Web3 from 'web3';

const useContribute = () => {
  const { contract } = useContext(ContractContext);
  const { wallet } = useContext(WalletContext);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const contribute = async (amount) => {
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
      const prepare = contract.methods.contribute();
      await prepare.send({ from: wallet, value: amountInWei });

      toast({
        title: "Success!",
        description: "Contribution sent successfully.",
        variant: "success",
      });
    } catch (error) {
      console.error('Error sending contribution:', error);
      toast({
        title: "Uh oh!",
        description: "Failed to send contribution. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { contribute, loading };
};

export default useContribute;