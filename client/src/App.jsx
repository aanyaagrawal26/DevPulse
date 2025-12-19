import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";

function App() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [booting, setBooting] = useState(true);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 1800);
    return () => clearTimeout(t);
  }, []);

  const analyze = async () => {
    if (!username) return;
    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await axios.get(
        fetch(`https://devpulse-huvg.onrender.com/api/github/${username}`)

      );
      setData(res.data);
    } catch {
      setError("GitHub user not found ❌");
    } finally {
      setLoading(false);
    }
  };

  /* 🧠 Hireability score */
  const hireability = data
    ? Math.min(
        100,
        data.publicRepos * 3 + data.followers * 2 + data.stars * 4
      )
    : 0;

  const hireLabel =
    hireability < 25
      ? "Beginner"
      : hireability < 50
      ? "Junior Dev"
      : hireability < 75
      ? "Strong Dev"
      : "Hire-ready";

  /* 🔥 Tech stack detector */
  const detectStack = () => {
    if (!data?.repos) return [];

    const techMap = {
      React: ["react", "jsx"],
      NextJS: ["next"],
      Node: ["node", "express"],
      Python: ["python", "flask", "django"],
      Java: ["java", "spring"],
      Docker: ["docker"],
    };

    const found = new Set();

    data.repos.forEach((r) => {
      const text = `${r.name} ${r.description || ""}`.toLowerCase();
      Object.entries(techMap).forEach(([tech, keys]) => {
        if (keys.some((k) => text.includes(k))) found.add(tech);
      });
    });

    return [...found];
  };

  const stack = detectStack();

  return (
    <div className={`container ${theme}`}>
      <div className="bg-particles" />
      <div className="bg-noise" />

      <button
        className="theme-toggle"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
      </button>

      <AnimatePresence>
        {booting && (
          <motion.div className="boot" exit={{ opacity: 0 }}>
            <motion.h1
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.1 }}
            >
              Initializing DevPulse…
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {!booting && (
        <motion.div
          className="card"
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <h1>🚀 DevPulse</h1>

          <input
            className="input"
            placeholder="GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
          />

          <button className="btn" onClick={analyze}>
            {loading ? "Scanning…" : "Analyze"}
          </button>

          {error && <p className="error">{error}</p>}

          {data && (
            <div className="stats">
              <img src={data.avatar} alt="avatar" />
              <h2>{data.login}</h2>
              <p>{data.bio || "No bio provided"}</p>

              <div className="grid">
                <div>Repos<br /><CountUp end={data.publicRepos} /></div>
                <div>Followers<br /><CountUp end={data.followers} /></div>
                <div>Stars<br /><CountUp end={data.stars} /></div>
              </div>

              {/* 🧠 Hireability Meter */}
              <div className="hire-meter">
                🧠 Hireability — <strong>{hireability}%</strong>
                <span className="hire-label">{hireLabel}</span>
                <div className="bar">
                  <motion.div
                    className="fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${hireability}%` }}
                  />
                </div>
              </div>

              {/* 🔥 Tech stack */}
              {stack.length > 0 && (
                <div className="tech">
                  🔥 Tech Stack
                  <div className="tech-list">
                    {stack.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default App;
