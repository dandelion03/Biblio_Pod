import React, { useState, useEffect } from "react";
import "./index.css";
import EpubReader from "./Pages/EpubReader";
import { Routes, Route, useLocation } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import Footer from "./components/Footer";
import { SignUp } from "./Pages/SignUp";
import { SignIn } from "./Pages/SignIn";
import { Highlights } from "./Pages/Highlights";
import { Collection } from "./Pages/Collection/Collection";

function App() {
  const location = useLocation();
  const isReadRoute = location.pathname.includes("/login");
  const isSignup = location.pathname.includes("/signup");
  console.log(location.pathname);

  return (
    <>
      {/* <BookProvider> */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element="#" />
        <Route path="/about" element="#" />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/highlights" element={<Highlights />} />
        <Route path="/collections" element={<Collection />} />
        {/* <Route path="/search" element={<SearchPage />} /> */}
        <Route path="/read" element={<EpubReader />} />
        {/* <Route path="/Library" element={<MyLibrary />} /> */}
      </Routes>
      {/* </BookProvider> */}
    </>
  );
}
export default App;
