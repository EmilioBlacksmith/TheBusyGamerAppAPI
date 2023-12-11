const app = require("express")();
const cors = require("cors");
const getTopGames = require("./modules/getTopGames");
const schedule = require("node-schedule");
const fs = require("fs").promises;

const PORT = 8080;

const hltb = require("howlongtobeat");
const hltbService = new hltb.HowLongToBeatService();

app.use(cors());

app.get("/test", (req, res) => {
  res.status(200).send({
    message: "lol I'm dead",
    size: "medium",
  });
});

app.get("/topGames", async (req, res) => {
  try {
    const jsonData = await fs.readFile("./public/topGames.json", "utf-8");
    const data = JSON.parse(jsonData);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error reading JSON file:", error.message);
    res.status(500).json({ success: false, error: "Internal server error" });
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

app.get("/manual-update", async (req, res) => {
  try {
    await getTopGames();
    console.log("Manual Update Top Games Successful");
    return res.status(200).json({ message: "Manual Update Successful" });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () =>
  console.log(
    `> Server is running on http://localhost:${PORT}\n`,
    `- CTRL + C to close server...`
  )
);

const updateTopGamesJob = schedule.scheduleJob("0 8 * * *", async function () {
  await getTopGames();
  let date = new Date(Date.now());
  let currentDate = date.toDateString();
  console.log("Updated Top Games Successful... Updated:", currentDate);
});

async function UpdateTopGames() {
  await getTopGames();
  let date = new Date(Date.now());
  let currentDate = date.toDateString();
  console.log("Updated Top Games Successful... Updated:", currentDate);
}

UpdateTopGames();
