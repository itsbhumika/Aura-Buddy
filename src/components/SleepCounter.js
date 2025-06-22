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

  return (
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
  );
};

export default SleepCounter;
