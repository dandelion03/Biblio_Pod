import React, { useState, useEffect, useReducer } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { RiMenuAddFill } from "react-icons/ri";
import { LuListChecks } from "react-icons/lu";
import { HiDotsHorizontal } from "react-icons/hi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { motion } from "framer-motion";
import "./style/bookdisplay.css";
import "../index.css";

import { useNavigate } from "react-router-dom";


export const BookDisplay = ({ title, author, img, identifier }) => {
  const [checkedLib, toggle] = useReducer(
    (checkedLib) => !checkedLib,
    false
  );
  const navigate = useNavigate();

  console.log(checkedLib);
  const goToRead = () => {
    navigate(`/read?book=isbn:${identifier}`);
  };
  useEffect(() => {
    const book = { title, author, img };

    if (checkedLib) {
      const library = JSON.parse(localStorage.getItem("library")) || [];
      library.push(book);
      localStorage.setItem("library", JSON.stringify(library));
    } else {
      const library = JSON.parse(localStorage.getItem("library")) || [];
      const updatedLibrary = library.filter((b) => b.title !== title);
      localStorage.setItem("library", JSON.stringify(updatedLibrary));
    }
  }, [checkedLib, title, author, img]);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ x: 20, opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="bookContainer"
      >
        <img className="BookPoster" src={img} alt="Book Poster" />
        <p className="bookTitle" onClick={() => goToRead()}>
          {title}
        </p>
        <p className="bookAuthor">{author}</p>
        <div className="hover-container">
          <div
            onClick={() => goToRead()}
            className="hover-background"
          ></div>
          <div className="inside-bookCover">
            {/* <button
            className="book-Button cursor"
            onClick={() => goToRead(title)}
          >
            Read
            
          </button> */}
            <IoEyeOutline
              onClick={() => goToRead()}
              className="icons-insideCover"
            />
            <span>
            <DropdownMenu>
  <DropdownMenuTrigger><HiDotsHorizontal className="icons-insideCover" /></DropdownMenuTrigger>
  <div className="drop-position">
  <DropdownMenuContent>
    <DropdownMenuLabel>Smiley face</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <div>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
    </div>
  </DropdownMenuContent>
  </div>
</DropdownMenu>
            </span>
          </div>
        </div>
      </motion.div>
    </>
  );
};
