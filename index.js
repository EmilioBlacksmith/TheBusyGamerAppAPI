const app = require("express")();
const cors = require("cors");
const getTopGames = require("./modules/getTopGames");
const schedule = require("node-schedule");
const fs = require("fs").promises;

const PORT = 8080;

const hltb = require("howlongtobeat");
const hltbService = new hltb.HowLongToBeatService();

app.use(cors());

console.clear();

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
    console.error("\nError reading JSON file:", error.message);
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
    console.error("\n Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/manual-update", async (req, res) => {
  try {
    await getTopGames();
    console.log("\n// Manual Update Top Games Successful");
    return res.status(200).json({ message: "Manual Update Successful" });
  } catch (error) {
    console.log("\n  Error: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`// Server is running on: http://localhost:${PORT}`);
  console.log(`// CTRL + C to close server...`);
});

const updateTopGamesJob = schedule.scheduleJob("0 8 * * *", async function () {
  console.log("\n// Scheduled Update available \nAttempting Update...");
  await getTopGames();
  let currentDate = date.toDateString();
  let date = new Date(Date.now());
  console.log("\n// Updated Top Games Successful... Updated:", currentDate);
});

async function UpdateTopGames() {
  try {
    const jsonData = await fs.readFile("./public/topGames.json", "utf-8");
    const data = JSON.parse(jsonData);
    const lastUpdateDate = new Date(data[25]);
    const currentDate = new Date(Date.now());
    // divide by 3,600,000 to get the amount of hours elapsed, and that value get the floor to get the exact amount of hours elapsed since last update
    let elapsed = Math.floor((currentDate - lastUpdateDate) / 3600000);
    if (elapsed >= 24) {
      console.log(
        "\n// Hours Since Last Update:",
        elapsed,
        "|| Attempting Update..."
      );
      console.log("// Last Update Date: ", lastUpdateDate.toDateString());
      await getTopGames();
      console.log(
        "\n// Updated Top Games Successful... Updated:",
        currentDate.toDateString()
      );
    } else {
      console.log(
        "\n// Hours Since Last Update:",
        elapsed,
        " || No Update Required."
      );
      console.log("// Last Update Date: ", lastUpdateDate.toDateString());
    }
  } catch (error) {
    console.error("\nError reading JSON file:", error.message);
  }
}

UpdateTopGames();
