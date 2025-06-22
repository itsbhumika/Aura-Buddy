import React from "react";
import { FaFireAlt, FaHeartbeat, FaRunning, FaPause } from "react-icons/fa";
import "./RunTracker.css";

const RunTracker = () => {
  return (
    <aside className="run-tracker">
      <h3>Run at Lapang Cicoreog</h3>
      <p className="date">20.04.2023</p>
      <div className="stats-icons">
        <div><FaFireAlt /> <span>256</span> Calories</div>
        <div><FaHeartbeat /> <span>65</span> Heart Rate</div>
        <div><FaRunning /> <span>1,054</span> Steps</div>
      </div>
      <div className="run-timer">
        <h4>Time, 03:20:12</h4>
        <p>2.01 KM</p>
        <button><FaPause /></button>
      </div>
      <div className="monitoring">
        <h5>Real Time Monitoring</h5>
        <p>Off</p>
      </div>
      <div className="burned">
        <h5>Calories Burned</h5>
        <div className="burned-bar">
          <div style={{ width: '20%' }}></div>
        </div>
        <span>20%</span>
      </div>
    </aside>
  );
};

export default RunTracker;
