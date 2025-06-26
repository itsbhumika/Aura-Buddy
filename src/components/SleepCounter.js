// src/components/SleepCounter.js
import React, { useState, useEffect, useCallback } from 'react';
import './SleepCounter.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const SLEEP_QUOTES = [
  "Power naps? More like power-ups. Rest to level up!",
  "Dreams are quests too. Let's crush those Zzzs!",
  "Your pet sleeps better when you do. Don't disappoint the fluff!",
  "A good night's sleep is the best cheat code.",
  "Every hero needs their rest. Recharge tonight!"
];

function SleepAnimationModal({ show, onClose }) {
  const [quote, setQuote] = useState("");
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (show) {
      setQuote(SLEEP_QUOTES[Math.floor(Math.random() * SLEEP_QUOTES.length)]);
    }
  }, [show]);
  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setParallax({ x, y });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  if (!show) return null;
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
      animation: "sleep-fade-in 0.7s",
      margin: 0, padding: 0,
      minHeight: "100vh", minWidth: "100vw",
      overflow: "auto",
      background: `linear-gradient(rgba(24,28,47,0.82), rgba(24,28,47,0.92)), url(${process.env.PUBLIC_URL + "/assets/night-sky-bg.jpeg"}) center/cover no-repeat`
    }} onClick={onClose}>
      <div style={{
        position: "relative",
        width: "min(600px, 90vw)",
        height: "min(450px, 70vw)",
        aspectRatio: "4/3",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(24,28,47,0.85)",
        borderRadius: 36,
        boxShadow: "0 8px 32px #000a",
        overflow: "visible"
      }} onClick={e => e.stopPropagation()}>
        {/* Glowing Moon with image face, parallax */}
        <div style={{
          position: "absolute", top: 38 + parallax.y * 10, left: 48 + parallax.x * 10, width: 110, height: 110, borderRadius: "50%",
          background: "none",
          boxShadow: "none",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden"
        }}>
          {/* Moon face image */}
          <img src={process.env.PUBLIC_URL + "/assets/moon.png"} alt="Moon Face" style={{ width: '100%', height: '100%', objectFit: 'contain', background: 'transparent', display: 'block', margin: '0 auto' }} />
        </div>
        {/* Animated Clouds with parallax (improved cartoon style, scattered left and right) */}
        <div style={{ position: "absolute", top: 60 + parallax.y * 8, left: 120 + parallax.x * 6, width: 100, height: 44, opacity: 0.7, animation: "cloud-move1 7s linear infinite alternate" }}>
          <svg width="100" height="44" viewBox="0 0 100 44">
            <ellipse cx="30" cy="24" rx="18" ry="12" fill="#fff" opacity="0.8" />
            <ellipse cx="50" cy="18" rx="20" ry="14" fill="#fff" opacity="0.9" />
            <ellipse cx="75" cy="26" rx="18" ry="12" fill="#fff" opacity="0.7" />
            <ellipse cx="40" cy="14" rx="10" ry="7" fill="#fff" opacity="0.6" />
          </svg>
        </div>
        <div style={{ position: "absolute", top: 120 + parallax.y * 6, left: 320 + parallax.x * 10, width: 90, height: 38, opacity: 0.5, animation: "cloud-move2 9s linear infinite alternate" }}>
          <svg width="90" height="38" viewBox="0 0 90 38">
            <ellipse cx="25" cy="20" rx="15" ry="10" fill="#fff" opacity="0.8" />
            <ellipse cx="45" cy="14" rx="18" ry="12" fill="#fff" opacity="0.9" />
            <ellipse cx="70" cy="22" rx="18" ry="12" fill="#fff" opacity="0.7" />
            <ellipse cx="35" cy="10" rx="8" ry="5" fill="#fff" opacity="0.6" />
          </svg>
        </div>
        <div style={{ position: "absolute", top: 220 + parallax.y * 4, left: 420 + parallax.x * 12, width: 80, height: 32, opacity: 0.4, animation: "cloud-move3 11s linear infinite alternate" }}>
          <svg width="80" height="32" viewBox="0 0 80 32">
            <ellipse cx="20" cy="18" rx="10" ry="7" fill="#fff" opacity="0.8" />
            <ellipse cx="35" cy="12" rx="14" ry="9" fill="#fff" opacity="0.9" />
            <ellipse cx="60" cy="22" rx="15" ry="10" fill="#fff" opacity="0.7" />
            <ellipse cx="28" cy="9" rx="6" ry="4" fill="#fff" opacity="0.6" />
          </svg>
        </div>
        <div style={{ position: "absolute", top: 260 + parallax.y * 2, left: 540 + parallax.x * 8, width: 90, height: 38, opacity: 0.3, animation: "cloud-move1 12s linear infinite alternate" }}>
          <svg width="90" height="38" viewBox="0 0 90 38">
            <ellipse cx="15" cy="12" rx="8" ry="5" fill="#fff" opacity="0.8" />
            <ellipse cx="30" cy="8" rx="12" ry="7" fill="#fff" opacity="0.9" />
            <ellipse cx="68" cy="14" rx="18" ry="12" fill="#fff" opacity="0.7" />
            <ellipse cx="22" cy="5" rx="5" ry="3" fill="#fff" opacity="0.6" />
          </svg>
        </div>
        {/* Sleeping pet (lowered by 15px, no pillow) */}
        <div style={{ position: "absolute", bottom: 125, left: "50%", transform: "translateX(-50%)", zIndex: 2 }}>
          {/* Pet (raised, no pillow) */}
          <img src={process.env.PUBLIC_URL + "/assets/happy.png"} alt="Sleeping Pet" style={{ width: 150, height: 75, objectFit: "contain", filter: "drop-shadow(0 4px 16px #0007)", animation: "pet-float 2.5s ease-in-out infinite alternate" }} />
        </div>
        {/* Sleep quote with overlay for contrast */}
        <div style={{ position: "absolute", bottom: 24, left: 0, width: "100%", textAlign: "center", color: "#fff", fontSize: "1.3rem", fontWeight: 700, textShadow: "0 2px 12px #000, 0 0 8px #fef08a", background: "rgba(24,28,47,0.55)", borderRadius: 12, padding: "8px 0" }}>{quote}</div>
        {/* Close button with overlay for contrast */}
        <button style={{ position: "absolute", top: 18, right: 28, background: "rgba(24,28,47,0.55)", border: "none", color: "#fff", fontSize: "2.2rem", cursor: "pointer", zIndex: 2, textShadow: "0 2px 12px #000, 0 0 8px #fef08a", borderRadius: 8, padding: "0 10px" }} onClick={onClose}>&times;</button>
        {/* Bouncing stars (scattered, not overlapping moon, pet, or text) */}
        {/* Star positions: corners and sides, avoid moon, pet, and lower 100px (quote area) */}
        {[
          { left: 20, top: 20 },    // top-left
          { left: 500, top: 30 },   // top-right
          { left: 80, top: 220 },   // left-mid
          { left: 480, top: 180 },  // right-mid
          { left: 300, top: 60 },   // upper right
          { left: 400, top: 120 },  // right
          { left: 60, top: 120 },   // left
          { left: 250, top: 180 },  // center
          { left: 320, top: 150 },  // center-right
        ].map((pos, i) => {
          const fontSize = 22 + Math.random() * 16;
          return (
            <span
              key={i}
              role="img"
              aria-label="star"
              style={{
                position: "absolute",
                left: pos.left,
                top: pos.top,
                fontSize,
                filter: "drop-shadow(0 0 8px #fffbe6cc)",
                opacity: 0.95,
                animation: `pet-float 2.2s ${i * 0.22}s ease-in-out infinite alternate`,
                zIndex: 1
              }}
            >
              ⭐
            </span>
          );
        })}
        {/* Animations */}
        <style>{`
          @keyframes sleep-fade-in { from { opacity: 0; } to { opacity: 1; } }
          @keyframes pet-float { from { transform: translateY(0); } to { transform: translateY(-16px); } }
          @keyframes sleep-zzz-float { from { transform: translateY(0); opacity: 0.7; } to { transform: translateY(-18px); opacity: 1; } }
          @keyframes star-twinkle { from { opacity: 0.5; } to { opacity: 1; } }
          @keyframes shooting-star { 0% { opacity: 0; left: 360px; top: 80px; } 10% { opacity: 1; } 80% { left: 440px; top: 120px; opacity: 1; } 100% { opacity: 0; left: 480px; top: 140px; } }
          @keyframes cloud-move1 { from { left: 160px; } to { left: 220px; } }
          @keyframes cloud-move2 { from { left: 320px; } to { left: 240px; } }
          @keyframes cloud-move3 { from { left: 80px; } to { left: 160px; } }
        `}</style>
      </div>
    </div>
  );
}

