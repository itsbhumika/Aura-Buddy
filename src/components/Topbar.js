import React from 'react';
import './Topbar.css';
import { FaBars, FaSearch } from 'react-icons/fa';

const Topbar = ({ onToggleSidebar }) => {
  return (
    <header className="topbar">
      <div className="left-section">
        <FaBars className="menu-toggle" onClick={onToggleSidebar} />
        <h1 className="title">Daily Counter</h1>
      </div>

      <div className="right-section">
        <div className="search-box">
          <FaSearch />
          <input type="text" placeholder="Search..." />
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          alt="Profile"
          className="profile-pic"
        />
      </div>
    </header>
  );
};

export default Topbar;

