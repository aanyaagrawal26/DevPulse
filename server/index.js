import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* =====================
   BASIC HEALTH CHECK
===================== */
app.get("/api", (req, res) => {
  res.send("DevPulse API is running 🚀");
});

/* =====================
   GITHUB PROFILE ROUTE
===================== */
app.get("/api/github/:username", async (req, res) => {
  const inputUsername = req.params.username;

  try {
    // 1️⃣ Fetch user (GitHub normalizes internally)
    const userRes = await axios.get(
      `https://api.github.com/users/${inputUsername}`
    );

    const realUsername = userRes.data.login; // ✅ IMPORTANT

    // 2️⃣ Fetch repos using REAL username
    const reposRes = await axios.get(
      `https://api.github.com/users/${realUsername}/repos?per_page=100`
    );

    const totalStars = reposRes.data.reduce(
      (sum, repo) => sum + repo.stargazers_count,
      0
    );

    res.json({
      login: realUsername,
      avatar: userRes.data.avatar_url,
      followers: userRes.data.followers,
      following: userRes.data.following,
      publicRepos: userRes.data.public_repos,
      stars: totalStars,
      bio: userRes.data.bio,
    });
  } catch (error) {
    res.status(404).json({ error: "GitHub user not found" });
  }
});

/* =====================
   START SERVER (LAST)
===================== */
const PORT = 5050;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
