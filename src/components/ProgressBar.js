import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ percentage }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-fill" style={{ width: `${percentage}%` }}>
        <span className="progress-bar-text">{percentage}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
