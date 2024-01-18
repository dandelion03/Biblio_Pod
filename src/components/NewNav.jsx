import React, { useState, useEffect } from 'react';
import './style/navbar.css';
import { Link } from 'react-router-dom';
import { BiHomeAlt2 } from "react-icons/bi";
import { BiGridAlt } from "react-icons/bi";
import { BiCloudUpload } from "react-icons/bi";
import { BiFolder } from "react-icons/bi";
import { BiFlag } from "react-icons/bi";
import { TbSettings } from "react-icons/tb";
import { BiAddToQueue } from "react-icons/bi";
import { BulkUpload } from './Modals/BulkUpload';
export const NewNav = () => {
  const [isSidebarLocked, setSidebarLocked] = useState(true);
  const [isSidebarHoverable, setSidebarHoverable] = useState(false);
  const [isSidebarClosed, setSidebarClosed] = useState(true);
  const [isBulkUploadModalOpen, setIsBulkUploadModalOpen] = useState(false);

  const toggleLock = () => {
    setSidebarLocked(!isSidebarLocked);
    setSidebarHoverable(!isSidebarLocked);
  };

   // Function to open the BulkUpload modal
   const openBulkUploadModal = () => {
    setIsBulkUploadModalOpen(true);
  };

  const closeBulkUploadModal = () => {
    setIsBulkUploadModalOpen(false);
  };

  const hideSidebar = () => {
    if (isSidebarHoverable) {
      setSidebarClosed(true);
    }
  };

  const showSidebar = () => {
    if (isSidebarHoverable) {
      setSidebarClosed(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarClosed(!isSidebarClosed);
  };

  useEffect(() => {
    const handleResize = () => {
        setSidebarClosed(window.innerWidth < 800);
      setSidebarHoverable(!isSidebarLocked);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isSidebarLocked]);

  return (
    <div 
    onMouseEnter={showSidebar} onMouseLeave={hideSidebar}
   >
      <nav onMouseEnter={() => setSidebarHoverable(true)} className={`sidebar ${isSidebarLocked ? 'locked' : ''} ${isSidebarClosed ? 'close' : ''}`}
      
       >
        <div className="logo_items flex items-center">
          <span className="nav_image">
            <img src="small-logo_1.svg" alt="logo_img" />
          </span>
          <span className="logo_name"> <img src="logo-long.svg" alt="logo_img" /></span>
         
          
        </div>
        <div className="menu_container" >
      <div className="menu_items">
        <ul className="menu_item">
          <div className="menu_title flex items-center">
            <span className="title">Overview</span>
            <span className="line"></span>
          </div>
          <li className="item">
            <Link to="/" className="link flex items-center">
            <BiHomeAlt2  className='nav-logo'/>
              <span>Home</span>
            </Link>
          </li>
          <li className="item">
            <Link to="/Collections" className="link flex items-center">
            <BiGridAlt className='nav-logo'/>
              <span>Collections</span>
            </Link>
          </li>
          <li className="item">
            <Link to="/" className="link flex items-center">
            <BiFolder  className='nav-logo'/>
              <span>Library</span>
            </Link>
          </li>
        </ul>
        <ul className="menu_item">
          <div className="menu_title flex items-center">
            <span className="title">Editor</span>
            <span className="line"></span>
          </div>
          <li className="item">
            <Link to="/magic-build" className="link flex items-center">
            <BiAddToQueue  className='nav-logo'/>
              <span>New Collection</span>
            </Link>
          </li>
        </ul>
        <ul className="menu_item">
          <div className="menu_title flex items-center">
            <span className="title">Settings</span>
            <span className="line"></span>
          </div>
          <li className="item">
            <Link to="/notice-board" className="link flex items-center">
            <BiFlag  className='nav-logo'/>
              <span>Notice Board</span>
            </Link>
          </li>
       
          <li className="item">
            <Link to="/settings" className="link flex items-center">
            <TbSettings  className='nav-logo'/>
              <span>Settings</span>
            </Link>
          </li>
        </ul>
        
        <div className="sidebar_profile flex items-center">
          <span className="nav-user">
            <img src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" alt="logo_img" />
          </span>
          <div className="data_text">
            <span className="name">Vinicius</span>
          </div>
        </div>
      </div>
    </div>
        
      </nav>
      <BulkUpload
        isOpen={isBulkUploadModalOpen}
        handleCloseModal={closeBulkUploadModal}
      />
    </div>
  );
};


