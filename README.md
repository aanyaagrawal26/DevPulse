# 🚀 DevPulse

**DevPulse** is a futuristic GitHub profile analyzer that evaluates a developer’s GitHub presence using repositories, stars, followers, and inferred tech stack — wrapped in a sleek animated UI with dark & light modes.

> Built to look cool, feel fast, and actually say something meaningful about a GitHub profile.

## ✨ Features

- 🔍 Analyze any GitHub username
- 🧠 **Hireability Score** (0–100)
- 🔥 **Tech Stack Detection** from repositories
- 📊 Repo, follower & star insights
- 🌗 Dark / Light mode
- ⚡ Smooth animations (Framer Motion)
- 🎨 Cyber-neon inspired UI

## 🧰 Tech Stack

### Frontend
- React (Vite)
- Framer Motion
- Axios
- CountUp
- Custom CSS animations

### Backend
- Node.js
- Express
- Axios (GitHub API)
- dotenv
- CORS

DevPulse/
├── client/ # React frontend (Vite)
│ ├── src/
│ ├── public/
│ └── package.json
│
├── server/ # Express backend
│ ├── index.js
│ ├── .env
│ └── package.json
│
└── README.md

▶️ Run Locally
Backend
cd server
npm install
npm start


Runs on: http://localhost:5050

Frontend
cd client
npm install
npm run dev


Runs on: http://localhost:5173

Hireability Score Logic

A simple weighted formula:

score = (repos × 3) + (stars × 4) + (followers × 2)
max score = 100


This is indicative, not an official hiring metric.

🛡️ Disclaimer

DevPulse is a fun + analytical tool, not a definitive measure of developer skill or employability.

👩‍💻 Author

Aanya Agrawal
GitHub → https://github.com/aanyaagrawal26

⭐ If you like this project, consider starring the repo!
