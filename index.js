const app = require("express")();
const cors = require("cors");
const getTopGames = require("./modules/getTopGames");

const PORT = 8080;

const hltb = require("howlongtobeat");
const hltbService = new hltb.HowLongToBeatService();

app.use(cors());

app.get("/test", (req, res) => {
  res.status(200).send({
    message: "nigga",
    size: "medium",
  });
});

app.get("/topGames", async (req, res) => {
  try {
    const topGames = await getTopGames();
    res.status(200).json(topGames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/search", async (req, res) => {
  try {
    const searchQuery = req.query.q;

    if (!searchQuery) {
      return res.status(400).json({ error: "Search query parameter (q)" });
    }

    const result = await hltbService.search(`${searchQuery}`);

    if (result.length <= 0) {
      return res.status(300).json({ error: "Search query not found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () =>
  console.log(
    `> Server is running on http://localhost:${PORT}\n`,
    `- CTRL + C to close server...`
  )
);
