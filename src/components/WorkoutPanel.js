import React from 'react';
import './WorkoutPanel.css';
import { FaEllipsisH } from 'react-icons/fa';

const tasks = [
  { name: 'Plank', count: '30 Minutes' },
  { name: 'Squats', count: '20x' },
  { name: 'Push Ups', count: '40x' },
  { name: 'Sit Ups', count: '60x' },
  { name: 'Jumping', count: '40x' },
];

const WorkoutPanel = () => {
  return (
    <div className="workout-panel">
      <div className="cycling-sport">
        <div className="left">
          <span className="badge">Popular Classes</span>
          <h3>Cycling Sport</h3>
          <p>Cycling helps strengthen leg muscles and improve cardiovascular health.</p>
        </div>
        <div className="right">
          <img src="https://cdn-icons-png.flaticon.com/512/4332/4332688.png" alt="cycling" />
        </div>
      </div>

      <div className="home-workouts">
        <div className="header">
          <h4>Home Workouts</h4>
          <span>Task (3/5)</span>
          <FaEllipsisH />
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <span>{task.name}</span>
              <span>{task.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkoutPanel;

