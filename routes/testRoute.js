const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	const htmlResponse = `
            <div>
                <p>Welcome to The Busy App's API (Powered by HowLongToBeat API by Christian Katzorke)</p>
                <p>HowLongToBeat API Link: <a href="https://github.com/ckatzorke/howlongtobeat" target="_blank">https://github.com/ckatzorke/howlongtobeat</a></p>
                <p>Developed by Emilio Blacksmith.</p>
            </div>
            `;

	res.status(200).send(htmlResponse);
});

module.exports = router;
