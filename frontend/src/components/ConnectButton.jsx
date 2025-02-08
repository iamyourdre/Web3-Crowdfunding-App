import React, { useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useWallet from '../hooks/useWallet';
import { Link2 } from 'lucide-react';
import Loading from './Loading';

const ConnectButton = () => {
  const { connectMetamask, disconnectWallet, loading, wallet, etherBalance } = useWallet();
  useEffect(() => {
    if (wallet) {
      console.log(wallet);
    }
  }, [wallet]);

  return (
    <>
      {wallet ? <Connected wallet={{wallet, etherBalance, disconnectWallet}} /> : <NotConnected wallet={{connectMetamask, loading}} />}
    </>
  );
};

const NotConnected = ({ wallet }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Connect</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="color-primary">
        <AlertDialogHeader>
          <AlertDialogTitle>Connect Wallet</AlertDialogTitle>
          <AlertDialogDescription>
            You need to connect your wallet to continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex flex-col gap-2 w-full">
            <Button className="justify-center" onClick={wallet.connectMetamask}>
              {wallet.loading && <Loading />}
              <span>Open Metamask</span>
            </Button>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const Connected = ({wallet}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="flex items-center">
          <img
            src="https://ui-avatars.com/api/?name=0x&color=fff&background=FF4D00&rounded=true"
            alt="avatar" className="w-5 h-5 rounded-full"
          />
          {wallet.wallet.slice(0,5)+"..."+wallet.wallet.slice(-4)}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Link2 className='text-teal-500' /> Wallet Connected
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            <p>Address: <b>{wallet.wallet ? wallet.wallet : '-'}</b></p>
            <p>Balance: <b>{wallet.etherBalance ? wallet.etherBalance.slice(0,6) : '0.00'} ETH</b></p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="grid grid-cols-2 gap-2 w-full">
          <Button variant="destructive" onClick={wallet.disconnectWallet} className="mt-2">
            Disconnect
          </Button>
          <AlertDialogCancel>
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConnectButton;