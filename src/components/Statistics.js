import React, { useState, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { FaDumbbell, FaFire, FaTint } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Statistics.css';



const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#ff69b4"];

function Statistics({ stats, setStats }) {
  const [view, setView] = useState("weekly");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [localStats, setLocalStats] = useState(stats);
  const [filteredData, setFilteredData] = useState([]);
  const [temperature] = useState(30);
  const [customMl, setCustomMl] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [hydrationLog, setHydrationLog] = useState(() => Array(7).fill(0));

  const [undoStack, setUndoStack] = useState([]);
  const insightTab = "7d";


  const waterGoal = 3; // in Litres
  const waterPercentage = Math.min((localStats.waterIntake / waterGoal) * 100, 100);

  const days = useMemo(() => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], []);
  const months = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], []);

  const totalWeeklyMinutes = useMemo(() => localStats.weeklyExercise.reduce((a, b) => a + b, 0), [localStats.weeklyExercise]);
  const topExercise = useMemo(() => Object.entries(localStats.exerciseCategories).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A', [localStats.exerciseCategories]);
  const leastPerformed = useMemo(() => Object.entries(localStats.exerciseCategories).sort((a, b) => a[1] - b[1])[0]?.[0] || 'N/A', [localStats.exerciseCategories]);
  const maxDayIndex = useMemo(() => localStats.weeklyExercise.indexOf(Math.max(...localStats.weeklyExercise)), [localStats.weeklyExercise]);
  const pieData = useMemo(() => Object.entries(localStats.exerciseCategories).map(([name, value]) => ({ name, value })), [localStats.exerciseCategories]);

  useEffect(() => {
  if (view === "daily") {
    const data = days.map((day, index) => ({
      day,
      minutes: localStats.weeklyExercise[index] || 0
    }));
    setFilteredData(data);
  } else if (view === "weekly") {
    const total = localStats.weeklyExercise.reduce((a, b) => a + b, 0);
    setFilteredData([{ day: "This Week", minutes: total }]);
  } else if (view === "monthly") {
    const data = months.map((month) => ({
      day: month,
      minutes: Math.floor(Math.random() * 300)
    }));
    setFilteredData(data);
  }
}, [view, localStats, days, months]);

  const categoryInfo = useMemo(() => ({
    Badminton: {
      benefits: "Agility, reflexes, coordination",
      goal: 120,
      baseCaloriesPerMin: 5,
      muscles: "Arms, legs, core",
      mood: "Energetic"
    },
    Jogging: {
      benefits: "Cardio, endurance",
      goal: 100,
      baseCaloriesPerMin: 5,
      muscles: "Legs, glutes, core",
      mood: "Relaxed"
    },
    Cycling: {
      benefits: "Leg strength, cardio",
      goal: 90,
      baseCaloriesPerMin: 4,
      muscles: "Quads, hamstrings, calves",
      mood: "Tired"
    },
    Swimming: {
      benefits: "Full body workout, lung capacity",
      goal: 60,
      baseCaloriesPerMin: 6,
      muscles: "Shoulders, back, core",
      mood: "Refreshed"
    },
    "Body Building": {
      benefits: "Muscle growth, strength",
      goal: 90,
      baseCaloriesPerMin: 7,
      muscles: "Chest, arms, legs",
      mood: "Empowered"
    }
  }), []);

  const customGoals = {
    calories: 2500,
    protein: 100,
    carbs: 350,
    fats: 100,
    fiber: 30,
    sugar: 50
  };

  const mealSuggestions = {
    protein: {
      Low: ["Paneer Tikka (Veg)", "Tofu Stir Fry (Keto)", "Chickpea Salad (Gluten-Free)"],
      High: ["Reduce red meat", "Skip protein shakes"]
    },
    carbs: {
      Low: ["Oats (Veg)", "Sweet potato (Keto)", "Rice and lentils (Gluten-Free)"],
      High: ["Avoid white bread", "Cut back on desserts"]
    },
    fats: {
      Low: ["Avocado Toast (Veg)", "Almond Butter (Keto)", "Mixed Seeds (Gluten-Free)"],
      High: ["Avoid fried food", "Use less oil"]
    },
    sugar: {
      Low: ["Fruit Salad (Veg)", "Berries & Yogurt (Keto)", "Apple slices (Gluten-Free)"],
      High: ["Avoid soda", "Cut down on sweets"]
    },
    fiber: {
      Low: ["Oats & Banana (Veg)", "Chia pudding (Keto)", "Boiled Lentils (Gluten-Free)"],
      High: ["Avoid excess bran", "Reduce fiber bars"]
    },
    calories: {
      Low: ["Smoothie Bowl (Veg)", "Nuts & Cheese (Keto)", "Granola + Yogurt (Gluten-Free)"],
      High: ["Avoid snacking", "Reduce portion size"]
    }
  };

  const insightsData = {
    "7d": [50, 75, 45, 60, 80, 90, 70]
  };

  const insightLabels = {
    "7d": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  };

  const handleWaterLog = (amount) => {
    const newAmount = parseFloat((localStats.waterIntake + amount).toFixed(2));
    const newIntake = Math.min(waterGoal, newAmount);
    setUndoStack((prev) => [...prev, localStats.waterIntake]);
    setLocalStats((prev) => ({ ...prev, waterIntake: newIntake }));

    const today = new Date().getDay();
    setHydrationLog((prev) => {
      const updated = [...prev];
      updated[today] = (updated[today] || 0) + amount;
      return updated;
    });
  };

  const handleReset = () => {
    setUndoStack((prev) => [...prev, localStats.waterIntake]);
    setLocalStats((prev) => ({ ...prev, waterIntake: 0 }));
  };

  const handleUndo = () => {
  if (undoStack.length > 0) {
    const last = undoStack[undoStack.length - 1];
    setLocalStats((prev) => ({ ...prev, waterIntake: last }));
    setUndoStack((prev) => prev.slice(0, -1));
  }
};

  const handleSave = () => {
    setStats(localStats);
    localStorage.setItem("userStats", JSON.stringify(localStats));
  };

  if (
  !localStats ||
  !Array.isArray(localStats.weeklyExercise) ||
  typeof localStats.waterIntake !== "number"
) {
  return <div>Loading stats or invalid data...</div>;
}

  return (
    <div className="statistics-container">
      <div className="view-toggle">
        {"Select view: "}
        {['daily', 'weekly', 'monthly'].map((value) => (
          <button
            key={value}
            className={view === value ? 'active' : ''}
            onClick={() => setView(value)}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </button>
        ))}
      </div>

      <div className="card">
        <h2>Summary</h2>
        <div className="summary-cards">
          <div className="summary-card">
            <FaDumbbell className="icon" />
            <div>
              <p>Workout</p>
              <strong>{(totalWeeklyMinutes / 60).toFixed(1)} hrs</strong>
            </div>
          </div>
          <div className="summary-card">
            <FaFire className="icon" />
            <div>
              <p>Top</p>
              <strong>{topExercise}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Workout Chart ({view})</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="minutes" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        {view === "daily" && <p className="highlight">Most active: <strong>{days[maxDayIndex]}</strong> with {localStats.weeklyExercise[maxDayIndex]} min</p>}
      </div>

      <div className="card">
        <h2>Exercise Breakdown</h2>
        <div className="category-buttons">
          {Object.keys(localStats.exerciseCategories).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              className={selectedCategory === cat ? "active" : ""}
            >
              {cat} {cat === leastPerformed && "⬇"}
            </button>
          ))}
        </div>
        {selectedCategory && (
          <div className="category-info">
            <h4>{selectedCategory}</h4>
            <p>⏱ Time: {localStats.exerciseCategories[selectedCategory]} min</p>
            <p>🔥 Calories: {Math.round(localStats.exerciseCategories[selectedCategory] * categoryInfo[selectedCategory].baseCaloriesPerMin)} kcal</p>
            <p>🎯 Goal: {categoryInfo[selectedCategory].goal} min</p>
            <progress value={localStats.exerciseCategories[selectedCategory]} max={categoryInfo[selectedCategory].goal} />
            <p>💪 Muscles: {categoryInfo[selectedCategory].muscles}</p>
            <p>🧠 Benefits: {categoryInfo[selectedCategory].benefits}</p>
            <p>😌 Mood: {categoryInfo[selectedCategory].mood}</p>
          </div>
        )}
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            {!selectedCategory && <Legend />}
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h2>🥗 Nutrition Tracker</h2>
        {Object.entries(customGoals).map(([key, goal]) => (
          <div key={key} className="nutrition-item">
            <label>
              {key.charAt(0).toUpperCase() + key.slice(1)} ({localStats[key] || 0} / {goal})
            </label>
            <input
              type="number"
              min="0"
              value={localStats[key] || ""}
              onChange={(e) =>
                setLocalStats((prev) => ({
                  ...prev,
                  [key]: Number(e.target.value)
                }))
              }
            />
            <progress value={localStats[key] || 0} max={goal} />
          </div>
        ))}

        <h4>⚠️ Nutrient Alerts</h4>
        <ul>
          {(() => {
            const alerts = Object.entries(customGoals).reduce((acc, [key, goal]) => {
              const actual = parseFloat(localStats[key]) || 0;
              if (actual < goal * 0.9) acc.push({ type: "Low", nutrient: key });
              else if (actual > goal * 1.1) acc.push({ type: "High", nutrient: key });
              return acc;
            }, []);
            return alerts.length
              ? alerts.map((a, i) => <li key={i}>{a.type === "Low" ? "⬇️" : "⬆️"} {a.type} {a.nutrient}</li>)
              : <li>✅ All nutrients within range</li>;
          })()}
        </ul>

        <h4>🍽 Meal Suggestions
          <button onClick={() => setShowSuggestions(!showSuggestions)} style={{ marginLeft: '10px' }}>
            {showSuggestions ? "Hide" : "Show"}
          </button>
        </h4>

        <div className="meal-suggestions-container">
  {showSuggestions && (() => {
    const alerts = Object.entries(customGoals).reduce((acc, [key, goal]) => {
      const actual = parseFloat(localStats[key]) || 0;
      if (actual < goal * 0.9) acc.push({ type: "Low", nutrient: key });
      else if (actual > goal * 1.1) acc.push({ type: "High", nutrient: key });
      return acc;
    }, []);

    return alerts.length ? (
      alerts.map((a, i) => (
        <div className="nutrient-group" key={i}>
          <h5>{a.type === "Low" ? "⬇️ Low" : "⬆️ High"} in {a.nutrient.charAt(0).toUpperCase() + a.nutrient.slice(1)}</h5>
          <ul className="suggestion-list">
            {mealSuggestions[a.nutrient][a.type].slice(0, 3).map((s, j) => (
              <li key={j}>🍽 {s}</li>
            ))}
          </ul>
        </div>
      ))
    ) : (
      <div className="nutrient-group">
        <h5>✅ All nutrients within range</h5>
      </div>
    );
  })()}
