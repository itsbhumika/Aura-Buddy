import React, { useEffect, useRef, useState } from 'react';
import './Achievements.css';

const achievements = [
  {
    icon: '🧙‍♂️',
    color: '#4fc3f7',
    level: 2,
    title: 'Sage',
    desc: 'Earn 1,000 XP',
    progress: 900,
    total: 1000,
  },
  {
    icon: '👑',
    color: '#ffd600',
    level: 4,
    title: 'Regal',
    desc: 'Collect 100 crowns',
    progress: 50,
    total: 100,
  },
  {
    icon: '🏆',
    color: '#ffb300',
    level: 1,
    title: 'Conqueror',
    desc: 'You completed a course',
    progress: 1,
    total: 1,
  },
];

const badges = [
  { icon: '🪖', color: '#e57373', level: 2 },
  { icon: '🧊', color: '#4fc3f7', level: 1 },
  { icon: '🎲', color: '#ff7043', level: 4 },
  { icon: '📚', color: '#9575cd', level: 3 },
  { icon: '🏆', color: '#ffd600', level: 2 },
  { icon: '♞', color: '#212121', level: 1 },
  { icon: '🏅', color: '#ffd54f', level: 6 },
  { icon: '📜', color: '#ffb74d', level: 1 },
  { icon: '🎺', color: '#29b6f6', level: 5 },
];

const streak = 8;
const longestStreak = 15;
const xp = 920;
const xpToNext = 1000;
const recentAchievement = achievements[0];
const quote = "Progress, not perfection. Every step counts!";

export default function Achievements() {
  const [showConfetti, setShowConfetti] = useState(false);
  const prevXP = useRef(xp);

  useEffect(() => {
    if (xp > prevXP.current) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
    prevXP.current = xp;
  }, [xp]);

  return (
    <div className="achievements-main-container">
      {showConfetti && <div className="confetti">🎉🎊✨</div>}

      {/* Quests Section */}
      <div className="quests-section">
        <div className="quests-title">🗺️ Daily Quests</div>
        <ul>
          <li>🏃‍♂️ Run 2km <span className="quest-reward">+50 XP</span></li>
          <li>💧 Drink 2L water <span className="quest-reward">+30 XP</span></li>
          <li>🛌 Sleep 8h <span className="quest-reward">+20 XP</span></li>
        </ul>
      </div>

      {/* XP Progress Bar */}
      <div className="xp-progress-section">
        <div className="xp-label">XP: {xp} / {xpToNext}</div>
        <div className="xp-bar-outer">
          <div className="xp-bar-inner" style={{ width: `${(xp / xpToNext) * 100}%` }}></div>
        </div>
      </div>

      {/* Streaks */}
      <div className="streaks-section">
        <div className="streak-label">🔥 Current Streak: <span>{streak} days</span></div>
        <div className="streak-label">🏅 Longest Streak: <span>{longestStreak} days</span></div>
      </div>

      {/* Recent Achievement */}
      <div className="recent-achievement-section">
        <div className="recent-achievement-title">🎉 Recent Achievement</div>
        <div className="achievement-card highlight">
          <div className="achievement-icon" style={{ background: recentAchievement.color }}>{recentAchievement.icon}</div>
          <div className="achievement-info">
            <div className="achievement-title">{recentAchievement.title}</div>
            <div className="achievement-desc">{recentAchievement.desc}</div>
          </div>
          <div className="achievement-level-badge">LEVEL {recentAchievement.level}</div>
        </div>
      </div>

      <div className="achievements-content">
        {/* Achievements List */}
        <div className="achievements-list">
          {achievements.map((a, i) => (
            <div className="achievement-card" key={i} tabIndex={0}>
              <div className="achievement-icon" style={{ background: a.color }}>{a.icon}</div>
              <div className="achievement-info">
                <div className="achievement-title">{a.title}</div>
                <div className="achievement-desc">{a.desc}</div>
                <div className="achievement-progress-bar">
                  <div className="achievement-progress-inner" style={{ width: `${(a.progress / a.total) * 100}%`, background: a.color }}></div>
                </div>
                <div className="achievement-progress-label">{a.progress}/{a.total}</div>
              </div>
              <div className="achievement-level-badge">LEVEL {a.level}</div>
              <span className="achievement-tooltip">{a.desc}</span>
            </div>
          ))}
        </div>
        {/* Badges Grid */}
        <div className="badges-grid">
          {badges.map((b, i) => (
            <div className="badge-card" key={i} style={{ background: b.color }}>
              <div className="badge-icon">{b.icon}</div>
              <div className="badge-level">LEVEL {b.level}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="motivation-quote">
        <span>💡</span> {quote}
      </div>
    </div>
  );
} 