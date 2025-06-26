"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  FaDumbbell,
  FaChartBar,
  FaMoon,
  FaSun,
  FaFire,
  FaTint,
  FaBed,
  FaWalking,
  FaAppleAlt,
  FaCalendarWeek,
  FaBell,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa"
import Avatar from 'avataaars';

const GOALS = {
  steps: 8000,
  water: 3,
  calories: 2500,
  sleep: 8,
  heartRate: [60, 100],
}

const TIPS = [
  "Wellness isn't a goal — it's your aura ✨",
  "Your energy today creates tomorrow's strength 💪",
  "Small steps, big transformations 🌟",
  "Hydrate your soul, fuel your dreams 💧",
  "Rest is where magic happens 😴",
  "Your aura shines brightest when you're healthy 🌈",
  "Progress over perfection, always 🎯",
  "You're not just building a body, you're crafting an aura ✨",
]

const REMINDERS = [
  { id: 1, text: "Drink water", time: "Every 2 hours", completed: true },
  { id: 2, text: "Take vitamins", time: "With breakfast", completed: false },
  { id: 3, text: "Evening walk", time: "6:00 PM", completed: false },
  { id: 4, text: "Meditation", time: "Before bed", completed: true },
]

function QuickStatsOverview({ stats, dark }) {
  const [animatedStats, setAnimatedStats] = useState({
    steps: 0,
    water: 0,
    calories: 0,
    sleep: 0,
  })

  useEffect(() => {
    const animateStats = () => {
      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps

      let currentStep = 0
      const interval = setInterval(() => {
        currentStep++
        const progress = currentStep / steps

        setAnimatedStats({
          steps: Math.floor((stats.steps || 0) * progress),
          water: Math.floor((stats.water || 0) * progress * 10) / 10,
          calories: Math.floor((stats.calories || 0) * progress),
          sleep: Math.floor((stats.sleep || 0) * progress * 10) / 10,
        })

        if (currentStep >= steps) {
          clearInterval(interval)
          setAnimatedStats({
            steps: stats.steps || 0,
            water: stats.water || 0,
            calories: stats.calories || 0,
            sleep: stats.sleep || 0,
          })
        }
      }, stepDuration)

      return () => clearInterval(interval)
    }

    const cleanup = animateStats()
    return cleanup
  }, [stats])

  const statsData = [
    {
      label: "Steps",
      value: animatedStats.steps,
      goal: GOALS.steps,
      icon: <FaWalking />,
      color: "#3b82f6",
      unit: "",
    },
    {
      label: "Water",
      value: animatedStats.water,
      goal: GOALS.water,
      icon: <FaTint />,
      color: "#10b981",
      unit: "L",
    },
    {
      label: "Calories",
      value: animatedStats.calories,
      goal: GOALS.calories,
      icon: <FaFire />,
      color: "#ec4899",
      unit: "",
    },
    {
      label: "Sleep",
      value: animatedStats.sleep,
      goal: GOALS.sleep,
      icon: <FaBed />,
      color: "#8b5cf6",
      unit: "h",
    },
  ]

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1000,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 24,
        margin: "0 0 60px 0",
        padding: "0 20px",
      }}
    >
      {statsData.map((stat, index) => (
        <div
          key={stat.label}
          style={{
            background: dark
              ? "linear-gradient(135deg, #2d1b69 0%, #1a1a2e 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #fefbff 100%)",
            borderRadius: 20,
            padding: "24px 20px",
            display: "flex",
            alignItems: "center",
            gap: 16,
            boxShadow: dark
              ? "0 8px 25px rgba(0, 0, 0, 0.3)"
              : "0 8px 20px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(139, 92, 246, 0.08)",
            border: dark ? "1px solid rgba(255, 107, 107, 0.2)" : "1px solid rgba(139, 92, 246, 0.1)",
            transition: "all 0.3s ease",
            animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-4px) scale(1.02)"
            e.target.style.boxShadow = dark ? "0 12px 35px rgba(0, 0, 0, 0.4)" : "0 12px 30px rgba(0, 0, 0, 0.1)"
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0px) scale(1)"
            e.target.style.boxShadow = dark
              ? "0 8px 25px rgba(0, 0, 0, 0.3)"
              : "0 8px 20px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(139, 92, 246, 0.08)"
          }}
        >
          <div style={{ fontSize: 32, color: stat.color, animation: "iconPulse 2s ease-in-out infinite" }}>
            {stat.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: dark ? "#94a3b8" : "#64748b", fontWeight: 600, marginBottom: 4 }}>
              {stat.label}
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: dark ? "#e2e8f0" : "#1e293b", marginBottom: 2 }}>
              {stat.value}
              {stat.unit}
            </div>
            <div style={{ fontSize: 12, color: dark ? "#6b7280" : "#9ca3af" }}>
              Goal: {stat.goal}
              {stat.unit}
            </div>
          </div>
          <div
            style={{
              width: 8,
              height: 40,
              borderRadius: 4,
              background: `linear-gradient(to top, ${stat.color}22, ${stat.color})`,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: `${Math.min((stat.value / stat.goal) * 100, 100)}%`,
                background: stat.color,
                borderRadius: 4,
                transition: "height 1s ease-out",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function WeeklyProgress({ dark }) {
  const weekData = [
    { day: "Mon", completed: true, percentage: 85 },
    { day: "Tue", completed: true, percentage: 92 },
    { day: "Wed", completed: false, percentage: 45 },
    { day: "Thu", completed: true, percentage: 78 },
    { day: "Fri", completed: true, percentage: 88 },
    { day: "Sat", completed: true, percentage: 95 },
    { day: "Sun", completed: false, percentage: 30 },
  ]

  const completedDays = weekData.filter((day) => day.completed).length
  const avgPercentage = Math.round(weekData.reduce((sum, day) => sum + day.percentage, 0) / weekData.length)

  return (
    <div
      style={{
        background: dark
          ? "linear-gradient(135deg, #2d1b69 0%, #1a1a2e 100%)"
          : "linear-gradient(135deg, #ffffff 0%, #fefbff 100%)",
        borderRadius: 24,
        padding: "24px",
        boxShadow: dark ? "0 12px 40px rgba(0, 0, 0, 0.3)" : "0 12px 32px rgba(0, 0, 0, 0.08)",
        border: dark ? "2px solid rgba(255, 107, 107, 0.2)" : "2px solid rgba(139, 92, 246, 0.1)",
        transition: "all 0.3s ease",
        height: "fit-content",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
        <FaCalendarWeek style={{ fontSize: 24, color: dark ? "#a78bfa" : "#8b5cf6" }} />
        <div style={{ fontWeight: 800, fontSize: 20, color: dark ? "#e2e8f0" : "#1e293b" }}>This Week</div>
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 20, justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: dark ? "#10b981" : "#059669" }}>{completedDays}/7</div>
          <div style={{ fontSize: 12, color: dark ? "#94a3b8" : "#64748b", fontWeight: 600 }}>Days Completed</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: dark ? "#fbbf24" : "#f59e0b" }}>{avgPercentage}%</div>
          <div style={{ fontSize: 12, color: dark ? "#94a3b8" : "#64748b", fontWeight: 600 }}>Avg Progress</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, justifyContent: "space-between" }}>
        {weekData.map((day, index) => (
          <div key={day.day} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: day.completed
                  ? dark
                    ? "linear-gradient(135deg, #10b981, #059669)"
                    : "linear-gradient(135deg, #d1fae5, #a7f3d0)"
                  : dark
                    ? "rgba(107, 114, 128, 0.3)"
                    : "rgba(156, 163, 175, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                color: day.completed ? "#ffffff" : dark ? "#9ca3af" : "#6b7280",
                transition: "all 0.3s ease",
                animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {day.completed ? "✓" : day.percentage + "%"}
            </div>
            <div style={{ fontSize: 10, fontWeight: 600, color: dark ? "#94a3b8" : "#64748b" }}>{day.day}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Weather Dashboard Section
function WeatherDashboard({ dark }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [weather] = useState({
    temp: 22,
    condition: "sunny",
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    pressure: 1013,
    uvIndex: 6,
    feelsLike: 25,
    location: "Your City",
  })

  const weatherSections = [
    {
      title: "Current Weather",
      icon: "🌤️",
      content: "current",
    },
    {
      title: "Today's Details",
      icon: "📊",
      content: "details",
    },
    {
      title: "Activity Recommendation",
      icon: "🏃‍♂️",
      content: "activity",
    },
  ]

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case "sunny":
        return "☀️"
      case "cloudy":
        return "☁️"
      case "rainy":
        return "🌧️"
      default:
        return "🌤️"
    }
  }

  const getActivityRecommendation = () => {
    if (weather.temp > 25) return "Perfect for outdoor workouts! 🏃‍♂️"
    if (weather.temp < 10) return "Great day for indoor yoga! 🧘‍♀️"
    return "Ideal weather for a nature walk! 🚶‍♂️"
  }

  const renderCurrentSection = () => {
    switch (weatherSections[currentSection].content) {
      case "current":
        return (
          <div style={{ textAlign: "center", animation: "sectionSlideIn 0.5s ease-out" }}>
            <div
              style={{
                fontSize: 64,
                marginBottom: 16,
                animation: "weatherIconFloat 3s ease-in-out infinite",
              }}
            >
              {getWeatherIcon()}
            </div>
            <div
              style={{
                fontSize: 36,
                fontWeight: 900,
                color: dark ? "#e2e8f0" : "#1e293b",
                marginBottom: 8,
              }}
            >
              {weather.temp}°C
            </div>
            <div
              style={{
                fontSize: 16,
                color: dark ? "#94a3b8" : "#64748b",
                fontWeight: 600,
                textTransform: "capitalize",
              }}
            >
              {weather.condition} in {weather.location}
            </div>
          </div>
        )

      case "details":
        return (
          <div style={{ animation: "sectionSlideIn 0.5s ease-out" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>💧</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: dark ? "#10b981" : "#34d399" }}>
                  {weather.humidity}%
                </div>
                <div style={{ fontSize: 12, color: dark ? "#94a3b8" : "#64748b" }}>Humidity</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>💨</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: dark ? "#3b82f6" : "#60a5fa" }}>
                  {weather.windSpeed} km/h
                </div>
                <div style={{ fontSize: 12, color: dark ? "#94a3b8" : "#64748b" }}>Wind</div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 12,
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>👁️</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: dark ? "#8b5cf6" : "#a78bfa" }}>
                  {weather.visibility} km
                </div>
                <div style={{ fontSize: 12, color: dark ? "#94a3b8" : "#64748b" }}>Visibility</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>🌡️</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: dark ? "#f59e0b" : "#fbbf24" }}>
                  {weather.feelsLike}°C
                </div>
                <div style={{ fontSize: 12, color: dark ? "#94a3b8" : "#64748b" }}>Feels Like</div>
              </div>
            </div>
          </div>
        )

      case "activity":
        return (
          <div style={{ textAlign: "center", animation: "sectionSlideIn 0.5s ease-out" }}>
            <div
              style={{
                fontSize: 48,
                marginBottom: 20,
                animation: "activityIconBounce 2s ease-in-out infinite",
              }}
            >
              🏃‍♂️
            </div>
            <div
              style={{
                fontSize: 16,
                color: dark ? "#e2e8f0" : "#374151",
                fontWeight: 600,
                lineHeight: 1.5,
                marginBottom: 12,
              }}
            >
              {getActivityRecommendation()}
            </div>
            <div
              style={{
                fontSize: 12,
                color: dark ? "#a78bfa" : "#7c3aed",
                fontWeight: 600,
              }}
            >
              Based on current weather conditions
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div
      style={{
        background: dark
          ? "linear-gradient(135deg, #2d1b69 0%, #1a1a2e 100%)"
          : "linear-gradient(135deg, rgba(224, 242, 254, 0.8) 0%, rgba(179, 229, 252, 0.6) 50%, rgba(225, 245, 254, 0.6) 100%)",
        borderRadius: 24,
        padding: "32px",
        boxShadow: dark ? "0 12px 40px rgba(0, 0, 0, 0.3)" : "0 12px 32px rgba(0, 0, 0, 0.05)",
        border: dark ? "2px solid rgba(255, 107, 107, 0.2)" : "2px solid rgba(168, 85, 247, 0.08)",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        minHeight: 320,
        display: "flex",
        flexDirection: "column",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Background Animation */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "15%",
            right: "10%",
            fontSize: 16,
            opacity: 0.2,
            animation: "cloudFloat 6s ease-in-out infinite",
          }}
        >
          ☁️
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            left: "15%",
            fontSize: 14,
            opacity: 0.2,
            animation: "cloudFloat 6s ease-in-out infinite 2s",
          }}
        >
          🌤️
        </div>
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, zIndex: 2 }}>
        <div
          style={{
            fontSize: 28,
            animation: "weatherHeaderPulse 2s ease-in-out infinite",
          }}
        >
          {weatherSections[currentSection].icon}
        </div>
        <div style={{ fontWeight: 800, fontSize: 20, color: dark ? "#e2e8f0" : "#1e293b" }}>
          {weatherSections[currentSection].title}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
        {renderCurrentSection()}
      </div>

      {/* Navigation Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 16,
          marginTop: 16,
          zIndex: 2,
        }}
      >
        <button
          onClick={() => setCurrentSection((prev) => (prev - 1 + weatherSections.length) % weatherSections.length)}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: dark ? "rgba(251, 191, 36, 0.2)" : "rgba(139, 92, 246, 0.2)",
            border: dark ? "2px solid #fbbf24" : "2px solid #8b5cf6",
            color: dark ? "#fbbf24" : "#8b5cf6",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: 700,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = dark ? "#fbbf24" : "#8b5cf6"
            e.target.style.color = "#ffffff"
          }}
          onMouseLeave={(e) => {
            e.target.style.background = dark ? "rgba(251, 191, 36, 0.2)" : "rgba(139, 92, 246, 0.2)"
            e.target.style.color = dark ? "#fbbf24" : "#8b5cf6"
          }}
        >
          ←
        </button>
        <button
          onClick={() => setCurrentSection((prev) => (prev + 1) % weatherSections.length)}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: dark ? "rgba(251, 191, 36, 0.2)" : "rgba(139, 92, 246, 0.2)",
            border: dark ? "2px solid #fbbf24" : "2px solid #8b5cf6",
            color: dark ? "#fbbf24" : "#8b5cf6",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: 700,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = dark ? "#fbbf24" : "#8b5cf6"
            e.target.style.color = "#ffffff"
          }}
          onMouseLeave={(e) => {
            e.target.style.background = dark ? "rgba(251, 191, 36, 0.2)" : "rgba(139, 92, 246, 0.2)"
            e.target.style.color = dark ? "#fbbf24" : "#8b5cf6"
          }}
        >
          →
        </button>
      </div>

      {/* Progress Indicators */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          marginTop: 20,
          zIndex: 2,
        }}
      >
        {weatherSections.map((_, index) => (
          <div
            key={index}
            style={{
              width: index === currentSection ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background:
                index === currentSection
                  ? dark
                    ? "#fbbf24"
                    : "#8b5cf6"
                  : dark
                    ? "rgba(251, 191, 36, 0.3)"
                    : "rgba(139, 92, 246, 0.3)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  )
}

// Enhanced Dark/Light Mode Toggle
function DarkModeToggle({ dark, onToggle }) {
  const [isToggling, setIsToggling] = useState(false)

  const handleToggle = () => {
    setIsToggling(true)
    setTimeout(() => {
      onToggle()
      setTimeout(() => setIsToggling(false), 600)
    }, 300)
  }

  return (
    <button
      onClick={handleToggle}
      style={{
        position: "relative",
        background: dark
          ? "linear-gradient(135deg, #1a1a2e 0%, #2d1b69 100%)"
          : "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
        border: `3px solid ${dark ? "#fbbf24" : "#8b5cf6"}`,
        cursor: "pointer",
        fontSize: 0,
        color: "transparent",
        padding: 0,
        borderRadius: 50,
        width: 100,
        height: 48,
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: dark
          ? "0 12px 35px rgba(251, 191, 36, 0.4), inset 0 0 20px rgba(251, 191, 36, 0.1)"
          : "0 12px 35px rgba(139, 92, 246, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.1)",
        overflow: "hidden",
      }}
      title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {/* Background Animation */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: dark
            ? "linear-gradient(45deg, #0f0f23, #1a1a2e, #2d1b69)"
            : "linear-gradient(45deg, #fef3c7, #fde68a, #f3e8ff)",
          animation: isToggling ? "backgroundShift 0.6s ease-in-out" : "none",
        }}
      />
      {/* Toggle Circle (sliding) */}
      <div
        style={{
          position: "absolute",
          top: 2,
          left: dark ? 54 : 4,
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: dark ? "linear-gradient(135deg, #fbbf24, #f59e0b)" : "linear-gradient(135deg, #8b5cf6, #a78bfa)",
          transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          color: "#ffffff",
          boxShadow: dark ? "0 4px 15px rgba(251, 191, 36, 0.6)" : "0 4px 15px rgba(139, 92, 246, 0.6)",
          animation: isToggling ? "toggleSpin 0.6s ease-in-out" : "none",
        }}
      >
        <div
          style={{
            animation: isToggling ? "iconFlip 0.6s ease-in-out" : "iconFloat 2s ease-in-out infinite",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {dark ? <FaSun /> : <FaMoon />}
        </div>
      </div>
      {/* Glow Effect */}
      <div
        style={{
          position: "absolute",
          top: -2,
          left: -2,
          right: -2,
          bottom: -2,
          borderRadius: 52,
          background: `conic-gradient(${dark ? "#fbbf24" : "#8b5cf6"}, transparent, ${dark ? "#fbbf24" : "#8b5cf6"})`,
          animation: isToggling ? "glowSpin 0.6s linear" : "none",
          opacity: isToggling ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
      {/* Stars Animation */}
      {isToggling && (
        <>
          <div
            style={{
              position: "absolute",
              top: -10,
              left: 20,
              fontSize: 12,
              color: dark ? "#fbbf24" : "#8b5cf6",
              animation: "starPop 0.6s ease-out",
            }}
          >
            ✨
          </div>
          <div
            style={{
              position: "absolute",
              bottom: -10,
              right: 20,
              fontSize: 12,
              color: dark ? "#fbbf24" : "#8b5cf6",
              animation: "starPop 0.6s ease-out 0.2s both",
            }}
          >
            ⭐
          </div>
        </>
      )}
    </button>
  )
}

function QuickActionButtons({ dark, onNavigate }) {
  const quickActions = [
    { label: "Log Water", icon: <FaTint />, color: "#10b981", action: () => console.log("Log water") },
    { label: "Quick Workout", icon: <FaDumbbell />, color: "#ec4899", action: () => onNavigate("Workout Plan") },
    { label: "View Stats", icon: <FaChartBar />, color: "#ef4444", action: () => onNavigate("Statistic") },
  ]

  return (
    <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 40 }}>
      {quickActions.map((action, index) => (
        <button
          key={action.label}
          onClick={action.action}
          style={{
            background: dark
              ? "linear-gradient(135deg, #2d1b69 0%, #1a1a2e 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #fefbff 100%)",
            border: `2px solid ${action.color}`,
            borderRadius: 16,
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: dark ? "0 4px 15px rgba(0, 0, 0, 0.2)" : "0 4px 15px rgba(0, 0, 0, 0.05)",
            animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-4px) scale(1.05)"
            e.target.style.boxShadow = `0 8px 25px ${action.color}30`
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0px) scale(1)"
            e.target.style.boxShadow = dark ? "0 4px 15px rgba(0, 0, 0, 0.2)" : "0 4px 15px rgba(0, 0, 0, 0.05)"
          }}
        >
          <div style={{ fontSize: 24, color: action.color }}>{action.icon}</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: dark ? "#e2e8f0" : "#1e293b" }}>{action.label}</div>
        </button>
      ))}
    </div>
  )
}

function DailyReminders({ dark }) {
  const [reminders, setReminders] = useState(REMINDERS)
  const [newReminder, setNewReminder] = useState({ text: "", time: "" })
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState("")
  const [editTime, setEditTime] = useState("")

  const toggleReminder = (id) => {
    setReminders((prev) =>
      prev.map((reminder) => (reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder)),
    )
  }

  const addReminder = () => {
    if (newReminder.text.trim() && newReminder.time.trim()) {
      const newId = Math.max(...reminders.map((r) => r.id), 0) + 1
      setReminders((prev) => [
        ...prev,
        {
          id: newId,
          text: newReminder.text.trim(),
          time: newReminder.time.trim(),
          completed: false,
        },
      ])
      setNewReminder({ text: "", time: "" })
    }
  }

  const deleteReminder = (id) => {
    setReminders((prev) => prev.filter((reminder) => reminder.id !== id))
  }

  const startEditing = (reminder) => {
    setEditingId(reminder.id)
    setEditText(reminder.text)
    setEditTime(reminder.time)
  }

  const saveEdit = () => {
    if (editText.trim() && editTime.trim()) {
      setReminders((prev) =>
        prev.map((reminder) =>
          reminder.id === editingId ? { ...reminder, text: editText.trim(), time: editTime.trim() } : reminder,
        ),
      )
      setEditingId(null)
      setEditText("")
      setEditTime("")
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText("")
    setEditTime("")
  }

  const completedCount = reminders.filter((r) => r.completed).length

  return (
    <div
      style={{
        background: dark
          ? "linear-gradient(135deg, #2d1b69 0%, #1a1a2e 100%)"
          : "linear-gradient(135deg, #fef7ff 0%, #f3e8ff 30%, #e0e7ff 70%, #ddd6fe 100%)",
        borderRadius: 24,
        padding: "32px",
        boxShadow: dark ? "0 12px 40px rgba(0, 0, 0, 0.3)" : "0 12px 32px rgba(0, 0, 0, 0.08)",
        border: dark ? "2px solid rgba(255, 107, 107, 0.2)" : "2px solid rgba(139, 92, 246, 0.1)",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <FaBell style={{ fontSize: 28, color: dark ? "#f472b6" : "#ec4899" }} />
        <div style={{ fontWeight: 800, fontSize: 22, color: dark ? "#e2e8f0" : "#1e293b" }}>Today's Reminders</div>
        <div
          style={{
            background: dark ? "#10b981" : "#d1fae5",
            color: dark ? "#ffffff" : "#065f46",
            padding: "4px 12px",
            borderRadius: 12,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {completedCount}/{reminders.length}
        </div>
      </div>

      {/* Add New Reminder */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 20,
          padding: "16px",
          borderRadius: 16,
          background: dark ? "rgba(139, 92, 246, 0.1)" : "rgba(139, 92, 246, 0.05)",
          border: dark ? "2px solid rgba(139, 92, 246, 0.3)" : "2px solid rgba(139, 92, 246, 0.2)",
        }}
      >
        <input
          type="text"
          placeholder="Add new reminder..."
          value={newReminder.text}
          onChange={(e) => setNewReminder((prev) => ({ ...prev, text: e.target.value }))}
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: 8,
            border: "none",
            background: dark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.8)",
            color: dark ? "#e2e8f0" : "#1e293b",
            fontSize: 14,
            fontWeight: 500,
          }}
          onKeyPress={(e) => e.key === "Enter" && addReminder()}
        />
        <input
          type="text"
          placeholder="Time (e.g., 9:00 AM)"
          value={newReminder.time}
          onChange={(e) => setNewReminder((prev) => ({ ...prev, time: e.target.value }))}
          style={{
            width: 120,
            padding: "8px 12px",
            borderRadius: 8,
            border: "none",
            background: dark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.8)",
            color: dark ? "#e2e8f0" : "#1e293b",
            fontSize: 14,
            fontWeight: 500,
          }}
          onKeyPress={(e) => e.key === "Enter" && addReminder()}
        />
        <button
          onClick={addReminder}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            background: dark ? "#8b5cf6" : "#7c3aed",
            color: "#ffffff",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = dark ? "#a78bfa" : "#8b5cf6"
          }}
          onMouseLeave={(e) => {
            e.target.style.background = dark ? "#8b5cf6" : "#7c3aed"
          }}
        >
          Add
        </button>
      </div>

      {/* Reminders List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {reminders.map((reminder, index) => (
          <div
            key={reminder.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "16px",
              borderRadius: 16,
              background: reminder.completed
                ? dark
                  ? "linear-gradient(135deg, #10b981, #059669)"
                  : "linear-gradient(135deg, #d1fae5, #a7f3d0)"
                : dark
                  ? "rgba(107, 114, 128, 0.2)"
                  : "rgba(156, 163, 175, 0.1)",
              border: reminder.completed ? "2px solid #10b981" : "2px solid transparent",
              animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
              transition: "all 0.3s ease",
            }}
          >
            <FaCheckCircle
              onClick={() => toggleReminder(reminder.id)}
              style={{
                fontSize: 20,
                color: reminder.completed ? "#ffffff" : dark ? "#6b7280" : "#9ca3af",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1)"
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)"
              }}
            />

            {editingId === reminder.id ? (
              <>
                <div style={{ flex: 1, display: "flex", gap: 8 }}>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    style={{
                      flex: 1,
                      padding: "6px 10px",
                      borderRadius: 6,
                      border: "none",
                      background: dark ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.9)",
                      color: dark ? "#e2e8f0" : "#1e293b",
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                    onKeyPress={(e) => e.key === "Enter" && saveEdit()}
                  />
                  <input
                    type="text"
                    value={editTime}
                    onChange={(e) => setEditTime(e.target.value)}
                    style={{
                      width: 100,
                      padding: "6px 10px",
                      borderRadius: 6,
                      border: "none",
                      background: dark ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.9)",
                      color: dark ? "#e2e8f0" : "#1e293b",
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                    onKeyPress={(e) => e.key === "Enter" && saveEdit()}
                  />
                </div>
                <button
                  onClick={saveEdit}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 6,
                    border: "none",
                    background: "#10b981",
                    color: "#ffffff",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 6,
                    border: "none",
                    background: "#ef4444",
                    color: "#ffffff",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: reminder.completed ? "#ffffff" : dark ? "#e2e8f0" : "#1e293b",
                      textDecoration: reminder.completed ? "line-through" : "none",
                    }}
                  >
                    {reminder.text}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: reminder.completed ? "#ffffff" : dark ? "#94a3b8" : "#64748b",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      marginTop: 4,
                    }}
                  >
                    <FaClock style={{ fontSize: 10 }} />
                    {reminder.time}
                  </div>
                </div>
                <button
                  onClick={() => startEditing(reminder)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 6,
                    border: "none",
                    background: dark ? "#fbbf24" : "#f59e0b",
                    color: "#ffffff",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    opacity: reminder.completed ? 0.7 : 1,
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteReminder(reminder.id)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 6,
                    border: "none",
                    background: "#ef4444",
                    color: "#ffffff",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Enhanced animations
const aurabuddyAnimations = `
  @keyframes aurabuddyFadeIn {
    from { opacity: 0; transform: translateY(40px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(40px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes aurabuddyPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  @keyframes iconPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  /* Weather Section Animations */
  @keyframes sectionSlideIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes weatherIconFloat {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(5deg); }
  }
  @keyframes weatherHeaderPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  @keyframes activityIconBounce {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-8px) scale(1.1); }
  }
  @keyframes cloudFloat {
    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
    50% { transform: translateY(-5px) translateX(5px); opacity: 0.4; }
  }

  /* Dark Mode Toggle Animations */
  @keyframes toggleSpin {
    0% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(180deg) scale(1.1); }
    100% { transform: rotate(360deg) scale(1); }
  }
  @keyframes iconFlip {
    0% { transform: rotateY(0deg) scale(1); }
    50% { transform: rotateY(180deg) scale(0.8); }
    100% { transform: rotateY(360deg) scale(1); }
  }
  @keyframes iconFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-2px); }
  }
  @keyframes backgroundShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  @keyframes glowSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes starPop {
    0% { transform: scale(0) rotate(0deg); opacity: 0; }
    50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
    100% { transform: scale(0.8) rotate(360deg); opacity: 0; }
  }

  .aurabuddy-hero-anim {
    animation: aurabuddyFadeIn 1s cubic-bezier(.4,1.3,.6,1) 0.1s both;
  }
  .aurabuddy-actions-anim {
    animation: slideInLeft 0.8s cubic-bezier(.4,1.3,.6,1) 0.3s both;
  }
  .aurabuddy-stats-anim {
    animation: slideInRight 0.8s cubic-bezier(.4,1.3,.6,1) 0.5s both;
  }
  .aurabuddy-action-btn-anim {
    transition: all 0.3s cubic-bezier(.4,1.3,.6,1);
  }
  .aurabuddy-action-btn-anim:hover {
    transform: scale(1.05) translateY(-4px);
    z-index: 2;
  }
  .aurabuddy-gradient-text {
    background: linear-gradient(135deg, #8b5cf6, #a78bfa, #c084fc, #e879f9);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: aurabuddyGradientShift 4s ease-in-out infinite;
  }
  @keyframes aurabuddyGradientShift {
    0%, 100% { background-position: 0% 50%; }
    25% { background-position: 100% 50%; }
    50% { background-position: 100% 100%; }
    75% { background-position: 0% 100%; }
  }
`

if (typeof document !== "undefined" && !document.getElementById("aurabuddy-anim-style")) {
  const style = document.createElement("style")
  style.id = "aurabuddy-anim-style"
  style.textContent = aurabuddyAnimations
  document.head.appendChild(style)
}

const AVATAR_EMOJIS = [
  "😀", "😎", "🌟", "💪", "🏃‍♂️", "🦉", "🔥", "🌙", "🍏", "🎵", "🐦", "⭐"
];
const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, #8b5cf6, #a78bfa)",
  "linear-gradient(135deg, #fbbf24, #f59e0b)",
  "linear-gradient(135deg, #10b981, #06b6d4)",
  "linear-gradient(135deg, #ef4444, #f472b6)",
  "linear-gradient(135deg, #f472b6, #fbbf24)",
  "linear-gradient(135deg, #6366f1, #0ea5e9)",
  "linear-gradient(135deg, #a7f3d0, #fef3c7)"
];
const AVATAR_FONT_SIZES = [24, 32, 38, 48, 56];

function Dashboard({ stats = {}, onNavigate, onOpenSidebar, sidebarVisible = false }) {
  const [dark, setDark] = useState(false)
  const [greeting, setGreeting] = useState("")
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState({
    name: "Alex",
    plan: "Premium",
    avatar: null, // image data url or null
    avatarType: "initial", // "initial", "image", or "emoji"
    avatarColor: "#8b5cf6", // default color for custom avatar
    avatarGradient: AVATAR_GRADIENTS[0],
    avatarInitial: "A", // default initial
    avatarEmoji: "😀",
    avatarFontSize: 38,
  });
  const fileInputRef = useRef(null);
  const [showAvatarBuilder, setShowAvatarBuilder] = useState(false);
  const [avatarOptions, setAvatarOptions] = useState({
    topType: 'LongHairStraight',
    accessoriesType: 'Blank',
    hairColor: 'SilverGray',
    facialHairType: 'Blank',
    clotheType: 'BlazerShirt',
    eyeType: 'Happy',
    eyebrowType: 'Default',
    mouthType: 'Smile',
    skinColor: 'Light',
  });

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUser((prev) => ({
          ...prev,
          avatar: ev.target.result,
          avatarType: "image",
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle custom avatar creation
  const handleAvatarColorChange = (e) => {
    setUser((prev) => ({ ...prev, avatarColor: e.target.value, avatarType: "initial" }));
  };
  const handleAvatarInitialChange = (e) => {
    const val = e.target.value.slice(0, 1).toUpperCase();
    setUser((prev) => ({ ...prev, avatarInitial: val, avatarType: "initial" }));
  };

  // Add handlers for new options
  const handleAvatarGradientChange = (gradient) => {
    setUser((prev) => ({ ...prev, avatarGradient: gradient, avatarType: "initial" }));
  };
  const handleAvatarFontSizeChange = (e) => {
    setUser((prev) => ({ ...prev, avatarFontSize: Number(e.target.value), avatarType: "initial" }));
  };
  const handleAvatarEmojiSelect = (emoji) => {
    setUser((prev) => ({ ...prev, avatarEmoji: emoji, avatarType: "emoji" }));
  };

  const tip = React.useMemo(() => TIPS[Math.floor(Math.random() * TIPS.length)], [])

  // Time-based greeting using user's local computer time
  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date()
      const hour = now.getHours()
      
      let greetingText = ""
      if (hour < 12) {
        greetingText = "Good Morning"
      } else if (hour < 17) {
        greetingText = "Good Afternoon"
      } else {
        greetingText = "Good Evening"
      }
      
      setGreeting(greetingText)
    }

    // Update immediately
    updateGreeting()
    
    // Update every minute to keep time current
    const interval = setInterval(updateGreeting, 60000)
    
    return () => clearInterval(interval)
  }, [])

  const bg = dark
    ? {
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
        color: "#f8fafc",
      }
    : {
        background:
          "linear-gradient(135deg, #fef7ff 0%, #f0f9ff 20%, #f0fdf4 40%, #fefce8 60%, #fef3c7 80%, #fdf2f8 100%)",
        color: "#1e293b",
      }

  const navigationItems = [
    {
      title: "Track Workouts",
      description: "Log your exercises and build strength",
      icon: <FaDumbbell />,
      color: dark ? "#ff6b6b" : "#f472b6",
      nav: "Workout Plan",
    
    },
    {
      title: "View Analytics",
      description: "Analyze your progress and trends",
      icon: <FaChartBar />,
      color: dark ? "#ffa726" : "#a78bfa",
      nav: "Statistic",
      
    },
    {
      title: "Nutrition Goals",
      description: "Plan meals and track calories",
      icon: <FaAppleAlt />,
      color: dark ? "#66bb6a" : "#86efac",
      nav: "Nutrition And Health",
      
    },
  ]

  return (
    <div
      style={{
        width: sidebarVisible ? "calc(100vw - 200px)" : "100vw",
        minHeight: "100vh",
        background: bg.background,
        color: bg.color,
        transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        padding: 0,
        margin: 0,
      }}
    >
      {/* Hero Section */}
      <div
        className="aurabuddy-hero-anim"
        style={{
          width: sidebarVisible ? "calc(100vw - 200px)" : "100vw",
          padding: "100px 0px 80px 0px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: dark
            ? "rgba(15, 15, 35, 0.95)"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 249, 255, 0.8) 25%, rgba(240, 253, 244, 0.8) 50%, rgba(254, 252, 232, 0.8) 75%, rgba(254, 242, 242, 0.8) 100%)",
          backdropFilter: "blur(30px)",
          borderRadius: "0 0 50px 50px",
          boxShadow: dark
            ? "0 25px 80px rgba(0, 0, 0, 0.4)"
            : "0 25px 80px rgba(168, 85, 247, 0.08), 0 0 0 1px rgba(168, 85, 247, 0.1)",
          marginBottom: 60,
          border: dark ? "2px solid rgba(255, 107, 107, 0.3)" : "2px solid rgba(168, 85, 247, 0.15)",
          position: "relative",
        }}
      >
        {/* Sidebar and Top Navigation */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 40px",
            background: "transparent",
            zIndex: 10,
            height: 72,
          }}
        >
          {/* Left Side - Menu Icon */}
          <button
            style={{
              background: dark
                ? "linear-gradient(135deg, #2d1b69 0%, #1a1a2e 100%)"
                : "linear-gradient(135deg, #ffffff 0%, #fefbff 100%)",
              border: dark ? "2px solid rgba(255, 107, 107, 0.3)" : "2px solid rgba(139, 92, 246, 0.3)",
              borderRadius: 16,
              padding: "12px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: dark ? "0 4px 15px rgba(0, 0, 0, 0.3)" : "0 4px 15px rgba(139, 92, 246, 0.1)",
              display: sidebarVisible ? "none" : "flex",
            }}
            onClick={onOpenSidebar}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)"
              e.target.style.boxShadow = dark ? "0 8px 25px rgba(0, 0, 0, 0.4)" : "0 8px 25px rgba(139, 92, 246, 0.2)"
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)"
              e.target.style.boxShadow = dark ? "0 4px 15px rgba(0, 0, 0, 0.3)" : "0 4px 15px rgba(139, 92, 246, 0.1)"
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 3,
                  background: dark ? "#fbbf24" : "#8b5cf6",
                  borderRadius: 2,
                }}
              />
              <div
                style={{
                  width: "70%",
                  height: 3,
                  background: dark ? "#fbbf24" : "#8b5cf6",
                  borderRadius: 2,
                }}
              />
              <div
                style={{
                  width: "100%",
                  height: 3,
                  background: dark ? "#fbbf24" : "#8b5cf6",
                  borderRadius: 2,
                }}
              />
            </div>
          </button>

          {/* Center - Search Bar */}
          <div
            style={{
              flex: 1,
              maxWidth: sidebarVisible ? 350 : 400,
              margin: '0 auto',
              marginLeft: 380,
              position: 'relative',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              height: 48,
            }}
          >
            <input
              type="text"
              placeholder="Search wellness activities..."
              style={{
                width: "100%",
                padding: "12px 20px 12px 50px",
                borderRadius: 20,
                border: dark ? "2px solid rgba(255, 107, 107, 0.3)" : "2px solid rgba(139, 92, 246, 0.3)",
                background: dark
                  ? "linear-gradient(135deg, #2d1b69 0%, #1a1a2e 100%)"
                  : "linear-gradient(135deg, #ffffff 0%, #fefbff 100%)",
                color: dark ? "#e2e8f0" : "#1e293b",
                fontSize: 14,
                fontWeight: 500,
                outline: "none",
                transition: "all 0.3s ease",
                boxShadow: dark ? "0 4px 15px rgba(0, 0, 0, 0.3)" : "0 4px 15px rgba(139, 92, 246, 0.1)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = dark ? "#fbbf24" : "#8b5cf6"
                e.target.style.boxShadow = dark
                  ? "0 8px 25px rgba(251, 191, 36, 0.3)"
                  : "0 8px 25px rgba(139, 92, 246, 0.3)"
              }}
              onBlur={(e) => {
                e.target.style.borderColor = dark ? "rgba(255, 107, 107, 0.3)" : "rgba(139, 92, 246, 0.3)"
                e.target.style.boxShadow = dark ? "0 4px 15px rgba(0, 0, 0, 0.3)" : "0 4px 15px rgba(139, 92, 246, 0.1)"
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 18,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 16,
                color: dark ? "#94a3b8" : "#64748b",
              }}
            >
              🔍
            </div>
          </div>

          {/* Right Side - Profile + DarkModeToggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, height: 48 }}>
            {/* Profile Button */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: dark
                  ? "linear-gradient(135deg, #2d1b69 0%, #1a1a2e 100%)"
                  : "linear-gradient(135deg, #ffffff 0%, #fefbff 100%)",
                border: dark ? "2px solid rgba(255, 107, 107, 0.3)" : "2px solid rgba(139, 92, 246, 0.3)",
                borderRadius: 20,
                padding: "8px 16px 8px 8px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: dark ? "0 4px 15px rgba(0, 0, 0, 0.3)" : "0 4px 15px rgba(139, 92, 246, 0.1)",
              }}
              onClick={() => setShowProfile(true)}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)"
                e.target.style.boxShadow = dark ? "0 8px 25px rgba(0, 0, 0, 0.4)" : "0 8px 25px rgba(139, 92, 246, 0.2)"
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)"
                e.target.style.boxShadow = dark ? "0 4px 15px rgba(0, 0, 0, 0.3)" : "0 4px 15px rgba(139, 92, 246, 0.1)"
              }}
            >
              {user.avatarType === "image" && user.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    objectFit: "cover",
                    boxShadow: dark ? "0 4px 12px rgba(251, 191, 36, 0.4)" : "0 4px 12px rgba(139, 92, 246, 0.4)",
                  }}
                />
              ) : user.avatarType === "emoji" ? (
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: user.avatarGradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    boxShadow: dark ? "0 4px 12px rgba(251, 191, 36, 0.4)" : "0 4px 12px rgba(139, 92, 246, 0.4)",
                  }}
                >
                  {user.avatarEmoji}
                </div>
              ) : (
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: user.avatarGradient || user.avatarColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: user.avatarFontSize,
                    fontWeight: 700,
                    color: "#ffffff",
                    boxShadow: dark ? "0 4px 12px rgba(251, 191, 36, 0.4)" : "0 4px 12px rgba(139, 92, 246, 0.4)",
                  }}
                >
                  {user.avatarInitial}
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: dark ? "#e2e8f0" : "#1e293b", lineHeight: 1 }}>
                  {user.name}
                </div>
                <div style={{ fontSize: 11, color: dark ? "#94a3b8" : "#64748b", fontWeight: 500, lineHeight: 1, marginTop: 2 }}>
                  {user.plan}
                </div>
              </div>
            </div>
            {/* Dark Mode Toggle */}
            <DarkModeToggle dark={dark} onToggle={() => setDark(!dark)} />
          </div>
        </div>

        {/* Mascot */}
        <div style={{ fontSize: "4rem", marginBottom: 20, animation: "aurabuddyPulse 3s ease-in-out infinite" }}>
      
        </div>

        <div
          style={{
            fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
            color: dark ? "#fbbf24" : "#7c3aed",
            fontWeight: 600,
            marginBottom: 16,
            marginTop: 30,
            letterSpacing: "1px",
          }}
        >
          {greeting}! 
        </div>

        <h1
          className="aurabuddy-gradient-text"
          style={{
            fontFamily: "'Luckiest Guy', 'Righteous', 'Fredoka One', cursive, system-ui, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.8rem, 9vw, 5rem)",
            margin: 0,
            letterSpacing: "8px",
            wordSpacing: "20px",
            lineHeight: 1.4,
            textShadow: dark ? "none" : "0 6px 30px rgba(139, 92, 246, 0.2)",
            textAlign: "center",
          }}
        >
          WELCOME TO<br />AURABUDDY
        </h1>

        <div
          style={{
            fontSize: "clamp(1.2rem, 3.5vw, 1.6rem)",
            color: dark ? "#fbbf24" : "#7c3aed",
            fontWeight: 700,
            margin: "40px 0 30px 0",
            letterSpacing: "3px",
            textTransform: "uppercase",
            textShadow: dark ? "none" : "0 3px 15px rgba(124, 58, 237, 0.15)",
          }}
        >
          WELLNESS ISN'T A GOAL — IT'S YOUR AURA
        </div>

        <div
          style={{
            marginTop: 30,
            fontSize: "clamp(1.1rem, 2.8vw, 1.4rem)",
            color: dark ? "#e2e8f0" : "#475569",
            fontWeight: 600,
            maxWidth: 700,
            lineHeight: 1.7,
            textShadow: dark ? "none" : "0 2px 10px rgba(0, 0, 0, 0.05)",
          }}
        >
          ✨ {tip}
        </div>
      </div>

      {/* Navigation Grid */}
      <div className="aurabuddy-actions-anim">
        <div
          style={{
            textAlign: "center",
            marginBottom: 40,
            maxWidth: 1000,
            padding: "0 20px",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
              fontWeight: 800,
              color: dark ? "#e2e8f0" : "#1e293b",
              marginBottom: 16,
            }}
          >
            Quick Actions
          </h2>
          <p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              color: dark ? "#94a3b8" : "#64748b",
              fontWeight: 500,
            }}
          >
            Jump into your wellness activities
          </p>
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: 1200,
            display: "grid",
            gridTemplateColumns: sidebarVisible ? "repeat(auto-fit, minmax(250px, 1fr))" : "repeat(auto-fit, 280px)",
            gap: 48,
            margin: "0 0 60px 0",
            padding: "40px",
            justifyContent: "center",
          }}
        >
          {navigationItems.map((item, index) => (
            <button
              key={item.title}
              onClick={() => onNavigate && onNavigate(item.nav)}
              className="aurabuddy-action-btn-anim"
              style={{
                background: dark
                  ? "linear-gradient(135deg, #2d1b69 0%, #1a1a2e 100%)"
                  : "linear-gradient(135deg, #ffffff 0%, #fefbff 100%)",
                borderRadius: 24,
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                cursor: "pointer",
                border: `2px solid ${item.color}`,
                fontWeight: 700,
                margin: 0,
                boxShadow: dark
                  ? "0 12px 40px rgba(0, 0, 0, 0.3)"
                  : "0 12px 32px rgba(0, 0, 0, 0.05), 0 4px 16px rgba(168, 85, 247, 0.03)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                minHeight: 200,
                animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
                backdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = `0 16px 50px ${item.color}20`
                e.target.style.background = dark
                  ? `linear-gradient(135deg, ${item.color}15, ${item.color}08)`
                  : `linear-gradient(135deg, ${item.color}08, ${item.color}03)`
                e.target.style.borderColor = item.color
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = dark
                  ? "0 12px 40px rgba(0, 0, 0, 0.3)"
                  : "0 12px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(139, 92, 246, 0.05)"
                e.target.style.background = dark
                  ? "linear-gradient(135deg, #2d1b69 0%, #1a1a2e 100%)"
                  : "linear-gradient(135deg, #ffffff 0%, #fefbff 100%)"
                e.target.style.borderColor = item.color
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: 8 }}>{item.emoji}</div>
              <div style={{ fontSize: 32, color: item.color, marginBottom: 8 }}>{item.icon}</div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: dark ? "#e2e8f0" : "#1e293b",
                  marginBottom: 8,
                  textAlign: "center",
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: dark ? "#94a3b8" : "#64748b",
                  textAlign: "center",
                  lineHeight: 1.4,
                  fontWeight: 500,
                }}
              >
                {item.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections - Only Weather Dashboard */}
      <div
        style={{
          width: "100%",
          maxWidth: sidebarVisible ? 1000 : 1200,
          display: "flex",
          justifyContent: "center",
          margin: "0 0 40px 0",
          padding: "0 20px",
        }}
      >
        <div style={{ width: "100%", maxWidth: sidebarVisible ? 700 : 800 }}>
          <WeatherDashboard dark={dark} />
        </div>
      </div>

      {/* Daily Reminders - Full Width */}
      <div
        style={{
          width: "100%",
          maxWidth: sidebarVisible ? 1000 : 1200,
          margin: "0 0 60px 0",
          padding: "0 20px",
        }}
      >
        <DailyReminders dark={dark} />
      </div>

      {/* Footer Message */}
      <div
        style={{
          width: "100%",
          maxWidth: sidebarVisible ? 700 : 800,
          padding: "40px 20px 80px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: dark
              ? "linear-gradient(135deg,#2d1b69 0%,#1a1a2e 100%)"
              : "linear-gradient(135deg, rgba(254, 243, 199, 0.8) 0%, rgba(253, 230, 138, 0.6) 30%, rgba(243, 232, 255, 0.6) 70%, rgba(224, 231, 255, 0.6) 100%)",
            borderRadius: 28,
            padding: 40,
            boxShadow: dark ? "0 20px 60px rgba(0,0,0,.3)" : "0 20px 60px rgba(168,85,247,.08)",
            border: dark ? "2px solid rgba(255,107,107,.2)" : "2px solid rgba(168,85,247,.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 20 }}>✨🌟✨</div>

          <p
            style={{
              fontSize: "clamp(1.2rem,3vw,1.5rem)",
              color: dark ? "#fbbf24" : "#7c3aed",
              fontWeight: 700,
              lineHeight: 1.6,
              fontStyle: "italic",
              marginBottom: 16,
            }}
          >
            {"Your wellness journey is a masterpiece in progress."}
            <br />
            {"Every healthy choice adds another brushstroke to your radiant aura."}
          </p>

          <div
            style={{
              fontSize: 16,
              color: dark ? "#94a3b8" : "#6b7280",
              fontWeight: 600,
            }}
          >
            {"— Keep shining, AURABUDDY Champion! 🚀✨"}
          </div>
        </div>
      </div>
      {/* Profile Modal */}
      {showProfile && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowProfile(false)}
        >
          <div
            style={{
              background: dark ? "#1a1a2e" : "#fff",
              borderRadius: 24,
              padding: 32,
              minWidth: 320,
              boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
              position: "relative",
            }}
            onClick={e => e.stopPropagation()}
          >
            {user.avatarType === "image" && user.avatar ? (
              <img
                src={user.avatar}
                alt="Profile Large"
                style={{ width: 90, height: 90, borderRadius: "50%", objectFit: "cover", marginBottom: 16 }}
              />
            ) : user.avatarType === "emoji" ? (
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  background: user.avatarGradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 56,
                  marginBottom: 16,
                }}
              >
                {user.avatarEmoji}
              </div>
            ) : (
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  background: user.avatarGradient || user.avatarColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: user.avatarFontSize,
                  fontWeight: 800,
                  color: "#fff",
                  marginBottom: 16,
                }}
              >
                {user.avatarInitial}
              </div>
            )}
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>{user.name}</h2>
            <div style={{ color: dark ? "#fbbf24" : "#7c3aed", fontWeight: 600, marginBottom: 8 }}>{user.plan} Member</div>
            <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              <button
                style={{
                  padding: "8px 18px",
                  borderRadius: 12,
                  border: "none",
                  background: dark ? "#fbbf24" : "#8b5cf6",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: 15,
                }}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
              >
                Upload Image
              </button>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <label style={{ fontWeight: 600, fontSize: 14 }}>Avatar Color:</label>
                <input type="color" value={user.avatarColor} onChange={handleAvatarColorChange} style={{ width: 32, height: 32, border: "none", background: "none" }} />
                <label style={{ fontWeight: 600, fontSize: 14, marginLeft: 12 }}>Gradient:</label>
                <div style={{ display: "flex", gap: 4 }}>
                  {AVATAR_GRADIENTS.map((g, i) => (
                    <button key={i} style={{ width: 28, height: 28, borderRadius: "50%", border: user.avatarGradient === g ? "2px solid #6366f1" : "1px solid #ccc", background: g, cursor: "pointer" }} onClick={() => handleAvatarGradientChange(g)} />
                  ))}
                </div>
                <label style={{ fontWeight: 600, fontSize: 14, marginLeft: 12 }}>Initial:</label>
                <input type="text" value={user.avatarInitial} maxLength={1} onChange={handleAvatarInitialChange} style={{ width: 32, height: 32, textAlign: "center", fontSize: 18, borderRadius: 8, border: "1px solid #ccc" }} />
                <label style={{ fontWeight: 600, fontSize: 14, marginLeft: 12 }}>Font Size:</label>
                <select value={user.avatarFontSize} onChange={handleAvatarFontSizeChange} style={{ borderRadius: 8, padding: "2px 6px", border: "1px solid #ccc" }}>
                  {AVATAR_FONT_SIZES.map(size => (
                    <option key={size} value={size}>{size}px</option>
                  ))}
                </select>
                <button
                  style={{
                    marginLeft: 10,
                    padding: "6px 12px",
                    borderRadius: 8,
                    border: "none",
                    background: dark ? "#fbbf24" : "#8b5cf6",
                    color: "#fff",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: 13,
                  }}
                  onClick={() => setUser((prev) => ({ ...prev, avatarType: "initial" }))}
                >
                  Use Custom Avatar
                </button>
              </div>
              <div style={{ marginTop: 10 }}>
                <label style={{ fontWeight: 600, fontSize: 14, marginRight: 8 }}>Or pick an emoji:</label>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {AVATAR_EMOJIS.map((emoji, i) => (
                    <button key={i} style={{ fontSize: 24, border: user.avatarEmoji === emoji && user.avatarType === "emoji" ? "2px solid #6366f1" : "1px solid #ccc", borderRadius: 8, background: "#fff", cursor: "pointer", padding: "2px 6px" }} onClick={() => handleAvatarEmojiSelect(emoji)}>{emoji}</button>
                  ))}
                </div>
              </div>
            </div>
            <button
              style={{
                position: "absolute",
                top: 12,
                right: 18,
                background: "none",
                border: "none",
                fontSize: 22,
                color: dark ? "#fbbf24" : "#8b5cf6",
                cursor: "pointer",
              }}
              onClick={() => setShowProfile(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
      {/* Avatar Builder Modal */}
      {showAvatarBuilder && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
          onClick={() => setShowAvatarBuilder(false)}
        >
          <div
            style={{
              background: dark ? "#1a1a2e" : "#fff",
              borderRadius: 24,
              padding: 32,
              minWidth: 340,
              boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
              position: "relative",
            }}
            onClick={e => e.stopPropagation()}
          >
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, marginBottom: 12 }}>Customize Your Avatar</h2>
            <Avatar
              style={{ width: '120px', height: '120px', margin: '0 auto 18px auto', display: 'block' }}
              avatarStyle='Circle'
              {...avatarOptions}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
              <label>Hair Style:
                <select value={avatarOptions.topType} onChange={e => setAvatarOptions(o => ({ ...o, topType: e.target.value }))}>
                  <option value='LongHairStraight'>Long Straight</option>
                  <option value='ShortHairShortFlat'>Short Flat</option>
                  <option value='Hat'>Hat</option>
                  <option value='Hijab'>Hijab</option>
                  <option value='NoHair'>No Hair</option>
                </select>
              </label>
              <label>Accessories:
                <select value={avatarOptions.accessoriesType} onChange={e => setAvatarOptions(o => ({ ...o, accessoriesType: e.target.value }))}>
                  <option value='Blank'>None</option>
                  <option value='Kurt'>Kurt</option>
                  <option value='Prescription01'>Glasses 1</option>
                  <option value='HeartSunglasses'>Heart Sunglasses</option>
                </select>
              </label>
              <label>Mouth:
                <select value={avatarOptions.mouthType} onChange={e => setAvatarOptions(o => ({ ...o, mouthType: e.target.value }))}>
                  <option value='Smile'>Smile</option>
                  <option value='Tongue'>Tongue</option>
                  <option value='Serious'>Serious</option>
                  <option value='Twinkle'>Twinkle</option>
                </select>
              </label>
            </div>
            <button
              style={{
                padding: "8px 18px",
                borderRadius: 12,
                border: "none",
                background: dark ? "#fbbf24" : "#8b5cf6",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: 15,
                marginRight: 10,
              }}
              onClick={() => {
                setUser(prev => ({ ...prev, avatarType: 'avataaars', avatarAvataaars: { ...avatarOptions } }));
                setShowAvatarBuilder(false);
              }}
            >
              Save
            </button>
            <button
              style={{
                padding: "8px 18px",
                borderRadius: 12,
                border: "none",
                background: "#eee",
                color: "#333",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: 15,
              }}
              onClick={() => setShowAvatarBuilder(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
