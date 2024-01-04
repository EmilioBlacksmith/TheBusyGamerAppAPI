const schedule = require("node-schedule");
const getTopGames = require("./getTopGames");

const updateTopGamesJob = schedule.scheduleJob("0 0 * * *", async function () {
	console.log("\n// Scheduled Update available", "|| Attempting Update...");
	await getTopGames();
	let date = new Date(Date.now());
	let currentDate = date.toDateString();
	console.log("\n// Updated Top Games Successful... Updated:", currentDate);
});

module.exports = updateTopGamesJob;
