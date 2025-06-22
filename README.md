# 🧠 Aura Buddy — Fitness & Wellness Dashboard

Aura Buddy is a beautifully crafted, interactive React-based wellness app that helps you track workouts, sleep, water intake, heart rate, and more. It gamifies self-care by rewarding healthy habits with XP, progress levels, and virtual pet feedback — making fitness fun and engaging.

---

## ✨ Features by Sidebar Options

### 📊 Dashboard
- Overview of calories, weight, sleep, steps, heart rate, and water intake.
- Integrated layout with Statistics and WorkoutPanel.
- Clean, responsive layout.



### 💤 Sleep Counter
- Set bedtime and wake time.
- Calculates sleep duration and quality.
- Mood-based pet avatar (Happy, Meh, Sad).
- XP-based leveling system with progress bar.
- Weekly sleep tracking chart (7-day bar chart).
- Fun animated emojis and XP speech feedback.
- LocalStorage persistence for XP, level, and sleep history.
- Audio reward feedback.



### 📈 Statistics
- Weekly workout bar chart.
- Exercise breakdown by category (Badminton, Jogging, etc.).
- Calories, sleep, and water tracking cards with editable values.
- Glassmorphic-style UI.
- Circular and bar visualizations for wellness stats.

> Further styling under development



### 🏆 Achievements 
- 🏅 Milestone Cards (e.g., “First 5K Run”, “7-Day Streak”)  
- 🎖️ Progress Badges (Bronze, Silver, Gold levels)  
- 🏆 Trophy Shelf UI with hover animations  
- 📊 XP Progress Integration  
- 🗓️ Streak Calendar to track consistency  
- 🔓 Unlockable avatars/themes after achievements  

> Currently it has placeholder text but soon features will be implemented



### 📝 Notes
- ➕ Add/Edit/Delete Notes with animations  
- 💾 LocalStorage persistence  
- 🖊️ Rich Text Editing (bold, lists, emoji)  
- 🎨 Color-coded categories (e.g., Workout, Diet)  
- 🔍 Search & Filter notes  
- 📅 Reminders & sticky notes  

> Currently it has placeholder text but soon features will be implemented



### 🏋 Workout Plan 
- 📆 Calendar-based workout planner (planned)  
- 🔁 Repeatable workout cycles  
- ✅ Checklist mode  
- 🧠 AI-based plan suggestions (mock)  
- 🕹️ XP rewards for completion  

> Currently it has placeholder text and a little functioning but soon features will be implemented



### 🔗 Sharing Center 
- 📤 Share button (mock toast: “Shared to Instagram!”)  
- 🔗 Copy workout as link  
- 🧑‍🤝‍🧑 Invite friends via email/username  
- 👥 Mock comparison of stats with friends  
- 📸 Generate workout image card (mock canvas)  

> Currently it has placeholder text but soon features will be implemented



### ❤️ Heart Rate 
- 📈 Live BPM line chart (mock)  
- 💓 Zone indicators: fat burn, cardio, peak  
- 🚨 Warning popups if BPM out of safe range  
- 🎯 Target BPM calculator  
- 🧘 Resting heart rate history  
- 🌙 Sleep BPM logs  

> Currently it has placeholder text but soon features will be implemented



### 🍎 Nutrition & Health
- 🍽️ Log meals (breakfast to snacks)  
- 📊 Track calories/macros visually  
- 🥗 Food suggestions by goal  
- 🧾 Daily nutrition tips  
- 🛒 Auto shopping list  
- 📷 Meal photo upload (mock)  

> Currently it has placeholder text but soon features will be implemented



### 🚪 Logout 
- ⚠️ Confirmation modal  
- ⏳ Countdown redirect animation  
- 💬 Motivational exit quote  

> Currently it has placeholder text but soon features will be implemented



>⚠️ **Note:** Most sections beyond Sleep Counter and Statistics are currently static placeholders designed for easy future enhancement.

---

## 🧪 Manual Testing Guide 

### 💤 Sleep Counter
| Feature              | Action                                                |
| -------------------- | ----------------------------------------------------- |
| ⏰ Set Sleep Time     | Choose bedtime and wake-up time                       |
| 😴 Sleep Duration     | Auto-calculates based on selected times              |
| 🐾 Pet Mood           | See avatar emotion change based on sleep score       |
| 🎮 XP Reward          | Click “Go to Sleep” to earn XP and level up          |
| 📊 Sleep History      | View last 7 days in chart                            |



