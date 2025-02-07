import React from 'react';
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

const ConnectButton = () => {
  const { connectMetamask, wallet } = useWallet();

  return (
    <>
      {wallet ? <Connected /> : <NotConnected connectMetamask={connectMetamask} />}
    </>
  );
};

const NotConnected = ({ connectMetamask }) => {
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
            <Button className="justify-center" onClick={connectMetamask}>
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

const Connected = () => {
  return (
    <div>
      <Button>Wallet Connected</Button>
    </div>
  );
};

export default ConnectButton;