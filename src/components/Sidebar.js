import React from 'react';
import {
  FaChartPie, FaBed, FaChartBar, FaTrophy, FaStickyNote,
  FaDumbbell, FaShareAlt, FaSignOutAlt
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ active, onSelect, visible, onClose }) => {
  const menuItems = [
    { icon: <FaChartPie />, label: 'Dashboard' },
    { icon: <FaBed />, label: 'Sleep Counter' },
    { icon: <FaChartBar />, label: 'Statistic' },
    { icon: <FaTrophy />, label: 'Achievements' },
    { icon: <FaStickyNote />, label: 'Note' },
    { icon: <FaDumbbell />, label: 'Workout Plan' },
    { icon: <FaShareAlt />, label: 'Sharing Center' }
  ];

  return (
    <aside className={`sidebar ${visible ? 'open' : ''}`}>
      {/* Close Button */}
      <button
        onClick={onClose}
        className="close-sidebar-btn"
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          background: 'none',
          border: 'none',
          fontSize: 24,
          color: '#888',
          cursor: 'pointer',
          zIndex: 1001,
        }}
        aria-label="Close Sidebar"
        title="Close Sidebar"
      >
        &times;
      </button>

      <h2 className="logo">Aura Buddy </h2>

      <ul className="nav-list">
        {menuItems.map(({ icon, label }) => (
          <li
            key={label}
            className={active === label ? 'active' : ''}
            onClick={() => onSelect(label)}
          >
            {icon} {label}
          </li>
        ))}
      </ul>

      <div
        className="logout"
        onClick={() => onSelect('Logout')}
        style={{ color: active === 'Logout' ? '#dc2626' : '' }}
      >
        <FaSignOutAlt /> Log Out
      </div>
    </aside>
  );
};

export default Sidebar;