### 📈 Statistics
| Feature               | Action                                                |
| --------------------- | ----------------------------------------------------- |
| 📉 Weekly Workouts     | Check bar chart of workout minutes                   |
| 🏋 Exercise Breakdown  | View per-category stats (e.g., Jogging, Badminton)   |
| 🧮 Edit Cards          | Manually adjust calories, steps, heart rate, etc.    |



### 📚 Other Sections (Static UI)
These are a little UI-ready but not yet interactive:

| Section         | Action/Placeholder Behavior                              |
| --------------- | -------------------------------------------------------- |
| 🏆 Achievements | Displays placeholder for milestone tracking              |
| 📝 Notes        | Placeholder for note editor                              |
| 🏋 Workout Plan | Shows base workout plan view                             |
| 🔗 Sharing      | Displays sharing mock layout                             |
| ❤️ Heart Rate   | Placeholder for BPM tracking                             |
| 🍎 Nutrition    | Static UI for diet planning                              |
| 🚪 Logout       | Logs out with visual feedback only                       |

---

## 📦 Installation

```bash
git clone https://github.com/your-username/aura-buddy.git
cd aura-buddy
npm install
npm start
````

---

## 📚 Sidebar Navigation Overview

### Main Sections:

* 📊 Dashboard
* 💤 Sleep Counter
* 📈 Statistics
* 🏆 Achievements *(static)*
* 📝 Notes *(static)*
* 🏋 Workout Plan *(static with little functioning)*
* 🔗 Sharing Center *(static)*

### Quick Actions:

* ❤️ Heart Rate *(static)*
* 🍎 Nutrition & Health *(static)*

### Logout:

* 🚪 Ends the session with visual feedback

---

## 🧱 Project Structure

```
aura-buddy/
├── public/
│   ├── index.html
│   └── assets/
│       ├── audio-1.mp3
│       ├── audio-2.mp3
│       ├── happy.png
│       ├── sad.png
│       ├── meh.png
│       ├── night-sky-bg.jpeg
│       ├── stars-bg.jpeg
│       ├── profile.jpeg
│       ├── images.jpeg
│       └── images.png
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── data/
│   │   └── workouts.js
│   ├── components/
│   │   ├── ActivityDetails.js
│   │   ├── ProgressBar.js
│   │   ├── ProgressBar.css
│   │   ├── RunTracker.js
│   │   ├── RunTracker.css
│   │   ├── Sidebar.js
│   │   ├── Sidebar.css
│   │   ├── SleepCounter.js
│   │   ├── SleepCounter.css
│   │   ├── Statistics.js
│   │   ├── Statistics.css
│   │   ├── Topbar.js
│   │   ├── Topbar.css
│   │   ├── WorkoutPanel.js
│   │   └── WorkoutPanel.css
├── package.json
├── package-lock.json
└── README.md
```

---

## 🛠 Built With

* ⚛ React (Functional Components + Hooks)
* 📊 Recharts (data visualization)
* 🎨 CSS Modules (modular, responsive styling)
* 💾 LocalStorage API
* 🔉 HTML5 Audio

---

## 🙏 Acknowledgements

* Emoji/pet inspirations from gamified wellness apps
* Graphs powered by Recharts
* UX modeled after apps like SleepTown, Fitbit, Habitica

---

## 🔮 Future Scope

Aura Buddy is designed for modular growth. Planned and upcoming features include:

### ✅ Functional Enhancements

* 🎖️ Milestone tracking and XP progression (Achievements section)
* 📝 Advanced rich-text Notes with tagging, reminders, and filters
* 🧠 AI-powered workout suggestions
* 📈 Live heart rate monitoring and safety alerts
* 🍽️ Full nutrition tracking and suggestions by goal
* 📅 Drag-and-drop calendar workout planning
* 📤 Social sharing, stats comparison, and invites

### 🎨 UI/UX Improvements

* 🎮 Full gamified experience across all sections
* 💡 Motivational quotes, level-up animations, and avatar unlocks
* 🌗 Improved dark/light themes and transitions
* 🧊 Enhanced Statistics layout with cleaner UI and animations

### 📱 Platform Support

* 📲 Mobile-first responsive design
* 📦 Progressive Web App (PWA) support
* ☁️ Cloud sync with secure login system

### 🧑‍🤝‍🧑 Personalization

* 🧬 Personalized daily health tips
* 🗓️ Smart goal reminders
* 🔄 Sync with wearable devices

#### *"Nourish your body. Track your growth. Let Aura Buddy cheer you on!"*

---

## ✍ Author

**Bhumika**
