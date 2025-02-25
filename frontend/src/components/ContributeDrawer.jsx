import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ConnectButton from "./ConnectButton"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import useWallet from "@/hooks/useWallet"
import useContribute from "@/hooks/useContribute"
import { Input } from "./ui/input"


const ContributeDrawer = () => {

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Contribute</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contribute</DialogTitle>
          <DialogDescription>Enter the amount you'd like to contribute.</DialogDescription>
          <ContributeForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
  
}

const ContributeForm = () =>{
  const { wallet } = useWallet();
  const { contribute, loading } = useContribute();
  
  const handleInput = (event) => {
    const value = event.target.value;
    if (!/^\d*\.?\d*$/.test(value)) {
      event.target.value = value.slice(0, -1);
    }
  };

  console.log("...");

  const handleSubmit = async (event) => {
    console.log("Submitting form...");
    event.preventDefault();
    const amount = event.target.elements.amount.value;
    console.log("Amount:", amount);
    await contribute(amount);
  };

  return (
    <form className="grid items-start gap-4 pt-2" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="amount">
          ETH
        </Label> 
        <Input 
          type="text" 
          id="amount" 
          name="amount" 
          placeholder="0.00" 
          pattern="^\d+(\.\d+)?$" 
          title="Goal must be a valid number"
          onInput={handleInput}
          autoComplete="off"
        />
      </div>
      {wallet ? (
        <Button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Contribution'}
        </Button>
      ) : (
        <ConnectButton/>
      )}
    </form>
  )
}

export default ContributeDrawer