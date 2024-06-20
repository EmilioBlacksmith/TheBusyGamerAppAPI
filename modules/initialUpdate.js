const fs = require("fs").promises;
const getTopGames = require("./getTopGames");

async function InitialUpdate() {
	try {
		const jsonData = await fs.readFile("./public/topGames.json", "utf-8");
		const data = JSON.parse(jsonData);
		const lastUpdateDate = new Date(data[25]);
		const currentDate = new Date(Date.now());
		let elapsed = Math.floor((currentDate - lastUpdateDate) / 3600000);
		if (elapsed >= 12) {
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

if (require.main === module) {
	InitialUpdate();
}

module.exports = InitialUpdate;
