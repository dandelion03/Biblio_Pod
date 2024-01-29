import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../ui/dialog"
  import { Input } from "../ui/input"
  import { Label } from "../ui/label"
  import { Button } from "../ui/button"
  import { BiAddToQueue } from "react-icons/bi";
export const AddToCollection = () => {
  return (
    <Dialog>
              <DialogTrigger>  
              <li className="item">
                <div className="link flex items-center">
                  <BiAddToQueue className="nav-logo" />
                  <span>New Collection</span>
                </div>
              </li>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
              </Dialog>
  )
}
