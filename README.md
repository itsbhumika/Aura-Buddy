# 🧠 Aura Buddy — Fitness & Wellness Dashboard

Aura Buddy is a beautifully crafted, interactive React-based wellness app that helps you track workouts, sleep, water intake, heart rate, and more. It gamifies self-care by rewarding healthy habits with XP, progress levels, and virtual pet feedback — making fitness fun and engaging.

---

## ✨ Features by Sidebar Options

### 📊 Dashboard
- Daily stats: Steps, water, calories, sleep.
- Weekly progress: Completion & averages.
- Weather insights: Conditions + activity tips.
- Reminders: Custom wellness tasks.
- Quick actions: Log water, workouts, view stats.
- Theme toggle & profile avatar customization.


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
- Workout Charts: Daily, weekly, or monthly activity trends.
- Exercise Breakdown: Pie chart of time spent by category (Jogging, Yoga, etc.).
- Smart Tips: Suggestions based on least-performed workouts.
- Health Cards: Circular meters for Calories, Water, and Sleep tracking.
- Nutrition Tracker: Macro breakdown (protein, carbs, fats, etc.) with progress bars.
- Nutrient Alerts: Detects high/low intake and gives food suggestions.
- Insights Panel: Daily activity insights, streaks, and smart improvement tips.




### 🏆 Achievements 
- 🏅 Milestone Cards (e.g., “First 5K Run”, “7-Day Streak”)  
- 🎖️ Progress Badges (Bronze, Silver, Gold levels)  
- 🏆 Trophy Shelf UI with hover animations  
- 📊 XP Progress Integration  
- 🗓️ Streak Calendar to track consistency  
- 🔓 Unlockable avatars/themes after achievements  

> Currently it is little static but features are under development simultaneously



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


### 📉 Statistics
| Feature               | Action                                                                 |
|-----------------------|------------------------------------------------------------------------|
| 📉 Weekly Workouts     | Toggle between Daily, Weekly, and Monthly views in the bar chart.     |
| 🏋 Exercise Breakdown  | View pie chart of workout categories (e.g., Jogging, Badminton, etc.) |
| ➕ Add Workout         | Click "+" to log a new workout and verify data updates.               |
| 🧮 Edit Cards          | Manually adjust Calories, Water, and Sleep goals and check progress.  |
| 🍎 Nutrition Tracker   | Add nutrients, check alerts, and view meal suggestions.               |
| 🔍 Insights            | Expand Insights to see daily progress, patterns, and tips.            |
| 🔁 Reset Stats         | Use reset option and ensure all values return to default.             |



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
* 🏆 Achievements *(static with little functioning)*
* 📝 Notes *(static)*
* 🏋 Workout Plan *(static with little functioning)*
* 🔗 Sharing Center *(static)*


## 🧱 Project Structure

```

fitness/
├── build/ 
├── node_modules/
├── public/
│ ├── assets/
│ │ ├── 1k.png
│ │ ├── audio-1.mp3
│ │ ├── audio-2.mp3
│ │ ├── aurabuddy-logo.png
│ │ ├── bird.png
│ │ ├── fire.png
│ │ ├── happy.png
│ │ ├── image.png
│ │ ├── images.jpeg
│ │ ├── images.png
│ │ ├── marathon.png
│ │ ├── meh.png
│ │ ├── sad.png
│ │ ├── moon.jpeg
│ │ ├── moon.png
│ │ ├── night-sky-bg.jpeg
│ │ ├── profile.jpeg
│ │ ├── stars-bg.jpeg
│ └── index.html
├── src/
│ ├── components/ 
│ │ ├── Achievements.js
│ │ ├── Achievements.css
│ │ ├── Dashboard.js
│ │ ├── Sidebar.js
│ │ ├── Sidebar.css
│ │ ├── SleepCounter.js
│ │ ├── SleepCounter.css
│ │ ├── Statistics.js
│ │ ├── Statistics.css
│ │ ├── Topbar.js
│ │ ├── Topbar.css
│ │ ├── WorkoutPanel.js
│ │ ├── WorkoutPanel.css
│ ├── data/
│ │ ├── Workouts.j
│ ├── App.js
│ ├── App.css
│ ├── index.js
├── .gitignore 
├── package.json 
├── package-lock.json
├── README.md
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
