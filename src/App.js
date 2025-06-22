import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Statistics from "./components/Statistics";
import WorkoutPanel from "./components/WorkoutPanel";
import RunTracker from "./components/RunTracker";
import "./App.css";
import SleepCounter from "./components/SleepCounter"; 

const Placeholder = ({ title, description }) => (
  <div className="placeholder">
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
);

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [activeView, setActiveView] = useState("Dashboard");

  // ✅ Updated state with extended workout data
  const [stats, setStats] = useState({
    calories: 2250,
    weight: 65,
    sleepHours: 7.5,
    activeMinutes: 90,
    waterIntake: 2.5,
    steps: 10500,
    heartRate: 65,
    weeklyExercise: [20, 30, 45, 70, 50, 40, 30],
    exerciseCategories: {
      Badminton: 150,
      Jogging: 100,
      "Body Building": 80,
      Swimming: 60,
    }
  });

  // ✅ All routes/views get access to current stats
  const views = {
    Dashboard: () => (
      <div className="content-grid">
        <div className="left-panel">
          <Statistics stats={stats} setStats={setStats} />
          <WorkoutPanel />
        </div>
        <RunTracker />
      </div>
    ),
    "Sleep Counter": () => <SleepCounter />,
    Statistic: () => <Statistics stats={stats} setStats={setStats} />,
    Achievements: () => (
      <Placeholder
        title="Achievements"
        description="View your fitness milestones and accomplishments."
      />
    ),
    Note: () => (
      <Placeholder
        title="Notes"
        description="Keep track of your workout notes, meals, and progress logs."
      />
    ),
    "Workout Plan": () => <WorkoutPanel />,
    "Sharing Center": () => (
      <Placeholder
        title="Sharing Center"
        description="Connect and share your fitness journey with friends and community."
      />
    ),
    "Heart Rate": () => (
      <Placeholder
        title="Heart Rate Monitor"
        description="Monitor your heart rate in real-time with connected devices."
      />
    ),
    "Nutrition And Health": () => (
      <Placeholder
        title="Nutrition & Health"
        description="Get personalized diet and nutrition suggestions."
      />
    ),
    Logout: () => (
      <Placeholder
        title="Logged Out"
        description="You have been logged out successfully."
      />
    )
  };

  const ViewComponent = views[activeView] || (() => <div>Page Not Found</div>);

  return (
    <div className="app-container">
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        onSelect={setActiveView}
        active={activeView}
      />
      <main className="main-content">
        <Topbar onToggleSidebar={() => setSidebarVisible(!sidebarVisible)} />
        <ViewComponent />
      </main>
    </div>
  );
}

export default App;
