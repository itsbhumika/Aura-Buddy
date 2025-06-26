"use client"

import React, { useState, useEffect, useMemo } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from "recharts"
import { FaPlus, FaMinus, FaTint, FaBed, FaUtensils } from "react-icons/fa"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

// CSS animations for expand/collapse
const slideDownAnimation = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

// Inject the animation styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = slideDownAnimation
  document.head.appendChild(style)
}

const GLASS_BG = {
  background: "rgba(255,255,255,0.18)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1.5px solid rgba(255,255,255,0.25)",
  borderRadius: "24px",
}

const glassCard = (props = {}) => ({
  ...GLASS_BG,
  padding: "32px",
  marginBottom: "32px",
  ...props,
})

const COLORS = ["#a78bfa", "#f472b6", "#60a5fa", "#facc15", "#34d399"]

function Statistics({ stats, customGoals: propCustomGoals }) {
  const [view, setView] = useState("weekly")
  const [localStats, setLocalStats] = useState(stats)
  const [filteredData, setFilteredData] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [showInsights, setShowInsights] = useState(true)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [showAddWorkout, setShowAddWorkout] = useState(false)
  const [newWorkout, setNewWorkout] = useState({ type: "Jogging", minutes: 30, note: "" })
  const [editCategory, setEditCategory] = useState(null)
  const [editMinutes, setEditMinutes] = useState(0)
  const [expandedAddButton, setExpandedAddButton] = useState(null)
  const [expandedNutritionButton, setExpandedNutritionButton] = useState(null)
  const [nutritionInputs, setNutritionInputs] = useState({})

  const [customGoals, setCustomGoals] = useState(propCustomGoals || {
    calories: 2500,
    protein: 100,
    carbs: 350,
    fats: 100,
    fiber: 30,
    sugar: 50,
    water: 3,
    sleep: 8,
    weeklyExerciseMinutes: 150,
  })

  const days = useMemo(() => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], [])
  const months = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], [])

  const totalWeeklyMinutes = useMemo(
    () => localStats.weeklyExercise.reduce((a, b) => a + b, 0),
    [localStats.weeklyExercise],
  )
  const leastPerformed = useMemo(
    () => Object.entries(localStats.exerciseCategories).sort((a, b) => a[1] - b[1])[0]?.[0] || "N/A",
    [localStats.exerciseCategories],
  )
  const maxDayIndex = useMemo(
    () => localStats.weeklyExercise.indexOf(Math.max(...localStats.weeklyExercise)),
    [localStats.weeklyExercise],
  )
  const pieData = useMemo(
    () => Object.entries(localStats.exerciseCategories).map(([name, value]) => ({ name, value })),
    [localStats.exerciseCategories],
  )

  const categoryInfo = {
    Badminton: {
      benefits: "Agility, reflexes, coordination",
      goal: 120,
      baseCaloriesPerMin: 5,
      muscles: "Arms, legs, core",
      mood: "Energetic",
      icon: "🏸",
      color: "#a78bfa", // purple
    },
    Jogging: {
      benefits: "Cardio, endurance",
      goal: 100,
      baseCaloriesPerMin: 5,
      muscles: "Legs, glutes, core",
      mood: "Relaxed",
      icon: "🏃",
      color: "#f472b6", // pink
    },
    Cycling: {
      benefits: "Leg strength, cardio",
      goal: 90,
      baseCaloriesPerMin: 4,
      muscles: "Quads, hamstrings, calves",
      mood: "Tired",
      icon: "🚴",
      color: "#60a5fa", // blue
    },
    Swimming: {
      benefits: "Full body workout, lung capacity",
      goal: 60,
      baseCaloriesPerMin: 6,
      muscles: "Shoulders, back, core",
      mood: "Refreshed",
      icon: "🏊",
      color: "#facc15", // yellow
    },
    "Body Building": {
      benefits: "Muscle growth, strength",
      goal: 90,
      baseCaloriesPerMin: 7,
      muscles: "Chest, arms, legs",
      mood: "Empowered",
      icon: "💪",
      color: "#34d399", // green
    },
    Walking: {
      benefits: "Cardio, endurance",
      goal: 100,
      baseCaloriesPerMin: 5,
      muscles: "Legs, glutes, core",
      mood: "Relaxed",
      icon: "🚶",
      color: "#ffb347", // orange
    },
    Yoga: {
      benefits: "Flexibility, strength",
      goal: 60,
      baseCaloriesPerMin: 4,
      muscles: "Core, arms, legs",
      mood: "Calm",
      icon: "🧘",
      color: "#b980f0", // violet
    },
  }

  const mealSuggestions = {
    protein: {
      Low: ["🍢 Paneer Tikka (Veg)", "🥘 Tofu Stir Fry (Keto)", "🥗 Chickpea Salad (Gluten-Free)"],
      High: ["Reduce red meat", "Skip protein shakes"],
    },
    carbs: {
      Low: ["🌾 Oats (Veg)", "🍠 Sweet potato (Keto)", "🍛 Rice and lentils (Gluten-Free)"],
      High: ["Avoid white bread", "Cut back on desserts"],
    },
    fats: {
      Low: ["🥪 Avocado Toast (Veg)", "🍯 Almond Butter (Keto)", "🌻 Mixed Seeds (Gluten-Free)"],
      High: ["Avoid fried food", "Use less oil"],
    },
    sugar: {
      Low: ["🍓 Fruit Salad (Veg)", "🫐 Berries & Yogurt (Keto)", "🍎 Apple slices (Gluten-Free)"],
      High: ["Avoid soda", "Cut down on sweets"],
    },
    fiber: {
      Low: ["🍌 Oats & Banana (Veg)", "🍮 Chia pudding (Keto)", "🍵 Boiled Lentils (Gluten-Free)"],
      High: ["Avoid excess bran", "Reduce fiber bars"],
    },
    calories: {
      Low: ["🍲 Smoothie Bowl (Veg)", "🥜 Nuts & Cheese (Keto)", "🍶 Granola + Yogurt (Gluten-Free)"],
      High: ["Avoid snacking", "Reduce portion size"],
    },
  }

  useEffect(() => {
    if (view === "daily") {
      const data = days.map((day, index) => ({
        day,
        minutes: localStats.weeklyExercise[index] || 0,
      }))
      setFilteredData(data)
    } else if (view === "weekly") {
      // Show last 4 weeks of data
      const weeklyData = [
        { day: "Week 1", minutes: Math.floor(Math.random() * 200) + 100 },
        { day: "Week 2", minutes: Math.floor(Math.random() * 200) + 120 },
        { day: "Week 3", minutes: Math.floor(Math.random() * 200) + 90 },
        { day: "This Week", minutes: localStats.weeklyExercise.reduce((a, b) => a + b, 0) },
      ]
      setFilteredData(weeklyData)
    } else if (view === "monthly") {
      // Show last 6 months of data
      const monthlyData = months.map((month, index) => ({
        day: month,
        minutes: Math.floor(Math.random() * 400) + 200 + index * 20, // Trending upward
      }))
      setFilteredData(monthlyData)
    }
  }, [view, localStats, days, months])

  useEffect(() => {
    if (propCustomGoals) {
      setCustomGoals(propCustomGoals)
    }
  }, [propCustomGoals])

  const handleFullReset = () => {
    setShowResetConfirm(false)
    setLocalStats({
      weeklyExercise: Array(7).fill(0),
      water: 0,
      sleep: 0,
      exerciseCategories: Object.fromEntries(Object.keys(localStats.exerciseCategories).map((k) => [k, 0])),
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      fiber: 0,
      sugar: 0,
    })
  }

  const handleAddWorkout = () => {
    const idx = (new Date().getDay() + 6) % 7
    const updated = [...localStats.weeklyExercise]
    updated[idx] = (updated[idx] || 0) + Number(newWorkout.minutes)
    setLocalStats((s) => ({
      ...s,
      weeklyExercise: updated,
      exerciseCategories: {
        ...s.exerciseCategories,
        [newWorkout.type]: (s.exerciseCategories[newWorkout.type] || 0) + Number(newWorkout.minutes),
      },
    }))
    setShowAddWorkout(false)
    setNewWorkout({ type: "Jogging", minutes: 30, note: "" })
  }

  const handleEditCategory = (cat) => {
    setEditCategory(cat)
    setEditMinutes(localStats.exerciseCategories[cat])
  }

  const handleSaveCategory = () => {
    setLocalStats((s) => ({
      ...s,
      exerciseCategories: { ...s.exerciseCategories, [editCategory]: Number(editMinutes) },
    }))
    setEditCategory(null)
  }

  const handleCardChange = (key, val) => {
    setLocalStats((s) => ({ ...s, [key]: val }))
  }

  if (!localStats || !Array.isArray(localStats.weeklyExercise)) {
    return <div>Loading stats or invalid data...</div>
  }

  

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px 40px 40px 40px",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <div
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

      {/* Reset Confirmation */}
      {showResetConfirm && (
        <div
          style={{
            background: "#fff9c4",
            border: "2px solid #fcd34d",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "24px",
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: 16, fontSize: "1.1rem" }}>
            Are you sure you want to reset all your stats?
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={handleFullReset}
              style={{
                padding: "8px 16px",
                background: "#f87171",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Yes, Reset
            </button>
            <button
              onClick={() => setShowResetConfirm(false)}
              style={{
                padding: "8px 16px",
                background: "#a7f3d0",
                color: "#065f46",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          marginBottom: "48px",
        }}
      >
        {/* Weekly Workouts Chart */}
        <div style={glassCard({ gridColumn: "span 2" })}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "32px",
              flexWrap: "wrap",
              gap: "24px",
            }}
          >
            <h2 style={{ margin: 0, color: "#6366f1", fontSize: "1.8rem", fontWeight: "700" }}>
              📉{" "}
              {view === "daily"
                ? "Daily Workout Minutes"
                : view === "weekly"
                ? "Weekly Workout Totals"
                : "Monthly Workout Trends"}
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap", justifyContent: "flex-end" }}>
              {/* View Toggle */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  ...GLASS_BG,
                  padding: "12px",
                  width: "fit-content",
                }}
                role="tablist"
                aria-label="Select statistics view"
              >
                {["daily", "weekly", "monthly"].map((value) => (
                  <button
                    key={value}
                    onClick={() => setView(value)}
                    aria-label={`Switch to ${value} view`}
                    style={{
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "12px",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      background: view === value ? "linear-gradient(90deg, #a78bfa, #f472b6)" : "transparent",
                      color: view === value ? "#fff" : "#6366f1",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </button>
                ))}
              </div>
              <button
                className="plus-glass-btn"
                style={{
                  width: expandedAddButton === "workout" ? "110px" : "44px",
                  height: "44px",
                  borderRadius: expandedAddButton === "workout" ? "22px" : "50%",
                  fontSize: expandedAddButton === "workout" ? "0.95rem" : "1.3rem",
                  background: "linear-gradient(90deg,#a78bfa,#f472b6)",
                  color: "#fff",
                  position: "relative",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.3s cubic-bezier(.4,1.3,.6,1)",
                  boxShadow: "0 4px 16px rgba(140, 122, 230, 0.13), 0 1.5px 6px rgba(140, 122, 230, 0.09)",
                  cursor: "pointer",
                  outline: expandedAddButton === "workout" ? "2px solid #f472b6" : "none",
                  zIndex: 2,
                }}
                aria-label={expandedAddButton === "workout" ? "Cancel add workout" : "Add workout"}
                tabIndex={0}
                onClick={() => {
                  if (expandedAddButton === "workout") {
                    setExpandedAddButton(null)
                  } else {
                    setExpandedAddButton("workout")
                  }
                }}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    if (expandedAddButton === "workout") {
                      setExpandedAddButton(null)
                    } else {
                      setExpandedAddButton("workout")
                    }
                  }
                }}
                title={expandedAddButton === "workout" ? "Cancel" : "Add Workout"}
              >
                <span className="plus-sign" style={{
                  display: "inline-block",
                  transform: expandedAddButton === "workout" ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform 0.3s cubic-bezier(.4,1.3,.6,1)",
                  color: "#fff",
                  fontSize: expandedAddButton === "workout" ? "1.1em" : "1.5em",
                  marginRight: expandedAddButton === "workout" ? "6px" : 0
                }}>+</span>
                {expandedAddButton === "workout" && "Cancel"}
              </button>
              {/* Expanded Add Workout Form */}
              {expandedAddButton === "workout" && (
                <div style={{
                  ...GLASS_BG,
                  padding: "20px",
                  marginTop: "16px",
                  borderRadius: "16px",
                  animation: "slideDown 0.3s ease",
                  minWidth: 260,
                  maxWidth: 340,
                  position: "absolute",
                  right: 0,
                  top: "70px",
                  zIndex: 10,
                  boxShadow: "0 8px 32px #0002"
                }}>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      if (newWorkout.minutes > 0) {
                        const newWorkoutData = {
                          ...newWorkout,
                          date: new Date().toISOString().split('T')[0]
                        };
                        setLocalStats(prev => ({
                          ...prev,
                          weeklyExercise: [...prev.weeklyExercise, newWorkoutData.minutes],
                          exerciseCategories: {
                            ...prev.exerciseCategories,
                            [newWorkoutData.type]: (prev.exerciseCategories[newWorkoutData.type] || 0) + newWorkoutData.minutes
                          }
                        }));
                        setNewWorkout({ type: "Jogging", minutes: 30, note: "" });
                        setExpandedAddButton(null);
                      }
                    }}
                    style={{ display: "flex", flexDirection: "column", gap: "12px" }}
                    aria-label="Add new workout form"
                  >
                    <select
                      value={newWorkout.type}
                      onChange={e => setNewWorkout({ ...newWorkout, type: e.target.value })}
                      style={{
                        flex: 1,
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        background: "rgba(255,255,255,0.1)",
                        color: "#222",
                        fontSize: "0.95rem"
                      }}
                    >
                      <option value="Jogging">Jogging</option>
                      <option value="Cycling">Cycling</option>
                      <option value="Swimming">Swimming</option>
                      <option value="Yoga">Yoga</option>
                      <option value="Body Building">Body Building</option>
                      <option value="Walking">Walking</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Minutes"
                      value={newWorkout.minutes}
                      min={1}
                      onChange={e => setNewWorkout({ ...newWorkout, minutes: parseInt(e.target.value) || 0 })}
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        background: "rgba(255,255,255,0.1)",
                        color: "#222",
                        fontSize: "0.95rem"
                      }}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Add a note (optional)"
                      value={newWorkout.note}
                      onChange={e => setNewWorkout({ ...newWorkout, note: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        background: "rgba(255,255,255,0.1)",
                        color: "#222",
                        fontSize: "0.95rem"
                      }}
                    />
                    <div style={{ display: "flex", gap: "12px" }}>
                      <button
                        type="submit"
                        style={{
                          flex: 1,
                          padding: "12px",
                          borderRadius: "8px",
                          background: "linear-gradient(90deg,#a78bfa,#f472b6)",
                          border: "none",
                          color: "#fff",
                          fontWeight: 600,
                          cursor: "pointer",
                          fontSize: "0.95rem"
                        }}
                      >
                        Save Workout
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setNewWorkout({ type: "Jogging", minutes: 30, note: "" });
                          setExpandedAddButton(null);
                        }}
                        style={{
                          padding: "12px 20px",
                          borderRadius: "8px",
                          background: "rgba(255,255,255,0.1)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          color: "#fff",
                          cursor: "pointer",
                          fontSize: "0.95rem"
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="minutes" fill="#a78bfa" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          {/* Dynamic insights based on view */}
          {view === "daily" && (
            <p style={{ marginTop: "16px", fontSize: "1.3rem", fontWeight: "600" }}>
              Most active: <strong>{days[maxDayIndex]}</strong> with{" "}
              <span style={{ color: "#a78bfa", fontWeight: "bold" }}>{localStats.weeklyExercise[maxDayIndex]} min</span>
            </p>
          )}
          {view === "weekly" && (
            <p style={{ marginTop: "16px", fontSize: "1.3rem", fontWeight: "600" }}>
              This week's total:{" "}
              <span style={{ color: "#a78bfa", fontWeight: "bold" }}>
                {localStats.weeklyExercise.reduce((a, b) => a + b, 0)} minutes
              </span>
            </p>
          )}
          {view === "monthly" && (
            <p style={{ marginTop: "16px", fontSize: "1.3rem", fontWeight: "600" }}>
              Monthly average:{" "}
              <span style={{ color: "#a78bfa", fontWeight: "bold" }}>
                {Math.round(filteredData.reduce((sum, item) => sum + item.minutes, 0) / filteredData.length)} minutes
              </span>
            </p>
          )}
        </div>

        {/* Exercise Breakdown */}
        <div style={glassCard({ maxWidth: 550, minHeight: 450, margin: '0 auto 48px auto', width: '100%', padding: '22px 24px', marginBottom: '4px' })}>
          <h2 style={{ color: "#6366f1", marginBottom: "-30px", fontSize: "1.5rem", textAlign: 'center' }}>🏋 Exercise Breakdown</h2>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "0px", width: '100%' }}>
            <div style={{ width: '100%', maxWidth: 650 }}>
              <ResponsiveContainer width="100%" height={600}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    outerRadius={120}
                    innerRadius={50}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                    style={{ outline: "none" }}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={categoryInfo[entry.name]?.color || COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} min`, "Minutes"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "10px",
              marginTop: "-100px",
            }}
          >
            {Object.entries(localStats.exerciseCategories).map(([cat, min]) => (
              <div
                key={cat}
                style={{
                  ...GLASS_BG,
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "12px",
                }}
              >
                <span style={{ color: categoryInfo[cat]?.color, fontSize: "1.2rem" }}>{categoryInfo[cat]?.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{cat}</div>
                  {editCategory === cat ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
                      <input
                        type="number"
                        value={editMinutes}
                        min={0}
                        onChange={(e) => setEditMinutes(e.target.value)}
                        style={{
                          width: "60px",
                          borderRadius: "6px",
                          padding: "4px",
                          border: "1px solid #d1d5db",
                          fontSize: "0.8rem",
                        }}
                      />
                      <button
                        onClick={handleSaveCategory}
                        style={{
                          color: "#34d399",
                          background: "none",
                          border: "none",
                          fontWeight: 700,
                          cursor: "pointer",
                          fontSize: "0.8rem",
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditCategory(null)}
                        style={{
                          color: "#f87171",
                          background: "none",
                          border: "none",
                          fontWeight: 700,
                          cursor: "pointer",
                          fontSize: "0.8rem",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                      <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>{min} min</span>
                      <button
                        onClick={() => handleEditCategory(cat)}
                        style={{
                          color: "#6366f1",
                          background: "none",
                          border: "none",
                          fontWeight: 700,
                          cursor: "pointer",
                          fontSize: "0.8rem",
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Smart Recommendations */}
        <div style={glassCard({ maxWidth: 550, minHeight: 390, width: '100%', padding: '0 24px', flex: 1, display: 'flex', flexDirection: 'column', marginTop: '-5px' })}>
          <h2 style={{ color: "#6366f1", marginBottom: "20px", fontSize: "1.5rem" }}>💡 Smart Recommendations</h2>
          <div style={{ fontSize: "1rem", color: "#6b7280", lineHeight: 1.6 }}>
            {totalWeeklyMinutes < customGoals.weeklyExerciseMinutes * 0.5 ? (
              <div
                style={{
                  padding: "20px",
                  background: "rgba(245, 158, 11, 0.1)",
                  borderRadius: "12px",
                  border: "2px solid #f59e0b",
                }}
              >
                <p style={{ margin: 0, color: "#f59e0b", fontWeight: "600" }}>
                  🚀 You're just getting started! Try adding {leastPerformed} for variety - it's great for{" "}
                  {categoryInfo[leastPerformed]?.benefits}.
                </p>
              </div>
            ) : totalWeeklyMinutes < customGoals.weeklyExerciseMinutes ? (
              <div
                style={{
                  padding: "20px",
                  background: "rgba(96, 165, 250, 0.1)",
                  borderRadius: "12px",
                  border: "2px solid #60a5fa",
                }}
              >
                <p style={{ margin: 0, color: "#60a5fa", fontWeight: "600" }}>
                  💪 Great progress! Add {Math.ceil((customGoals.weeklyExerciseMinutes - totalWeeklyMinutes) / 7)} more
                  minutes daily to reach your goal.
                </p>
              </div>
            ) : (
              <div
                style={{
                  padding: "20px",
                  background: "rgba(52, 211, 153, 0.1)",
                  borderRadius: "12px",
                  border: "2px solid #34d399",
                }}
              >
                <p style={{ margin: 0, color: "#34d399", fontWeight: "600" }}>
                🥳  Excellent! You've exceeded your weekly goal. Consider trying {leastPerformed} to balance your
                  routine.
                </p>
              </div>
            )}
          </div>

          <div
            style={{ marginTop: "20px", padding: "16px", background: "rgba(255,255,255,0.1)", borderRadius: "12px" }}
          >
            <h4 style={{ margin: "0 0 12px 0", color: "#6366f1", fontSize: "1rem" }}>📊 Your Progress</h4>
            <div style={{ display: "flex", justifyContent: "space-around", gap: "20px" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#a78bfa" }}>{totalWeeklyMinutes}</div>
                <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>Total Minutes</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#f472b6" }}>
                  {Math.round((totalWeeklyMinutes / customGoals.weeklyExerciseMinutes) * 100)}%
                </div>
                <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>Goal Progress</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#34d399" }}>
                  {Math.round(totalWeeklyMinutes * 5.5)}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>Est. Calories</div>
              </div>
            </div>
          </div>

          {/* Exercise Tips */}
          <div
            style={{ marginTop: "20px", padding: "16px", background: "rgba(255,255,255,0.1)", borderRadius: "12px" }}
          >
            <h4 style={{ margin: "0 0 12px 0", color: "#6366f1", fontSize: "1rem" }}>🌟 Exercise Tips</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
              <div style={{ padding: "12px", background: "rgba(167, 139, 250, 0.1)", borderRadius: "8px" }}>
                <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "#a78bfa", marginBottom: "4px" }}>
                  🏃 Best Time to Exercise
                </div>
                <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                  Morning workouts boost metabolism for the entire day
                </div>
              </div>
              <div style={{ padding: "12px", background: "rgba(244, 114, 182, 0.1)", borderRadius: "8px" }}>
                <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "#f472b6", marginBottom: "4px" }}>
                  💧 Stay Hydrated
                </div>
                <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                  Drink water 30 minutes before and after exercise
                </div>
              </div>
              <div style={{ padding: "12px", background: "rgba(52, 211, 153, 0.1)", borderRadius: "8px" }}>
                <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "#34d399", marginBottom: "4px" }}>
                🔀 Mix It Up
                </div>
                <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                  Combine cardio and strength training for best results
                </div>
              </div>
              <div style={{ padding: "12px", background: "rgba(250, 204, 21, 0.1)", borderRadius: "8px" }}>
                <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "#facc15", marginBottom: "4px" }}>
                  😴 Recovery Time
                </div>
                <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                  Allow 48 hours rest between intense muscle group workouts
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Health Metrics Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "40px",
          marginBottom: "48px",
        }}
      >
        {/* Calories */}
        <div style={glassCard({ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" })}>
          <h3 style={{ color: "#f472b6", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <FaUtensils /> Calories
          </h3>
          <div style={{ width: "120px", height: "120px", marginBottom: "16px" }}>
            <CircularProgressbar
              value={Math.min((localStats.calories / customGoals.calories) * 100, 100)}
              text={`${localStats.calories}`}
              styles={buildStyles({
                pathColor: "#f472b6",
                textColor: "#f472b6",
                trailColor: "#fde68a",
                textSize: "16px",
              })}
            />
          </div>
          <div style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: "12px" }}>
            Goal: {customGoals.calories} kcal
          </div>

          {/* Add Calories Input */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <input
              type="number"
              min="0"
              max="2000"
              placeholder="Add calories"
              style={{
                width: "100px",
                padding: "6px 8px",
                borderRadius: "6px",
                border: "2px solid #f472b6",
                textAlign: "center",
                fontSize: "0.9rem",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const addValue = Number(e.target.value) || 0
                  if (addValue > 0) {
                    handleCardChange("calories", localStats.calories + addValue)
                    e.target.value = ""
                  }
                }
              }}
            />
            <button
              onClick={(e) => {
                const input = e.target.parentElement.querySelector("input")
                const addValue = Number(input.value) || 0
                if (addValue > 0) {
                  handleCardChange("calories", localStats.calories + addValue)
                  input.value = ""
                }
              }}
              style={{
                ...GLASS_BG,
                color: "#f472b6",
                border: "1px solid #f472b6",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: 600,
              }}
            >
              Add
            </button>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => handleCardChange("calories", Math.max(0, localStats.calories - 50))}
              style={{
                ...GLASS_BG,
                color: "#f472b6",
                border: "none",
                padding: "8px 12px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <FaMinus />
            </button>
            <button
              onClick={() => handleCardChange("calories", localStats.calories + 50)}
              style={{
                ...GLASS_BG,
                color: "#f472b6",
                border: "none",
                padding: "8px 12px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <FaPlus />
            </button>
          </div>
        </div>

        {/* Sleep */}
        <div style={glassCard({ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" })}>
          <h3 style={{ color: "#60a5fa", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px", fontSize: "1.6rem", fontWeight: "700" }}>
            <FaBed /> Sleep
          </h3>
          <div style={{ width: "120px", height: "120px", marginBottom: "16px" }}>
            <CircularProgressbar
              value={Math.min((localStats.sleep / customGoals.sleep) * 100, 100)}
              text={`${localStats.sleep}h`}
              styles={buildStyles({
                pathColor: "#60a5fa",
                textColor: "#60a5fa",
                trailColor: "#fde68a",
                textSize: "16px",
              })}
            />
          </div>
          <div style={{ fontSize: "1.1rem", color: "#6b7280", marginBottom: "12px", fontWeight: "600" }}>
            Goal: {customGoals.sleep} hours
          </div>

          {/* Add Sleep Input */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <input
              type="number"
              min="0"
              max="12"
              step="0.5"
              placeholder="Add hours"
              style={{
                width: "100px",
                padding: "6px 8px",
                borderRadius: "6px",
                border: "2px solid #60a5fa",
                textAlign: "center",
                fontSize: "0.9rem",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const addValue = Number(e.target.value) || 0
                  if (addValue > 0) {
                    handleCardChange("sleep", Math.min(24, localStats.sleep + addValue))
                    e.target.value = ""
                  }
                }
              }}
            />
            <button
              onClick={(e) => {
                const input = e.target.parentElement.querySelector("input")
                const addValue = Number(input.value) || 0
                if (addValue > 0) {
                  handleCardChange("sleep", Math.min(24, localStats.sleep + addValue))
                  input.value = ""
                }
              }}
              style={{
                ...GLASS_BG,
                color: "#60a5fa",
                border: "1px solid #60a5fa",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: 600,
              }}
            >
              Add
            </button>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => handleCardChange("sleep", Math.max(0, localStats.sleep - 0.5))}
              style={{
                ...GLASS_BG,
                color: "#60a5fa",
                border: "none",
                padding: "8px 12px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <FaMinus />
            </button>
            <button
              onClick={() => handleCardChange("sleep", localStats.sleep + 0.5)}
              style={{
                ...GLASS_BG,
                color: "#60a5fa",
                border: "none",
                padding: "8px 12px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <FaPlus />
            </button>
          </div>
        </div>

        {/* Water */}
        <div style={glassCard({ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" })}>
          <h3 style={{ color: "#34d399", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px", fontSize: "1.6rem", fontWeight: "700" }}>
            <FaTint /> Water
          </h3>
          <div style={{ width: "120px", height: "120px", marginBottom: "16px" }}>
            <CircularProgressbar
              value={Math.min((localStats.water / customGoals.water) * 100, 100)}
              text={`${localStats.water}L`}
              styles={buildStyles({
                pathColor: "#34d399",
                textColor: "#34d399",
                trailColor: "#fde68a",
                textSize: "16px",
              })}
            />
          </div>
          <div style={{ fontSize: "1.1rem", color: "#6b7280", marginBottom: "12px", fontWeight: "600" }}>
            Goal: {customGoals.water} liters
          </div>

          {/* Add Water Input */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <input
              type="number"
              min="0"
              max="5000"
              step="50"
              placeholder="Add ml"
              style={{
                width: "100px",
                padding: "6px 8px",
                borderRadius: "6px",
                border: "2px solid #34d399",
                textAlign: "center",
                fontSize: "0.9rem",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const addValue = Number(e.target.value) || 0
                  if (addValue > 0) {
                    handleCardChange("water", Math.round((localStats.water + addValue / 1000) * 100) / 100)
                    e.target.value = ""
                  }
                }
              }}
            />
            <button
              onClick={(e) => {
                const input = e.target.parentElement.querySelector("input")
                const addValue = Number(input.value) || 0
                if (addValue > 0) {
                  handleCardChange("water", Math.round((localStats.water + addValue / 1000) * 100) / 100)
                  input.value = ""
                }
              }}
              style={{
                ...GLASS_BG,
                color: "#34d399",
                border: "1px solid #34d399",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: 600,
              }}
            >
              Add
            </button>
          </div>

          {/* Quick Add Buttons */}
          <div
            style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap", justifyContent: "center" }}
          >
            <button
              className="plus-glass-btn"
              onClick={() => handleCardChange("water", Math.round((localStats.water + 0.25) * 100) / 100)}
            >
              <span className="plus-sign">+</span> Glass <span style={{ fontSize: '0.8em', fontWeight: 400 }}>(250ml)</span>
            </button>
            <button
              className="plus-glass-btn"
              onClick={() => handleCardChange("water", Math.round((localStats.water + 0.5) * 100) / 100)}
            >
              <span className="plus-sign">+</span> Bottle <span style={{ fontSize: '0.8em', fontWeight: 400 }}>(500ml)</span>
            </button>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => handleCardChange("water", Math.max(0, localStats.water - 0.25))}
              style={{
                ...GLASS_BG,
                color: "#34d399",
                border: "none",
                padding: "8px 12px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <FaMinus />
            </button>
            <button
              onClick={() => handleCardChange("water", localStats.water + 0.25)}
              style={{
                ...GLASS_BG,
                color: "#34d399",
                border: "none",
                padding: "8px 12px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <FaPlus />
            </button>
          </div>
        </div>
      </div>

      {/* Nutrition Tracker */}
      <div style={glassCard()}>
        <h2 style={{ color: "#6366f1", marginBottom: "24px", fontSize: "1.8rem", fontWeight: "700" }}>🧑‍🍳 Nutrition Tracker</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          {Object.entries(customGoals)
            .filter(([key]) => !["water", "sleep", "weeklyExerciseMinutes"].includes(key))
            .map(([key, goal]) => {
              const actual = Number.parseFloat(localStats[key]) || 0
              let color = "#fde047" // darker pastel yellow for low
              if (actual > goal * 1.1) color = "#fca5a5" // darker pastel red for high
              else if (actual > goal * 0.9) color = "#86efac" // darker pastel green for ok

              // Add controlled input state for each nutrient
              const inputValue = nutritionInputs[key] || ""

              return (
                <div
                  key={key}
                  style={{
                    ...GLASS_BG,
                    padding: "16px",
                    borderRadius: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    position: "relative",
                  }}
                >
                  {/* Add Button - Positioned in top-right corner */}
                  <button
                    className="plus-glass-btn"
                    style={{
                      width: expandedNutritionButton === key ? "110px" : "44px",
                      height: "44px",
                      borderRadius: expandedNutritionButton === key ? "22px" : "50%",
                      fontSize: expandedNutritionButton === key ? "0.95rem" : "1.3rem",
                      background: "linear-gradient(90deg,#34d399,#10b981)",
                      color: "#fff",
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      transition: "all 0.3s cubic-bezier(.4,1.3,.6,1)",
                      boxShadow: "0 4px 16px rgba(52, 211, 153, 0.13), 0 1.5px 6px rgba(52, 211, 153, 0.09)",
                      cursor: "pointer",
                      outline: expandedNutritionButton === key ? "2px solid #10b981" : "none",
                      zIndex: 10,
                    }}
                    aria-label={expandedNutritionButton === key ? `Cancel add ${key}` : `Add ${key}`}
                    tabIndex={0}
                    onClick={() => {
                      if (expandedNutritionButton === key) {
                        setExpandedNutritionButton(null)
                      } else {
                        setExpandedNutritionButton(key)
                      }
                    }}
                    onKeyDown={e => {
                      if (e.key === "Enter" || e.key === " ") {
                        if (expandedNutritionButton === key) {
                          setExpandedNutritionButton(null)
                        } else {
                          setExpandedNutritionButton(key)
                        }
                      }
                    }}
                    title={expandedNutritionButton === key ? "Cancel" : `Add ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                  >
                    <span className="plus-sign" style={{
                      display: "inline-block",
                      transform: expandedNutritionButton === key ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.3s cubic-bezier(.4,1.3,.6,1)",
                      color: "#fff",
                      fontSize: expandedNutritionButton === key ? "1.1em" : "1.5em",
                      marginRight: expandedNutritionButton === key ? "6px" : 0
                    }}>+</span>
                    {expandedNutritionButton === key && `Cancel`}
                  </button>
                  
                  <label htmlFor={`nutrient-${key}`} style={{ fontWeight: "bold", fontSize: "1.2rem", paddingRight: "50px" }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "1.1rem", color: "#6b7280", fontWeight: "600" }}>
                      {actual} / {goal}
                    </span>
                    <span
                      style={{ fontSize: "1.2rem" }}
                      title={
                        actual < goal * 0.9
                          ? "Below recommended"
                          : actual > goal * 1.1
                            ? "Above recommended"
                            : "Within recommended"
                      }
                    >
                      {actual < goal * 0.9 ? "⚠️" : actual > goal * 1.1 ? "🔴" : "✅"}
                    </span>
                  </div>
                  
                  {/* Custom Progress Bar */}
                  <div style={{
                      width: "100%",
                      height: "8px",
                      background: "#f3e8ff",
                    borderRadius: "4px",
                    overflow: "hidden",
                    position: "relative"
                  }}>
                    <div style={{
                      width: `${Math.min((actual / goal) * 100, 100)}%`,
                      height: "100%",
                      background: color,
                      borderRadius: "4px",
                      transition: "width 0.3s ease"
                    }} />
                  </div>
                  
                  {/* Expandable Input */}
                  {expandedNutritionButton === key && (
                    <div style={{
                      ...GLASS_BG,
                      padding: "16px",
                      marginTop: "12px",
                      borderRadius: "12px",
                      animation: "slideDown 0.3s ease"
                    }}>
                      <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
                        <input
                          type="number"
                          placeholder="Amount"
                          min="0"
                          aria-label={`Add amount for ${key}`}
                          value={inputValue}
                          onChange={e => setNutritionInputs(inputs => ({ ...inputs, [key]: e.target.value }))}
                          style={{
                            flex: 1,
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid rgba(255,255,255,0.2)",
                            background: "#fff",
                            color: "#1e293b",
                            fontSize: "0.9rem"
                          }}
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              const value = parseFloat(inputValue) || 0
                              if (value > 0) {
                                setLocalStats(prev => ({
                                  ...prev,
                                  [key]: (prev[key] || 0) + value
                                }));
                                setNutritionInputs(inputs => ({ ...inputs, [key]: "" }));
                                setExpandedNutritionButton(null);
                              }
                            }
                          }}
                        />
                        <button
                          aria-label={`Add ${inputValue} to ${key}`}
                          onClick={() => {
                            const value = parseFloat(inputValue) || 0
                            if (value > 0) {
                              setLocalStats(prev => ({
                                ...prev,
                                [key]: (prev[key] || 0) + value
                              }));
                              setNutritionInputs(inputs => ({ ...inputs, [key]: "" }));
                              setExpandedNutritionButton(null);
                            }
                          }}
                          style={{
                            padding: "10px 16px",
                            borderRadius: "8px",
                            background: "linear-gradient(90deg,#34d399,#10b981)",
                            border: "none",
                            color: "#fff",
                            fontWeight: 600,
                            cursor: "pointer",
                            fontSize: "0.9rem"
                          }}
                        >
                          Add
                        </button>
                      </div>
                      
                      {/* Quick Add Buttons */}
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
                        {[10, 25, 50, 100].map(amount => (
                          <button
                            key={amount}
                            className="plus-glass-btn"
                            onClick={() => {
                              setLocalStats(prev => ({
                                ...prev,
                                [key]: (prev[key] || 0) + amount
                              }));
                              setNutritionInputs(inputs => ({ ...inputs, [key]: "" }));
                              setExpandedNutritionButton(null);
                            }}
                          >
                            <span className="plus-sign">+</span>{amount}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {/* Nutrient Alerts */}
          <div>
            <h4 style={{ color: "#f59e0b", marginBottom: "16px", fontSize: "1.4rem", fontWeight: "700" }}>🚨 Nutrient Alerts</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {(() => {
                const alerts = Object.entries(customGoals)
                  .filter(([key]) => mealSuggestions[key]) // Only include nutrients with meal suggestions
                  .reduce((acc, [key, goal]) => {
                    const actual = Number.parseFloat(localStats[key]) || 0
                    if (actual < goal * 0.9) acc.push({ type: "Low", nutrient: key })
                    else if (actual > goal * 1.1) acc.push({ type: "High", nutrient: key })
                    return acc
                  }, [])
                return alerts.length ? (
                  alerts.map((a, i) => (
                    <li
                      key={i}
                      style={{
                        padding: "8px 12px",
                        marginBottom: "8px",
                        background: a.type === "Low" ? "#fef3c7" : "#fee2e2",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      {a.type === "Low" ? "⚠️" : "🚨"} {a.type} {a.nutrient}
                    </li>
                  ))
                ) : (
                  <li
                    style={{
                      padding: "8px 12px",
                      background: "#d1fae5",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    ✅ All nutrients within range
                  </li>
                )
              })()}
            </ul>
          </div>

          {/* Meal Suggestions */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <h4 style={{ color: "#34d399", margin: 0, fontSize: "1.4rem", fontWeight: "700" }}>🍽️ Meal Suggestions</h4>
              <button
                onClick={() => setShowSuggestions(!showSuggestions)}
                style={{
                  background: "none",
                  border: "1px solid #34d399",
                  color: "#34d399",
                  padding: "4px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                {showSuggestions ? "Hide" : "Show"}
              </button>
            </div>

            {showSuggestions && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {(() => {
                  const alerts = Object.entries(customGoals)
                    .filter(([key]) => mealSuggestions[key]) // Only include nutrients with meal suggestions
                    .reduce((acc, [key, goal]) => {
                      const actual = Number.parseFloat(localStats[key]) || 0
                      if (actual < goal * 0.9) acc.push({ type: "Low", nutrient: key })
                      else if (actual > goal * 1.1) acc.push({ type: "High", nutrient: key })
                      return acc
                    }, [])

                  return alerts.length ? (
                    alerts.map((a, i) => (
                      <div
                        key={i}
                        style={{
                          ...GLASS_BG,
                          padding: "16px",
                          borderRadius: "12px",
                        }}
                      >
                        <h5
                          style={{
                            margin: "0 0 12px 0",
                            color: a.type === "Low" ? "#f59e0b" : "#ef4444",
                          }}
                        >
                          {a.type === "Low" ? "⚠️ Low" : "🚨 High"} in{" "}
                          {a.nutrient.charAt(0).toUpperCase() + a.nutrient.slice(1)}
                        </h5>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                          {mealSuggestions[a.nutrient] && mealSuggestions[a.nutrient][a.type] ? (
                            mealSuggestions[a.nutrient][a.type].slice(0, 3).map((s, j) => (
                              <li
                                key={j}
                                style={{
                                  padding: "4px 0",
                                  fontSize: "0.9rem",
                                  color: "#6b7280",
                                }}
                              >
                                {s}
                              </li>
                            ))
                          ) : (
                            <li style={{ padding: "4px 0", fontSize: "0.9rem", color: "#6b7280" }}>
                              No suggestions available
                            </li>
                          )}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        ...GLASS_BG,
                        padding: "16px",
                        borderRadius: "12px",
                        textAlign: "center",
                      }}
                    >
                      <h5 style={{ margin: "0", color: "#34d399" }}>✅ All nutrients within range</h5>
                    </div>
                  )
                })()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div style={glassCard()}>
        <h4
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            margin: "0 0 20px 0",
            color: "#6366f1",
            fontSize: "1.8rem",
            fontWeight: "700"
          }}
          onClick={() => setShowInsights((v) => !v)}
          tabIndex={0}
          aria-label="Toggle insights section"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setShowInsights((v) => !v)
            }
          }}
        >
        🔍 Insights
          <span style={{ fontSize: "1.2em", marginLeft: 8 }}>{showInsights ? "▲" : "▼"}</span>
        </h4>
        {showInsights && (
          <>
            <p style={{ fontWeight: "bold", marginBottom: "20px", fontSize: "1.3rem" }}>Insights for the last 7 days</p>
            
            {/* Enhanced Circular Progress Charts with Daily Activity */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "16px",
                justifyItems: "center",
                marginTop: "35px",
                marginBottom: "32px"
              }}
            >
              {localStats.weeklyExercise.map((minutes, index) => {
                const day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]
                const percentage = Math.round((minutes / 60) * 100) // Assuming 60 min goal
                const calories = Math.round(minutes * 6.5) // Rough estimate: 6.5 kcal per minute
                
                // Activity type based on exercise categories
                const activityTypes = {
                  'Jogging': '🏃',
                  'Cycling': '🚴',
                  'Swimming': '🏊',
                  'Yoga': '🧘',
                  'Strength': '🏋️',
                  'Walking': '🚶',
                  'Running': '🏃‍♂️',
                  'Body Building': '🏋️'
                }
                
                // Determine most common activity for this day by cycling through available activities
                const activityKeys = Object.keys(localStats.exerciseCategories || {})
                const activityName = activityKeys.length > 0 ? activityKeys[index % activityKeys.length] : 'Exercise'
                const activityIcon = activityKeys.length > 0 ? activityTypes[activityName] || '💪' : '💪'
                
                // Color logic
                let pathColor
                if (percentage >= 80) {
                  pathColor = "#22c55e" // Green
                } else if (percentage >= 50) {
                  pathColor = "#eab308" // Yellow
                } else {
                  pathColor = "#ef4444" // Red
                }
                
                return (
                  <div
                    key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                      gap: "6px",
                      textAlign: "center",
                      minWidth: "0"
                  }}
                >
                    <div style={{ width: "70px", height: "70px", position: "relative" }}>
                    <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                      styles={buildStyles({
                          textSize: "11px",
                          pathColor: pathColor,
                          trailColor: "#f3e8ff",
                          textColor: "#374151",
                      })}
                    />
                  </div>
                    <div style={{ fontSize: "0.75rem", fontWeight: "600", color: "#374151", lineHeight: "1.2" }}>
                      {percentage}% {day}
                </div>
                    <div style={{ fontSize: "0.65rem", color: "#6b7280", lineHeight: "1.2" }}>
                      {activityIcon} {activityName}
                    </div>
                    <div style={{ fontSize: "0.6rem", color: "#6b7280" }}>
                      {minutes} min | 🔥 {calories} kcal
                    </div>
                    {/* Badge */}
                    <div style={{
                      padding: "2px 4px",
                      borderRadius: "8px",
                      fontSize: "0.55rem",
                      fontWeight: "600",
                      background: percentage >= 80 ? "#dcfce7" : percentage >= 50 ? "#fef3c7" : "#fee2e2",
                      color: percentage >= 80 ? "#22c55e" : percentage >= 50 ? "#eab308" : "#ef4444"
                    }}>
                      {percentage >= 80 ? "🟢 Goal Met" : percentage >= 50 ? "🟡 Almost There" : "🔴 Below Goal"}
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* Streak and Pattern Analysis */}
            <div style={{ marginBottom: "32px" }}>
              <h4 style={{ color: "#6366f1", marginBottom: "16px", fontSize: "1.2rem", fontWeight: "600", display: 'flex', alignItems: 'center', gap: 6 }}>🔥 Streak & Pattern Analysis</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
                {/* Current Streak */}
                <div style={{
                  ...GLASS_BG,
                  padding: "16px",
                  borderRadius: "12px"
                }}>
                  <h5 style={{ margin: "0 0 12px 0", color: "#f59e0b", fontSize: "1rem", display: 'flex', alignItems: 'center', gap: 6 }}>🔥 Current Streak</h5>
                  {(() => {
                    let streak = 0
                    for (let i = localStats.weeklyExercise.length - 1; i >= 0; i--) {
                      if (localStats.weeklyExercise[i] > 0) streak++
                      else break
                    }
                    return (
                      <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#f59e0b" }}>
                        {streak} {streak === 1 ? 'day' : 'days'} in a row
                      </div>
                    )
                  })()}
                </div>
                
                {/* Most/Least Active Days */}
                <div style={{
                  ...GLASS_BG,
                  padding: "16px",
                  borderRadius: "12px"
                }}>
                  <h5 style={{ margin: "0 0 12px 0", color: "#10b981", fontSize: "1rem" }}>📈 Activity Highlights</h5>
                  {(() => {
                    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    const maxIndex = localStats.weeklyExercise.indexOf(Math.max(...localStats.weeklyExercise))
                    const minIndex = localStats.weeklyExercise.indexOf(Math.min(...localStats.weeklyExercise))
                    return (
                      <div style={{ fontSize: "0.9rem" }}>
                        <div style={{ marginBottom: "8px" }}>
                          🏆 Most Active: <strong>{days[maxIndex]}</strong> ({localStats.weeklyExercise[maxIndex]} min)
                        </div>
                        <div>
                          📉 Least Active: <strong>{days[minIndex]}</strong> ({localStats.weeklyExercise[minIndex]} min)
                        </div>
                      </div>
                    )
                  })()}
                </div>
              </div>
            </div>
            
            {/* Tips Based on Patterns */}
            <div style={{ marginBottom: "32px" }}>
              <h4 style={{ color: "#6366f1", marginBottom: "16px", fontSize: "1.2rem", fontWeight: "600" }}>💡 Smart Tips</h4>
              <div style={{
                ...GLASS_BG,
                padding: "20px",
                borderRadius: "12px"
              }}>
                {(() => {
                  const tips = []
                  const totalMinutes = localStats.weeklyExercise.reduce((a, b) => a + b, 0)
                  const avgMinutes = totalMinutes / 7
                  const activeDays = localStats.weeklyExercise.filter(min => min > 0).length
                  
                  if (activeDays >= 5) {
                    tips.push("🎉 Excellent consistency! You're working out most days of the week.")
                  } else if (activeDays >= 3) {
                    tips.push("👍 Good effort! Try to add 1-2 more workout days for better results.")
                  } else {
                    tips.push("💪 Start with 3-4 workout days per week to build a healthy habit.")
                  }
                  
                  if (avgMinutes >= 45) {
                    tips.push("🔥 Great intensity! You're averaging over 45 minutes per active day.")
                  } else if (avgMinutes >= 30) {
                    tips.push("⚡ Good duration! Consider adding 10-15 more minutes for enhanced benefits.")
                  } else {
                    tips.push("⏱️ Try to aim for at least 30 minutes of exercise per session.")
                  }
                  
                  // Check for weekend vs weekday patterns
                  const weekdayAvg = (localStats.weeklyExercise[0] + localStats.weeklyExercise[1] + localStats.weeklyExercise[2] + localStats.weeklyExercise[3] + localStats.weeklyExercise[4]) / 5
                  const weekendAvg = (localStats.weeklyExercise[5] + localStats.weeklyExercise[6]) / 2
                  
                  if (weekendAvg > weekdayAvg * 1.5) {
                    tips.push("📅 You're more active on weekends! Try to maintain some activity during weekdays too.")
                  } else if (weekdayAvg > weekendAvg * 1.5) {
                    tips.push("🏠 Great weekday routine! Don't forget to stay active on weekends for balance.")
                  }
                  
                  return (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {tips.map((tip, index) => (
                        <div key={index} style={{
                          padding: "12px",
                          background: "rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                          fontSize: "0.95rem",
                          lineHeight: "1.4"
                        }}>
                          {tip}
                        </div>
                      ))}
                    </div>
                  )
                })()}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add Workout Modal */}
      {showAddWorkout && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              ...glassCard({
                minWidth: "320px",
                maxWidth: "400px",
                width: "100%",
              }),
            }}
          >
            <h3 style={{ color: "#a78bfa", marginBottom: "20px" }}>Log Workout</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Type:</label>
                <select
                  value={newWorkout.type}
                  onChange={(e) => setNewWorkout((w) => ({ ...w, type: e.target.value }))}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "8px",
                    border: "1px solid #d1d5db",
                  }}
                >
                  {Object.keys(localStats.exerciseCategories).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Minutes:</label>
                <input
                  type="number"
                  min={1}
                  value={newWorkout.minutes}
                  onChange={(e) =>
                    setNewWorkout((w) => ({ ...w, minutes: Math.max(1, Number.parseInt(e.target.value) || 0) }))
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "8px",
                    border: "1px solid #d1d5db",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Note:</label>
                <input
                  type="text"
                  value={newWorkout.note}
                  onChange={(e) => setNewWorkout((w) => ({ ...w, note: e.target.value }))}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "8px",
                    border: "1px solid #d1d5db",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              <button
                onClick={handleAddWorkout}
                style={{
                  flex: 1,
                  ...GLASS_BG,
                  color: "#fff",
                  background: "linear-gradient(90deg,#a78bfa,#f472b6)",
                  border: "none",
                  padding: "12px 18px",
                  fontWeight: 600,
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Add
              </button>
              <button
                onClick={() => setShowAddWorkout(false)}
                style={{
                  flex: 1,
                  ...GLASS_BG,
                  color: "#6b7280",
                  background: "none",
                  border: "1px solid #d1d5db",
                  padding: "12px 18px",
                  fontWeight: 600,
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>

            {expandedAddButton === "workout" && (
              <div style={{
                ...GLASS_BG,
            padding: "20px",
                marginTop: "16px",
                borderRadius: "16px",
                animation: "slideDown 0.3s ease"
              }}>
                <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                  <select
                    value={newWorkout.type}
                    onChange={(e) => setNewWorkout({...newWorkout, type: e.target.value})}
            style={{
                      flex: 1,
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.2)",
                      background: "rgba(255,255,255,0.1)",
                      color: "#fff",
                      fontSize: "0.95rem"
                    }}
                  >
                    <option value="Jogging">Jogging</option>
                    <option value="Cycling">Cycling</option>
                    <option value="Swimming">Swimming</option>
                    <option value="Yoga">Yoga</option>
                    <option value="Body Building">Body Building</option>
                    <option value="Walking">Walking</option>
                  </select>
                      <input
                        type="number"
                    placeholder="Minutes"
                    value={newWorkout.minutes}
                    onChange={(e) => setNewWorkout({...newWorkout, minutes: parseInt(e.target.value) || 0})}
                        style={{
                      width: "100px",
                      padding: "12px",
                          borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.2)",
                      background: "rgba(255,255,255,0.1)",
                      color: "#fff",
                      fontSize: "0.95rem"
                    }}
                  />
                    </div>
                      <input
                  type="text"
                  placeholder="Add a note (optional)"
                  value={newWorkout.note}
                  onChange={(e) => setNewWorkout({...newWorkout, note: e.target.value})}
                        style={{
                    width: "100%",
                    padding: "12px",
                          borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.1)",
                    color: "#fff",
                    fontSize: "0.95rem",
                    marginBottom: "16px"
                  }}
                />
                <div style={{ display: "flex", gap: "12px" }}>
              <button
                    onClick={() => {
                      if (newWorkout.minutes > 0) {
                        const newWorkoutData = {
                          ...newWorkout,
                          date: new Date().toISOString().split('T')[0]
                        }
                        setLocalStats((prev) => ({
                          ...prev,
                          weeklyExercise: [...prev.weeklyExercise, newWorkoutData.minutes],
                          exerciseCategories: {
                            ...prev.exerciseCategories,
                            [newWorkoutData.type]: (prev.exerciseCategories[newWorkoutData.type] || 0) + newWorkoutData.minutes
                          }
                        }))
                        setNewWorkout({ type: "Jogging", minutes: 30, note: "" })
                        setExpandedAddButton(null)
                      }
                    }}
                style={{
                      flex: 1,
                      padding: "12px",
                  borderRadius: "8px",
                      background: "linear-gradient(90deg,#a78bfa,#f472b6)",
                      border: "none",
                      color: "#fff",
                  fontWeight: 600,
                      cursor: "pointer",
                      fontSize: "0.95rem"
                }}
              >
                    Save Workout
              </button>
              <button
                    onClick={() => {
                      setNewWorkout({ type: "Jogging", minutes: 30, note: "" })
                      setExpandedAddButton(null)
                    }}
                style={{
                      padding: "12px 20px",
                  borderRadius: "8px",
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#fff",
                  cursor: "pointer",
                      fontSize: "0.95rem"
                }}
              >
                    Cancel
              </button>
            </div>
              </div>
            )}
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
              maxWidth: "500px",
              width: "100%",
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            }}
          >
            <h2 style={{ color: "#a78bfa", marginTop: 0, marginBottom: "20px" }}>How to use your Dashboard</h2>
            <ul style={{ fontSize: "1.1em", paddingLeft: 20, lineHeight: 1.6 }}>
              <li>
                Switch between <b>Daily, Weekly, Monthly</b> views using the tabs.
              </li>
              <li>
                Click <b>Save Changes</b> to store your progress (watch for confetti!).
              </li>
              <li>
                Use <b>Reset All</b> to clear your stats (confirmation required).
              </li>
              <li>Hover or focus on icons and progress bars for more info.</li>
              <li>All controls are keyboard accessible and screen reader friendly.</li>
            </ul>
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
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Statistics
