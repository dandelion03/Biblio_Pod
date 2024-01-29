import React from "react";
import "../components/style/sign.css";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { BiLogoGmail } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Link } from "react-router-dom";
export const SignUp = () => {
  return (
    <div className="login-outer-container w-full bg-black flex h-screen">
      <div className="h-full w-6/12 bg-black flex-factor ">  
      <div className="flex h-full justify-center">
          <img className="w-4/5" src="signin.svg" alt="" srcset="" />        </div>
      </div>
      <div className="h-full w-6/12 bg-white border-left flex">
        <div className="flex w-6/12 absolute items-center gap-4 p-4 justify-end">
          <div>Already have an account?</div>
          <Link to="/login">
            <Button variant={"outline"}>login</Button>
          </Link>
        </div>
        <Card className="w-[350px] card-size">
          <CardHeader>
            <CardTitle>Welcome!</CardTitle>
            <CardDescription>
              Start your reading journey in one click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex gap-8 pb-4">
                <Button>
                  <BiLogoGmail className="mr-2 h-4 w-4" /> Use Gmail
                </Button>
                <Button>
                  <BsTwitterX className="mr-2 h-4 w-4" /> Use Twitter
                </Button>
              </div>

              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Username</Label>
                  <Input id="name" placeholder="Choose your Username" />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label type="email" htmlFor="name">
                    Email
                  </Label>
                  <Input id="email" placeholder="your@mail.com" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Password</Label>
                  <Input type="password" id="password" placeholder="Enter your password" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="w-full">Create my Free Account</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
