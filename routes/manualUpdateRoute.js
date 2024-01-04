const express = require("express");
const router = express.Router();
const getTopGames = require("../modules/getTopGames");

router.get("/", async (req, res) => {
	try {
		await getTopGames();
		console.log("\n// Manual Update Top Games Successful");
		return res.status(200).json({ message: "Manual Update Successful" });
	} catch (error) {
		console.log("\n  Error: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
});

module.exports = router;