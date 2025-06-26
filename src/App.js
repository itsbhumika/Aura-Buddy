import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import Statistics from "./components/Statistics";
import WorkoutPanel from "./components/WorkoutPanel";
import "./App.css";
import SleepCounter, { triggerSleepAnimation } from "./components/SleepCounter";
import { FaSave, FaUndo, FaQuestionCircle } from "react-icons/fa";
import Dashboard from "./components/Dashboard";
import Achievements from './components/Achievements';

const Placeholder = ({ title, description }) => (
  <div className="placeholder">
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
);

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [activeView, setActiveView] = useState("Dashboard");
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [customGoals, setCustomGoals] = useState({
    calories: 2500,
    protein: 100,
    carbs: 350,
    fats: 100,
    fiber: 30,
    sugar: 50,
    water: 3,
    sleep: 8,
    weeklyExerciseMinutes: 150,
  });
  const [tempGoals, setTempGoals] = useState(customGoals);
  const confettiRef = useRef(null);

  const [stats, setStats] = useState({
    calories: 4901,
    weight: 80.2,
    sleep: 7.5,
    activeMinutes: 90,
    water: 5,
    steps: 5902,
    heartRate: 65,
    weeklyExercise: [20, 30, 45, 70, 50, 40, 30],
    exerciseCategories: {
      Jogging: 120,
      "Body Building": 90,
      Swimming: 80,
      Cycling: 70,
      Yoga: 60,
      Walking: 50,
    }
  });

  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showHeader, setShowHeader] = useState(true);
  const mainContentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (mainContentRef.current) {
        const scrollTop = mainContentRef.current.scrollTop;
        setShowHeader(scrollTop < 100);
      }
    };

    const mainContent = mainContentRef.current;
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll);
      return () => mainContent.removeEventListener('scroll', handleScroll);
    }
  }, [currentPage]);

  useEffect(() => {
    const savedGoals = localStorage.getItem("userGoals")
    if (savedGoals) {
      const parsed = JSON.parse(savedGoals)
      setCustomGoals(parsed)
      setTempGoals(parsed)
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("userStats", JSON.stringify(stats));
    triggerConfetti();
  };

  const handleReset = () => {
    setShowResetConfirm(true);
  };

  const handleFullReset = () => {
    setShowResetConfirm(false);
    setStats({
      weeklyExercise: Array(7).fill(0),
      water: 0,
      sleep: 0,
      exerciseCategories: Object.fromEntries(Object.keys(stats.exerciseCategories).map((k) => [k, 0])),
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      fiber: 0,
      sugar: 0,
    });
  };

  const handleHelp = () => {
    setShowHelp(true);
  };

  const handleSetGoals = () => {
    setTempGoals(customGoals);
    setShowGoalsModal(true);
  };

  const handleSaveGoals = () => {
    setCustomGoals(tempGoals);
    localStorage.setItem("userGoals", JSON.stringify(tempGoals));
    setShowGoalsModal(false);
    triggerConfetti();
  };

  const handleResetGoals = () => {
    const defaultGoals = {
      calories: 2500,
      protein: 100,
      carbs: 350,
      fats: 100,
      fiber: 30,
      sugar: 50,
      water: 3,
      sleep: 8,
      weeklyExerciseMinutes: 150,
    }
    setTempGoals(defaultGoals)
  };

  const handleGoalChange = (metric, value) => {
    setTempGoals((prev) => ({
      ...prev,
      [metric]: Math.max(0, Number(value)),
    }));
  };

  const triggerConfetti = () => {
    if (!confettiRef.current) return
    confettiRef.current.innerHTML = ""
    for (let i = 0; i < 24; i++) {
      const span = document.createElement("span")
      span.textContent = ["🎉", "✨", "🥳", "🎊"][i % 4]
      span.style.position = "absolute"
      span.style.left = Math.random() * 100 + "%"
      span.style.top = "50%"
      span.style.fontSize = "2rem"
      span.style.transform = `translateY(0) scale(${0.8 + Math.random() * 0.6})`
      span.style.transition = "transform 1.2s cubic-bezier(.4,2,.6,1), opacity 1.2s"
      setTimeout(() => {
        span.style.transform = `translateY(-${80 + Math.random() * 40}px) scale(${0.8 + Math.random() * 0.6})`
        span.style.opacity = 0
      }, 10)
      confettiRef.current.appendChild(span)
    }
    setTimeout(() => {
      if (confettiRef.current) confettiRef.current.innerHTML = ""
    }, 1400)
  };

  // Reusable Header Component with Menu Icon
  const HeaderWithMenu = ({ title, dark = false, sidebarVisible = false }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
      const handleScroll = () => {
        if (mainContentRef.current) {
          const scrollTop = mainContentRef.current.scrollTop;
          setIsVisible(scrollTop < 100);
        }
      };

      const mainContent = mainContentRef.current;
      if (mainContent) {
        mainContent.addEventListener('scroll', handleScroll);
        return () => mainContent.removeEventListener('scroll', handleScroll);
      }
    }, []);

    // Hide the header when sidebar is visible
    if (!isVisible || sidebarVisible) return null;

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 30px",
          background: "transparent",
          zIndex: 1000,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
      >
        {/* Left Side - Menu Icon */}
        <button
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(139, 92, 246, 0.2)",
            borderRadius: 10,
            padding: "8px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            backdropFilter: "blur(10px)",
            boxShadow: "0 2px 8px rgba(139, 92, 246, 0.1)",
            pointerEvents: "auto",
          }}
          onClick={() => setSidebarVisible(true)}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)"
            e.target.style.background = "rgba(255, 255, 255, 0.2)"
            e.target.style.boxShadow = "0 4px 12px rgba(139, 92, 246, 0.2)"
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)"
            e.target.style.background = "rgba(255, 255, 255, 0.1)"
            e.target.style.boxShadow = "0 2px 8px rgba(139, 92, 246, 0.1)"
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "100%",
                height: 2,
                background: "#8b5cf6",
                borderRadius: 2,
                opacity: 0.8,
              }}
            />
            <div
              style={{
                width: "70%",
                height: 2,
                background: "#8b5cf6",
                borderRadius: 2,
                opacity: 0.8,
              }}
            />
            <div
              style={{
                width: "100%",
                height: 2,
                background: "#8b5cf6",
                borderRadius: 2,
                opacity: 0.8,
              }}
            />
          </div>
        </button>

        {/* Right Side - Spacer for balance */}
        <div style={{ width: 36, height: 36, pointerEvents: "none" }} />
      </div>
    );
  };

  const handleSidebarSelect = (view) => {
    if (view === "Sleep Counter") {
      triggerSleepAnimation();
    }
    setActiveView(view);
  };

  function ViewComponent() {
    switch (activeView) {
      case "Dashboard":
        return <Dashboard stats={stats} onNavigate={setActiveView} onOpenSidebar={() => setSidebarVisible(true)} sidebarVisible={sidebarVisible} />;
      case "Sleep Counter":
        return (
          <>
            <HeaderWithMenu title="Sleep Counter" sidebarVisible={sidebarVisible} />
            <div>
              <SleepCounter />
            </div>
          </>
        );
      case "Statistic":
        return (
          <>
            <HeaderWithMenu title="Statistics" sidebarVisible={sidebarVisible} />
            <div>
              <Statistics stats={stats} customGoals={customGoals} />
            </div>
          </>
        );
      case "Achievements":
        return (
          <>
            <HeaderWithMenu title="Achievements" sidebarVisible={sidebarVisible} />
            <div>
              <Achievements />
            </div>
          </>
        );
      case "Note":
        return (
          <>
            <HeaderWithMenu title="Notes" sidebarVisible={sidebarVisible} />
            <div>
              <Placeholder title="Note" description="Write and view your personal fitness notes." />
            </div>
          </>
        );
      case "Workout Plan":
        return (
          <>
            <HeaderWithMenu title="Workout Plan" sidebarVisible={sidebarVisible} />
            <div>
              <WorkoutPanel />
            </div>
          </>
        );
      case "Sharing Center":
        return (
          <>
            <HeaderWithMenu title="Sharing Center" sidebarVisible={sidebarVisible} />
            <div>
              <Placeholder title="Sharing Center" description="Share your progress and connect with friends." />
            </div>
          </>
        );
      case "Heart Rate":
        return (
          <>
            <HeaderWithMenu title="Heart Rate" sidebarVisible={sidebarVisible} />
            <div>
              <Placeholder title="Heart Rate" description="Monitor your heart rate data here." />
            </div>
          </>
        );
      case "Nutrition And Health":
        return (
          <>
            <HeaderWithMenu title="Nutrition & Health" sidebarVisible={sidebarVisible} />
            <div>
              <Placeholder title="Nutrition & Health" description="Track your nutrition and health stats here." />
            </div>
          </>
        );
      default:
        return <Dashboard stats={stats} onNavigate={setActiveView} onOpenSidebar={() => setSidebarVisible(true)} sidebarVisible={sidebarVisible} />;
    }
  }

  return (
    <div className="app-container">
      <div
        ref={confettiRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 9999,
        }}
        aria-hidden="true"
      ></div>
      
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        onSelect={handleSidebarSelect}
        active={activeView}
      />
      <main className={`main-content ${sidebarVisible ? 'sidebar-open' : ''}`} ref={mainContentRef}>
        {/* Round Action Buttons */}
        {activeView === "Statistic" && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "10px",
              margin: "16px 0",
              flexWrap: "wrap",
              paddingRight: "20px",
            }}
          >
            <button
              aria-label="Set Goals"
              onClick={handleSetGoals}
              title="Set your fitness and nutrition goals"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                color: "#34d399",
                background: "rgba(255,255,255,0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                boxShadow: "0 4px 15px rgba(52, 211, 153, 0.2)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1)";
                e.target.style.boxShadow = "0 6px 20px rgba(52, 211, 153, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 4px 15px rgba(52, 211, 153, 0.2)";
              }}
            >
              <span role="img" aria-label="Set Goals" style={{marginRight: 2}}>🎯</span>
            </button>
            
            <button
              aria-label="Save Changes"
              onClick={handleSave}
              title="Save your current progress and data"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                color: "#fff",
                background: "linear-gradient(135deg, #a78bfa, #f472b6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.9rem",
                boxShadow: "0 4px 15px rgba(167, 139, 250, 0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1)";
                e.target.style.boxShadow = "0 6px 20px rgba(167, 139, 250, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 4px 15px rgba(167, 139, 250, 0.3)";
              }}
            >
              <FaSave style={{marginLeft: 2}} />
            </button>
            
            <button
              aria-label="Reset All Stats"
              onClick={handleReset}
              title="Reset all your statistics and data"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                color: "#f59e0b",
                background: "rgba(255,255,255,0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.9rem",
                boxShadow: "0 4px 15px rgba(245, 158, 11, 0.2)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1)";
                e.target.style.boxShadow = "0 6px 20px rgba(245, 158, 11, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 4px 15px rgba(245, 158, 11, 0.2)";
              }}
            >
              <FaUndo style={{marginLeft: 2}} />
            </button>
            
            <button
              aria-label="Help / Info"
              onClick={handleHelp}
              title="Get help and information about the app"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                color: "#a78bfa",
                background: "rgba(255,255,255,0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.9rem",
                boxShadow: "0 4px 15px rgba(167, 139, 250, 0.2)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1)";
                e.target.style.boxShadow = "0 6px 20px rgba(167, 139, 250, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 4px 15px rgba(167, 139, 250, 0.2)";
              }}
            >
              <FaQuestionCircle style={{marginLeft: 2}} />
            </button>
          </div>
        )}

        {/* Goals Modal */}
        {showGoalsModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.5)",
              zIndex: 10000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: "18px",
                padding: "32px",
                maxWidth: "600px",
                width: "100%",
                maxHeight: "80vh",
                overflowY: "auto",
                boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}
              >
                <h2 style={{ color: "#a78bfa", margin: 0 }}>🎯 Set Your Goals</h2>
                <button
                  onClick={handleResetGoals}
                  style={{
                    background: "none",
                    border: "1px solid #f59e0b",
                    color: "#f59e0b",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                  }}
                >
                  Reset to Defaults
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "20px",
                  marginBottom: "24px",
                }}
              >
                {/* Nutrition Goals */}
                <div>
                  <h3
                    style={{ color: "#f472b6", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    🥗 Nutrition Goals
                  </h3>
                  {[
                    { key: "calories", label: "Calories", unit: "kcal", min: 1000, max: 5000 },
                    { key: "protein", label: "Protein", unit: "g", min: 20, max: 300 },
                    { key: "carbs", label: "Carbohydrates", unit: "g", min: 50, max: 800 },
                    { key: "fats", label: "Fats", unit: "g", min: 20, max: 200 },
                    { key: "fiber", label: "Fiber", unit: "g", min: 10, max: 100 },
                    { key: "sugar", label: "Sugar", unit: "g", min: 10, max: 150 },
                  ].map(({ key, label, unit, min, max }) => (
                    <div key={key} style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, fontSize: "0.9rem" }}>
                        {label} ({unit})
                      </label>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <input
                          type="number"
                          min={min}
                          max={max}
                          value={tempGoals[key]}
                          onChange={(e) => handleGoalChange(key, e.target.value)}
                          style={{
                            flex: 1,
                            padding: "8px 12px",
                            borderRadius: "8px",
                            border: "2px solid #e5e7eb",
                            fontSize: "0.9rem",
                          }}
                        />
                        <span style={{ fontSize: "0.8rem", color: "#6b7280", minWidth: "60px" }}>
                          {min}-{max} {unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Lifestyle Goals */}
                <div>
                  <h3
                    style={{ color: "#60a5fa", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    🏃 Lifestyle Goals
                  </h3>
                  {[
                    { key: "water", label: "Water Intake", unit: "L", min: 1, max: 8, step: 0.25 },
                    { key: "sleep", label: "Sleep Duration", unit: "hours", min: 4, max: 12, step: 0.5 },
                    { key: "weeklyExerciseMinutes", label: "Weekly Exercise", unit: "min", min: 30, max: 1000, step: 15 },
                  ].map(({ key, label, unit, min, max, step }) => (
                    <div key={key} style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, fontSize: "0.9rem" }}>
                        {label} ({unit})
                      </label>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <input
                          type="number"
                          min={min}
                          max={max}
                          step={step || 1}
                          value={tempGoals[key]}
                          onChange={(e) => handleGoalChange(key, e.target.value)}
                          style={{
                            flex: 1,
                            padding: "8px 12px",
                            borderRadius: "8px",
                            border: "2px solid #e5e7eb",
                            fontSize: "0.9rem",
                          }}
                        />
                        <span style={{ fontSize: "0.8rem", color: "#6b7280", minWidth: "60px" }}>
                          {min}-{max} {unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Goal Recommendations */}
              <div
                style={{
                  background: "#f0f9ff",
                  border: "1px solid #bae6fd",
                  borderRadius: "12px",
                  padding: "16px",
                  marginBottom: "24px",
                }}
              >
                <h4 style={{ color: "#0369a1", margin: "0 0 12px 0", fontSize: "1rem" }}>💡 Goal Recommendations</h4>
                <div style={{ fontSize: "0.9rem", color: "#0c4a6e", lineHeight: 1.5 }}>
                  <p style={{ margin: "0 0 8px 0" }}>
                    <strong>Calories:</strong> Generally 1,800-2,400 for women, 2,200-3,000 for men (varies by activity
                    level)
                  </p>
                  <p style={{ margin: "0 0 8px 0" }}>
                    <strong>Water:</strong> About 2.7L for women, 3.7L for men (including food sources)
                  </p>
                  <p style={{ margin: "0 0 8px 0" }}>
                    <strong>Exercise:</strong> WHO recommends 150+ minutes of moderate activity per week
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong>Sleep:</strong> 7-9 hours for most adults
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <button
                  onClick={() => setShowGoalsModal(false)}
                  style={{
                    padding: "12px 24px",
                    background: "none",
                    border: "1px solid #d1d5db",
                    color: "#6b7280",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveGoals}
                  style={{
                    padding: "12px 24px",
                    background: "linear-gradient(90deg, #a78bfa, #f472b6)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Save Goals
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reset Confirmation Modal */}
        {showResetConfirm && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.5)",
              zIndex: 10000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: "18px",
                padding: "32px",
                maxWidth: "400px",
                width: "100%",
                boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
              }}
            >
              <h2 style={{ color: "#f59e0b", marginTop: 0, marginBottom: "20px" }}>⚠️ Reset All Stats</h2>
              <p style={{ fontSize: "1.1em", lineHeight: 1.6, marginBottom: "24px" }}>
                Are you sure you want to reset all your statistics? This action cannot be undone.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  style={{
                    padding: "12px 24px",
                    background: "none",
                    border: "1px solid #d1d5db",
                    color: "#6b7280",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleFullReset}
                  style={{
                    padding: "12px 24px",
                    background: "#f87171",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Yes, Reset All
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Help Modal */}
        {showHelp && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.5)",
              zIndex: 10000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: "18px",
                padding: "32px",
                maxWidth: "600px",
                width: "100%",
                maxHeight: "80vh",
                overflowY: "auto",
                boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
              }}
            >
              <h2 style={{ color: "#a78bfa", marginTop: 0, marginBottom: "24px" }}>🙋 How to Use Your Dashboard</h2>
              
              <div style={{ marginBottom: "24px" }}>
                <h3 style={{ color: "#6366f1", marginBottom: "12px", fontSize: "1.2rem" }}>🎯 Set Goals</h3>
                <p style={{ margin: "0 0 16px 0", lineHeight: 1.6 }}>
                  Click to set your fitness, sleep, water, and nutrition goals. You can update them anytime.
                </p>

                <h3 style={{ color: "#6366f1", marginBottom: "12px", fontSize: "1.2rem" }}>💾 Save Changes</h3>
                <p style={{ margin: "0 0 16px 0", lineHeight: 1.6 }}>
                  Save all the updates made to your workouts, meals, or tracker inputs.
                </p>

                <h3 style={{ color: "#6366f1", marginBottom: "12px", fontSize: "1.2rem" }}>🔄 Reset All</h3>
                <p style={{ margin: "0 0 16px 0", lineHeight: 1.6 }}>
                  Clear all statistics and data from the dashboard (confirmation required).
                </p>

                <h3 style={{ color: "#6366f1", marginBottom: "12px", fontSize: "1.2rem" }}>📊 View Modes</h3>
                <p style={{ margin: "0 0 16px 0", lineHeight: 1.6 }}>
                  Switch between <strong>Daily, Weekly, or Monthly</strong> views to analyze your performance trends.
                </p>

                <h3 style={{ color: "#6366f1", marginBottom: "12px", fontSize: "1.2rem" }}>♿ Accessibility</h3>
                <p style={{ margin: "0 0 16px 0", lineHeight: 1.6 }}>
                  All controls are <strong>keyboard accessible</strong> and optimized for <strong>screen readers</strong>.
                </p>
              </div>

              <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "24px 0" }} />

              <div style={{ marginBottom: "24px" }}>
                <h3 style={{ color: "#6366f1", marginBottom: "16px", fontSize: "1.3rem" }}>🧭 Dashboard Walkthrough</h3>
                
                <h4 style={{ color: "#a78bfa", marginBottom: "8px", fontSize: "1.1rem" }}>📉 Weekly Workout Totals</h4>
                <p style={{ margin: "0 0 12px 0", lineHeight: 1.6 }}>
                  Shows your total workout minutes, goal comparison, and weekly trends. Click <strong>"Add Workout"</strong> to log activity.
                </p>

                <h4 style={{ color: "#a78bfa", marginBottom: "8px", fontSize: "1.1rem" }}>🏋 Exercise Breakdown</h4>
                <p style={{ margin: "0 0 12px 0", lineHeight: 1.6 }}>
                  Displays a pie chart and editable cards showing time spent on each activity. Click <strong>Edit</strong> to adjust durations.
                </p>

                <h4 style={{ color: "#a78bfa", marginBottom: "8px", fontSize: "1.1rem" }}>💡 Smart Recommendations</h4>
                <p style={{ margin: "0 0 12px 0", lineHeight: 1.6 }}>
                  Personalized suggestions based on your exercise balance and routine.
                </p>

                <h4 style={{ color: "#a78bfa", marginBottom: "8px", fontSize: "1.1rem" }}>📊 Your Progress</h4>
                <p style={{ margin: "0 0 12px 0", lineHeight: 1.6 }}>
                  Tracks total minutes, calories burned, and goal achievement percentage.
                </p>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <h3 style={{ color: "#6366f1", marginBottom: "16px", fontSize: "1.3rem" }}>🍽️ Nutrition & Hydration</h3>
                
                <h4 style={{ color: "#f472b6", marginBottom: "8px", fontSize: "1.1rem" }}>🧑‍🍳 Nutrition Tracker</h4>
                <p style={{ margin: "0 0 8px 0", lineHeight: 1.6 }}>
                  Track calories and macros (Protein, Carbs, Fats, Fiber, Sugar).
                </p>
                <ul style={{ margin: "0 0 12px 0", paddingLeft: "20px", lineHeight: 1.6 }}>
                  <li>Arrows ⬆ ⬇ show whether a value is above or below target.</li>
                  <li>Meal suggestions are tailored to fix deficiencies.</li>
                </ul>

                <h4 style={{ color: "#34d399", marginBottom: "8px", fontSize: "1.1rem" }}>💧 Water Tracker</h4>
                <p style={{ margin: "0 0 12px 0", lineHeight: 1.6 }}>
                  Tap +Glass or +Bottle to quickly log your water intake.
                </p>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <h3 style={{ color: "#6366f1", marginBottom: "16px", fontSize: "1.3rem" }}>🛌 Sleep & Recovery</h3>
                
                <h4 style={{ color: "#60a5fa", marginBottom: "8px", fontSize: "1.1rem" }}>💤 Sleep Tracker</h4>
                <p style={{ margin: "0 0 12px 0", lineHeight: 1.6 }}>
                  Enter your daily sleep hours. A bar helps you stay close to your sleep goal (e.g., 8h).
                </p>

                <h4 style={{ color: "#facc15", marginBottom: "8px", fontSize: "1.1rem" }}>🌟 Exercise Tips</h4>
                <p style={{ margin: "0 0 12px 0", lineHeight: 1.6 }}>
                  Includes quick tips for hydration, timing, rest, and workout diversity.
                </p>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <h3 style={{ color: "#6366f1", marginBottom: "16px", fontSize: "1.3rem" }}>❗ Alerts & Insights</h3>
                
                <h4 style={{ color: "#f59e0b", marginBottom: "8px", fontSize: "1.1rem" }}>🚨 Nutrient Alerts</h4>
                <p style={{ margin: "0 0 12px 0", lineHeight: 1.6 }}>
                  Highlights what's missing or excessive in your daily intake.
                </p>

                <h4 style={{ color: "#a78bfa", marginBottom: "8px", fontSize: "1.1rem" }}>🔍 Insights</h4>
                <p style={{ margin: "0 0 12px 0", lineHeight: 1.6 }}>
                  Shows your consistency and activity level over the past 7 days (chart-based).
                </p>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <h3 style={{ color: "#6366f1", marginBottom: "16px", fontSize: "1.3rem" }}>🛠️ Tips & Troubleshooting</h3>
                <ul style={{ margin: "0 0 12px 0", paddingLeft: "20px", lineHeight: 1.6 }}>
                  <li><strong>Workout not saving?</strong> Make sure your browser allows local storage.</li>
                  <li><strong>Nutrient data not updating?</strong> Try refreshing or re-entering values.</li>
                  <li><strong>Reset accidentally?</strong> Data cannot be recovered once reset—use cautiously!</li>
                </ul>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <h3 style={{ color: "#6366f1", marginBottom: "16px", fontSize: "1.3rem" }}>🚧 Features in Progress</h3>
                <ul style={{ margin: "0 0 12px 0", paddingLeft: "20px", lineHeight: 1.6 }}>
                  <li>Sidebar items like <code>Search</code>, <code>Profile</code>, etc. are currently static.</li>
                  <li>More interactive visualizations & animation effects coming soon.</li>
                  <li>Statistics section styling and detail expansion in next update.</li>
                </ul>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <h3 style={{ color: "#6366f1", marginBottom: "16px", fontSize: "1.3rem" }}>📬 Need More Help?</h3>
                <ul style={{ margin: "0 0 12px 0", paddingLeft: "20px", lineHeight: 1.6 }}>
                  <li>Reach out via [Support Email] or leave feedback</li>
                  <li>Feature suggestions welcome!</li>
                </ul>
              </div>

              <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "24px 0" }} />
              
              <p style={{ margin: "0", fontSize: "0.9rem", color: "#6b7280", textAlign: "center" }}>
                🔒 Your data stays on your device (localStorage based).
              </p>

              <button
                onClick={() => setShowHelp(false)}
                style={{
                  marginTop: "24px",
                  background: "#a78bfa",
                  color: "#fff",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 600,
                  width: "100%",
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}

        <ViewComponent />
      </main>
    </div>
  );
}

export default App;
