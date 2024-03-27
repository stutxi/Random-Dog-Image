import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;
const API_KEY = 'live_NQV5gGW2U49t6IJlrpH9FBmkRjKcUVflNiNOYkXTk8dAuu5CsYqDy63SzC6rurCE';

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
