import { House, Menu, PlusCircle, Eye, Info, DollarSign, Trash2, Clock, CircleDollarSign, BadgeDollarSign, HandCoins } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ConnectButton from './ConnectButton'
import { Button } from '@/components/ui/button'

const menuItems = [
  { to: '/', icon: <House />, label: 'Home' },
  { to: '/campaign', icon: <BadgeDollarSign />, label: 'Campaign' },
  { to: '/new-campaign', icon: <HandCoins />, label: 'My Contributions' },
]

const Navbar = () => {
  return (
    <div className='flex w-full box py-4 justify-start items-center '>
      <div className="flex-1 md:flex-none flex gap-3 ">
        <div className="md:hidden">
          <Dropdown/>
        </div>
        <h1 className='font-[1000] text-lg flex-1 md:flex-none'>DAPP</h1>
      </div>
      <div className="hidden pl-5 md:flex flex-1 gap-3">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.to}>
            <span className="mx-2 text-sm font-medium">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
      <div className="">
        <ConnectButton />
      </div>
    </div>
  )
}

export function Dropdown() {
  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Menu size={27}/>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52 border-border box-m mt-5">
        <DropdownMenuLabel>
          <span className="text-muted-foreground">Welcome!</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuItems.map((item, index) => (
          <Link key={index} to={item.to}>
            <DropdownMenuItem>
              {item.icon} {item.label}
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Navbar