const express = require("express");
const router = express.Router();
const fs = require("fs").promises;

router.get("/", async (req, res) => {
	try {
		const jsonData = await fs.readFile("./public/topGames.json", "utf-8");
		const data = JSON.parse(jsonData);
		res.status(200).json(data);
	} catch (error) {
		console.error("\nError reading JSON file:", error.message);
		res.status(500).json({ success: false, error: "Internal server error" });
	}
});

module.exports = router;
