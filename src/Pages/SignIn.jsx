import React from 'react'
import '../components/style/sign.css'
import { Button } from "../components/ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { BiLogoGmail } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../components/ui/card"
import { Link } from 'react-router-dom'
export const SignIn = () => {
  return (
    <div className='login-outer-container w-full bg-black flex h-screen'>
        <div className='h-full w-6/12 bg-black flex-factor '></div>
        <div className='h-full w-full bg-white  flex'>
        <div className='flex w-full absolute items-center gap-4 p-4 justify-end'>
          <div>Create a new Account?</div>
          <Link to="/signup">
    <Button variant={"outline"}>Let's Go</Button>
    </Link>
    </div>
        <Card className="w-[350px] card-size">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Hello, Who's here?</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className='flex gap-8 pb-4'>
        <Button>
      <BiLogoGmail className="mr-2 h-4 w-4" /> Login with Gmail
    </Button>
    <Button>
      <BsTwitterX className="mr-2 h-4 w-4" /> Login with Twitter
    </Button>
    </div>
    
          <div className="grid w-full items-center gap-4">

            <div className="flex flex-col space-y-1.5">
              <Label type='email' htmlFor="name">Email</Label>
              <Input id="name" placeholder="Your Email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <Input type="password" id="password" placeholder="abcd123" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
      <Link to="">
      <div>Forgot Password?</div>
      </Link>
    <Button >login</Button>
   
      </CardFooter>
    </Card>
        </div>
    </div>

  )
}
