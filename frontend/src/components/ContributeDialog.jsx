import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ConnectButton from "./ConnectButton";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import useWallet from "@/hooks/useWallet";
import useContribute from "@/hooks/useContribute";
import { Input } from "./ui/input";
import Loading from "./Loading";

const ContributeDialog = ({id}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Contribute</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contribute</DialogTitle>
          <DialogDescription>Enter the amount you'd like to contribute.</DialogDescription>
          <ContributeForm id={id}/>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const ContributeForm = ({id}) => {
  const { wallet } = useWallet();
  const { contribute, loading } = useContribute();
  const [amount, setAmount] = useState("");

  const handleInput = (event) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleSubmit = async () => {
    await contribute(id, amount);
  };

  return (
    <div className="grid items-start gap-4 pt-2">
      <div className="grid gap-2">
        <Label htmlFor="amount">ETH</Label>
        <Input
          type="text"
          id="amount"
          name="amount"
          placeholder="0.00"
          pattern="^\d+(\.\d+)?$"
          title="Goal must be a valid number"
          value={amount}
          onInput={handleInput}
          autoComplete="off"
        />
      </div>
      {wallet ? (
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <>
              <Loading /> Sending...
            </>
          ) : "Send Contribution"}
        </Button>
      ) : (
        <ConnectButton />
      )}
    </div>
  );
};

export default ContributeDialog;