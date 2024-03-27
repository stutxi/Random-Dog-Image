import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const result = await axios.get("https://api.thedogapi.com/v1/images/search", {
      headers: {
        'x-api-key': API_KEY
      }
    });
    res.render("index.ejs", {
      imageUrl: result.data[0].url,
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500).send("Error fetching dog image");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
