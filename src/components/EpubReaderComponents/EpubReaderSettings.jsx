import React,{useState} from 'react'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { IoSettingsOutline } from "react-icons/io5";
import {Slider} from "@nextui-org/react";

export const EpubReaderSettings = ({rendition}) => {
    const [fontSlider, setfontSlider] = useState(0.2)

    // Handle the onChange event to update the slider value
    const handleSliderChange = (value) => {
        setfontSlider(value);
        rendition.themes.fontSize(`${fontSlider*40}px`);
        console.log(`${fontSlider*60}px`)
        console.log(fontSlider)
    };
  return (
    <>
    <Dropdown>
      <DropdownTrigger>
    <a id="setting" className=" cursor-pointer icon-cog">
        <IoSettingsOutline />
    </a>
    </DropdownTrigger>
    <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new"><div className="flex flex-col gap-6 w-full max-w-md">
      <Slider   
        size="sm"
        step={0.1}
        color="foreground"
        label="Font Size"
        showSteps={true} 
        maxValue={1} 
        minValue={0.5} 
        value={fontSlider} 
        onChange={handleSliderChange}
        defaultValue={0.2}
        className="max-w-md" 
      />
  
    </div> </DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
    </>
  )
}