let sleepNavFlag = false;
export function triggerSleepAnimation() {
  sleepNavFlag = true;
}

const SleepCounter = () => {
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem('xp')) || 830);
  const [level, setLevel] = useState(() => parseInt(localStorage.getItem('level')) || 14);
  const [showXPPlus, setShowXPPlus] = useState(false);
  const [bedTime, setBedTime] = useState("22:30");
  const [wakeTime, setWakeTime] = useState("06:30");
  const [sleepDuration, setSleepDuration] = useState("0h 0m");
  const [sleepScore, setSleepScore] = useState(0);
  const [petMood, setPetMood] = useState("neutral");
  const [xpMessage, setXpMessage] = useState("");
  const [emojiAnim, setEmojiAnim] = useState(null);
  const [sleepHistory, setSleepHistory] = useState(() => {
    const stored = localStorage.getItem('sleepHistory');
    return stored ? JSON.parse(stored) : [];
  });
  const [showSleepModal, setShowSleepModal] = useState(false);

  const xpToNextLevel = 1000;

  const calculateSleepDetails = useCallback(() => {
    const [bedHour, bedMin] = bedTime.split(":").map(Number);
    const [wakeHour, wakeMin] = wakeTime.split(":").map(Number);

    const bedTotal = bedHour * 60 + bedMin;
    const wakeTotal = wakeHour * 60 + wakeMin;

    let duration = wakeTotal - bedTotal;
    if (duration < 0) duration += 1440;

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    setSleepDuration(`${hours}h ${minutes}m`);

    if (hours >= 7 && hours <= 9) {
      setSleepScore(100);
      setPetMood("happy");
    } else if (hours < 5) {
      setSleepScore(30);
      setPetMood("sad");
    } else {
      setSleepScore(60);
      setPetMood("meh");
    }
  }, [bedTime, wakeTime]);

  useEffect(() => {
    calculateSleepDetails();
  }, [bedTime, wakeTime, calculateSleepDetails]);

  useEffect(() => {
    localStorage.setItem('xp', xp);
    localStorage.setItem('level', level);
    localStorage.setItem('sleepHistory', JSON.stringify(sleepHistory));
  }, [xp, level, sleepHistory]);

  const gainXp = () => {
    calculateSleepDetails();

    const [bedHour, bedMin] = bedTime.split(":").map(Number);
    const [wakeHour, wakeMin] = wakeTime.split(":").map(Number);
    const bedTotal = bedHour * 60 + bedMin;
    const wakeTotal = wakeHour * 60 + wakeMin;
    let duration = wakeTotal - bedTotal;
    if (duration < 0) duration += 1440;
    const hours = Math.floor(duration / 60);

    const newHistory = [
      ...sleepHistory.slice(-6),
      {
        date: new Date().toLocaleDateString(undefined, { weekday: 'short' }),
        hours,
        score: sleepScore
      }
    ];
    setSleepHistory(newHistory);

    let bonus = 30;
    let message = "Your sleep was okay! +30 XP!";
    let emoji = null;

    if (sleepScore === 100) {
      bonus = 60;
      message = "Great job! Well rested! +60 XP";
      emoji = "😄";
    } else if (sleepScore === 30) {
      bonus = 10;
      message = "Too little sleep... your pet is sad 😢 +10 XP";
      emoji = "😢";
    } else {
      emoji = "😐";
    }

    setXpMessage(message);
    setEmojiAnim(emoji);
    setShowXPPlus(true);
    setTimeout(() => {
      setShowXPPlus(false);
      setEmojiAnim(null);
    }, 2000);

    const newXp = xp + bonus;
    if (newXp >= xpToNextLevel) {
      setLevel(level + 1);
      setXp(newXp - xpToNextLevel);
    } else {
      setXp(newXp);
    }

    const audio = new Audio(`${process.env.PUBLIC_URL}/assets/audio-1.mp3`);
    audio.play().catch((e) => console.warn("Audio play failed:", e));
  };

  const xpPercent = (xp / xpToNextLevel) * 100;

  const getPetImage = () => {
    switch (petMood) {
      case 'happy':
        return process.env.PUBLIC_URL + "/assets/happy.png";
      case 'sad':
        return process.env.PUBLIC_URL + "/assets/sad.png";
      case 'meh':
        return process.env.PUBLIC_URL + "/assets/meh.png";
      default:
        return process.env.PUBLIC_URL + "/assets/images.png";
    }
  };

  const totalSleep = sleepHistory.reduce((sum, d) => sum + d.hours, 0);
  const lastSleep = sleepHistory.length > 0 ? sleepHistory[sleepHistory.length - 1].hours : 0;

  // Listen for navigation trigger
  useEffect(() => {
    if (sleepNavFlag) {
      setShowSleepModal(true);
      sleepNavFlag = false;
    }
  }, []);

  return (
    <>
      <SleepAnimationModal show={showSleepModal} onClose={() => setShowSleepModal(false)} />
      <div className="sleep-game">
        <div className="sleep-hero">
          <div className="pet-container">
            <img
              src={getPetImage()}
              alt="Sleep Pet"
              className={`sleep-pet ${petMood}`}
            />
            <div className="level">Lv.{level}</div>
            {emojiAnim && <div className="emoji-float">{emojiAnim}</div>}
            {showXPPlus && (
              <div className="speech-bubble">
                <span>{xpMessage}</span>
              </div>
            )}
          </div>

          <div className="xp-bar">
            <div className="xp-fill" style={{ width: `${xpPercent}%` }}></div>
          </div>
          <div className="xp-label">Your Experience: {xp}/{xpToNextLevel} XP</div>

          <div className="clock-ui">
            <h4>⏰ Bed & Wake Time</h4>
            <div className="clock-inputs">
              <label>
                Bedtime:
                <input
                  type="time"
                  value={bedTime}
                  onChange={(e) => setBedTime(e.target.value)}
                />
              </label>
              <label>
                Wake Time:
                <input
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                />
              </label>
            </div>
            <div className="bed-time-display">
              🌙 Sleep From <strong>{bedTime}</strong> to <strong>{wakeTime}</strong>
            </div>
            <div className="bed-time-display">
              🛌 Duration: <strong className="animated-duration">{sleepDuration}</strong>
            </div>
            <div className="bed-time-display">
              🧠 Sleep Score: <strong>{sleepScore}/100</strong>
            </div>
          </div>

          <button className="sleep-btn" onClick={gainXp}>Go to Sleep</button>

           {sleepHistory.length > 0 && (
            <div className="sleep-history">
              <h4>📊 Sleep History (Last 7 Days)</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={sleepHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 12]} />
                  <Tooltip />
                  <Bar dataKey="hours" radius={[8, 8, 0, 0]}>
                    {sleepHistory.map((entry, index) => {
                      let color = "#d3cce3";
                      if (entry.score >= 90) color = "#b2f7ef";
                      else if (entry.score >= 60) color = "#fdfd96";
                      else color = "#ffb3ba";
                      return <Cell key={`cell-${index}`} fill={color} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="chart-legend" style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem', gap: '1rem' }}>
                <div><span style={{ backgroundColor: '#b2f7ef', padding: '4px 10px', borderRadius: '6px', display: 'inline-block', marginRight: '8px' }}></span> Good Sleep (7–9 hrs)</div>
                <div><span style={{ backgroundColor: '#fdfd96', padding: '4px 10px', borderRadius: '6px', display: 'inline-block', marginRight: '8px' }}></span> Okay Sleep (5–7 hrs)</div>
                <div><span style={{ backgroundColor: '#ffb3ba', padding: '4px 10px', borderRadius: '6px', display: 'inline-block', marginRight: '8px' }}></span> Poor Sleep (&lt;5 hrs)</div>
              </div>
              <div className="summary">
                💤 Total Sleep: {totalSleep} hrs<br />
                🌞 Last Sleep Session: {lastSleep} hrs
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default SleepCounter;
