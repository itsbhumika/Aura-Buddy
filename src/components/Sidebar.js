import React from 'react';
import {
  FaChartPie, FaBed, FaChartBar, FaTrophy, FaStickyNote,
  FaDumbbell, FaShareAlt, FaHeart, FaAppleAlt, FaSignOutAlt
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ active, onSelect }) => {
  const menuItems = [
    { icon: <FaChartPie />, label: 'Dashboard' },
    { icon: <FaBed />, label: 'Sleep Counter' },
    { icon: <FaChartBar />, label: 'Statistic' },
    { icon: <FaTrophy />, label: 'Achievements' },
    { icon: <FaStickyNote />, label: 'Note' },
    { icon: <FaDumbbell />, label: 'Workout Plan' },
    { icon: <FaShareAlt />, label: 'Sharing Center' }
  ];

  const quickActions = [
    { icon: <FaHeart />, label: 'Heart Rate' },
    { icon: <FaAppleAlt />, label: 'Nutrition And Health' }
  ];

  return (
    <aside className="sidebar">
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

      <div className="quick-actions">
        <h4>Quick actions</h4>
        <ul>
          {quickActions.map(({ icon, label }) => (
            <li
              key={label}
              className={active === label ? 'active' : ''}
              onClick={() => onSelect(label)}
            >
              {icon} {label}
            </li>
          ))}
        </ul>
      </div>

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
