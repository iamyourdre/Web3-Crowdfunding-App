import { useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import { WalletContext } from '../contexts/WalletContext';
import { useToast } from './use-toast';

const useWallet = () => {
  const { wallet, setWallet } = useContext(WalletContext);
  const [etherBalance, setEtherBalance] = useState(null);
  const [autoConnect, setAutoConnect] = useState(false); // Set to true to auto-connect to MetaMask
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const connectMetamask = async () => {
    if (window.ethereum) {
      setLoading(true);
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setWallet(accounts[0]);

        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }], // Sepolia chain ID
        });

        const etherBalance = await web3.eth.getBalance(accounts[0]);
        setEtherBalance(web3.utils.fromWei(etherBalance, 'ether'));
        toast({
          title: "Wallet Connected",
          description: `Connected to wallet: ${accounts[0]}`,
        });
      } catch (error) {
        let errorMessage = error.message;
        if (error.code === -32002) {
          errorMessage = "Request already pending. Please confirm the request in MetaMask.";
        }
        toast({
          title: "Uh oh!",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    } else {
      const errorMessage = 'You need to install MetaMask to connect to this app';
      toast({
        title: "Uh oh!",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
    setEtherBalance(null);
    setAutoConnect(false);
    toast({
      title: "Wallet Disconnected",
      description: "You have disconnected your wallet.",
    });
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (autoConnect) {
        await connectMetamask();
        return () => {};
      }
    };
    checkWalletConnection();
  }, [autoConnect]);

  return { wallet, connectMetamask, disconnectWallet, etherBalance, loading, setLoading, setAutoConnect };
};

export default useWallet;