const express = require("express");
const router = express.Router();
const hltb = require("howlongtobeat");
const hltbService = new hltb.HowLongToBeatService();

router.get("/", async (req, res) => {
	try {
		const searchQuery = req.query.q;

		if (!searchQuery) {
			return res.status(400).json({ error: "Search query parameter (q)" });
		}

		const result = await hltbService.search(`${searchQuery}`);
		const results = Array(result.length);
		const detailResults = Array(result.length);

		result.forEach((entry) => {
			results.push(entry.id);
		});

		const promises = result.map(async (index, i) => {
			try {
				const result = await hltbService.detail(index.id);
				detailResults[i] = result;
			} catch (e) {
				console.error(e);
			}
		});

		await Promise.all(promises);

		if (result.length <= 0) {
			return res.status(300).json({ error: "Search query not found" });
		}

		return res.status(200).json(detailResults);
	} catch (error) {
		console.error("\n Error:", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
});

module.exports = router;
