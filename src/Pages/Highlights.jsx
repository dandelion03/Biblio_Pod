import React from "react";
import { NewNav } from "../components/NewNav";
import '../components/style/highlights.css'
import Card from "../components/Modals/card";
export const Highlights = () => {
  
  return <><NewNav/><div className="flex h-screen w-90 m-auto">
    <div className=" ml-4 highlights flex justify-around 	w-1/5">
    <div className="  flex flex-col gap-4 w-4/5 flex-wrap"> <Card/><Card/></div>
    <div className="border-right-highlight"></div>
    </div>
    <div className="w-4/5 ">
      <div className="flex h-full justify-center"> <img className="opacity-80	w-4/5 object-contain" src="doodle3.jpg" alt="" />  </div>
      </div>
    </div>
    </>
};
