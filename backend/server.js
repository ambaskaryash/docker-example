const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());

app.get('/api/movie', async (req, res) => {
  const title = req.query.title;
  if (!title) return res.status(400).send("Missing movie title");

  try {
    const apiKey = process.env.OMDB_API_KEY;
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movie data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});