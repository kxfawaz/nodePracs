const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// Helper for requesting GitHub user info
async function getGithubUser(username) {
  try {
    const res = await axios.get(`https://api.github.com/users/${username}`);
    return { name: res.data.name, bio: res.data.bio };
  } catch {
    return { error: `User '${username}' not found` };
  }
}

app.post("/", async function (req, res, next) {
  try {
    const { developers } = req.body;
    if (!developers || !Array.isArray(developers)) {
      return res.status(400).json({ error: "developers must be an array" });
    }

    const results = await Promise.all(developers.map(getGithubUser));
    return res.json(results);
  } catch (err) {
    return next(err);
  }
});

// Standard error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(3000, () => console.log("Server running on 3000"));
