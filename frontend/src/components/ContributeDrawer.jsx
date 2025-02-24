import React from 'react'
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useWallet from '@/hooks/useWallet'
import ConnectButton from './ConnectButton'
import useContribute from '@/hooks/useContribute'

const ContributeDrawer = () => {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">Contribute</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Contribute</DialogTitle>
            <DialogDescription>
              Enter the amount you'd like to contribute to this campaign (ex: 1 or 0.05).
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="w-full">Contribute</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Contribute</DrawerTitle>
          <DrawerDescription>
            Enter the amount you'd like to contribute to this campaign (ex: 0.05).
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ className }) {
  const { wallet } = useWallet();
  const { contribute, loading } = useContribute();
  const handleInput = (event) => {
    const value = event.target.value;
    if (!/^\d*\.?\d*$/.test(value)) {
      event.target.value = value.slice(0, -1);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const amount = event.target.elements.value.value;
    await contribute(amount);
  };

  return (
    <form className={cn("grid items-start gap-4", className)} onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="value">
          ETH
        </Label> 
        <Input 
          type="text" 
          id="value" 
          placeholder="0.00" 
          pattern="^\d+(\.\d+)?$" 
          title="Goal must be a valid number"
          onInput={handleInput}
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