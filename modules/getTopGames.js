// WEB SCRAPPER made combined with the HowLongToBeat API by Christian Katzorke, made by Emilio Blacksmith
// https://github.com/ckatzorke/howlongtobeat
const puppeteer = require("puppeteer");
require("dotenv").config();
const cheerio = require("cheerio");
const hltb = require("howlongtobeat");
const fs = require("fs").promises;

const hltbService = new hltb.HowLongToBeatService();
const BASE_URL = "https://howlongtobeat.com/stats";

async function getTopGames() {
	const browser = await puppeteer.launch({
		args: [
			"--no-sandbox",
			"--disable-setuid-sandbox",
			"--disable-dev-shm-usage",
			"--single-process",
		],
		headless: "new",
		timeout: 0,
		executablePath:
			process.env.NODE_ENV === "production"
				? process.env.PUPPETEER_EXECUTABLE_PATH
				: puppeteer.executablePath(),
	});
	try {
		const page = await browser.newPage();

		await page.setExtraHTTPHeaders({
			"Accept-Language": "en-US,en;q=0.9",
		});

		await page.setUserAgent(
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
		);

		await page.goto(BASE_URL, { waitUntil: "networkidle2", timeout: 0 });

		const data = await page.evaluate(() => {
			return document.body.innerHTML;
		});

		const $ = cheerio.load(data);
		const links = $(".user_game_list a")
			.map((index, element) => {
				const href = element.attribs.href;
				return href ? href.split("/")[2] : null;
			})
			.get()
			.filter(Boolean);

		let topGames = Array(25);

		const promises = links.map(async (index, i) => {
			try {
				const result = await hltbService.detail(index);
				topGames[i] = result;
			} catch (e) {
				console.error(e);
			}
		});

		let currentDate = new Date(Date.now());
		currentDate.toISOString;
		topGames.push(currentDate);

		await Promise.all(promises);

		await browser.close();

		let jsonData = JSON.stringify(topGames);
		fs.writeFile("./public/topGames.json", jsonData, "utf-8");
	} catch (error) {
		console.log("Error:", error.message);
		throw error;
	}
}

module.exports = getTopGames;