</div>


      <div className="card">
  <h2><FaTint /> Water Intake</h2>

  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
    <div style={{ width: 80, height: 80 }}>
      <CircularProgressbar
        value={waterPercentage}
        text={`${Math.round(waterPercentage)}%`}

        styles={buildStyles({
          textSize: '16px',
          pathColor: '#00BFFF',
          textColor: '#333',
          trailColor: '#eee'
        })}
      />
    </div>
    <div>
      <p><strong>Today:</strong> {localStats.waterIntake.toFixed(2)} L / {waterGoal} L</p>
      <p>{Math.max(0, Math.round((waterGoal - localStats.waterIntake) / 0.25))} more glass(es) to go</p>
    </div>
  </div>

  <p style={{ fontSize: '14px', marginTop: '10px' }}>💧 1 bottle = 1 litre | 1 glass = 250 ml</p>

  <progress value={localStats.waterIntake} max={waterGoal} />
  <div className="water-buttons">
    {[0.25, 0.5, 1].map((amount) => (
      <button key={amount} onClick={() => handleWaterLog(amount)} disabled={localStats.waterIntake >= waterGoal}>
        +{amount * 1000}ml
      </button>
    ))}
  </div>

  <div className="custom-water-log">
    <input
      type="number"
      step="50"
      min="50"
      max="5000"
      placeholder="Enter ml (e.g. 300)"
      value={customMl}
      onChange={(e) => setCustomMl(e.target.value)}
    />
    <button
      onClick={() => {
        const ml = parseFloat(customMl);
        if (!isNaN(ml) && ml > 0) {
          handleWaterLog(Math.min(ml, 5000) / 1000);
          setCustomMl("");
        }
      }}
      disabled={!customMl || isNaN(parseFloat(customMl))}
    >
      Add Custom
    </button>
  </div>

  <div className="water-actions" style={{ marginTop: "10px" }}>
    <button onClick={handleUndo} disabled={!undoStack.length}>Undo</button>
    <button onClick={handleReset}>Reset</button>
  </div>

  <h4>📊 Weekly Hydration Chart</h4>
  <ResponsiveContainer width="100%" height={200}>
    <BarChart data={hydrationLog.map((value, i) => ({ day: `Day ${i + 1}`, value }))}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#82ca9d" />
    </BarChart>
  </ResponsiveContainer>

  {(temperature > 32 || temperature < 15 || localStats.weeklyExercise.reduce((a, b) => a + b, 0) > 300) && (
    <>
      <h4>🧠 Smart Hydration Tip</h4>
      <p>{
        temperature > 32 ? "Hot day! Drink more water to stay cool."
          : temperature < 15 ? "Cold weather can trick thirst—remember to hydrate."
            : "Active week! Boost your hydration to recover well."
      }</p>
    </>
  )}

  {/* 🔁 Integrated Insights Section */}
  <div style={{ marginTop: '30px' }}>
    <h4>💡 Insights</h4>
    <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Insights for the last 7 days</p>


    <div className="insights-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {insightsData[insightTab].map((val, i) => (
        <div key={i} style={{ width: 80, height: 80, textAlign: 'center' }}>
          <CircularProgressbar
            value={val}
            text={`${val}%`}
            styles={buildStyles({
              textSize: '14px',
              pathColor: '#ff7f50',
              trailColor: '#eee',
              textColor: '#333'
            })}
          />
          <p style={{ fontSize: '12px', marginTop: '5px' }}>{insightLabels[insightTab][i]}</p>
        </div>
      ))}
    </div>
  </div>
</div>

<div>
  <div>
    <button onClick={handleSave}>Save Changes</button>
  </div>
</div>
</div>
</div>
  );
}

export default Statistics;
