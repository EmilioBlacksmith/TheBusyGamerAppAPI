const express = require("express");
const router = express.Router();

const testRoute = require("./testRoute");
const topGamesRoute = require("./topGamesRoute");
const manualUpdateRoute = require("./manualUpdateRoute");
const searchRoute = require("./searchRoute");

router.use("/", testRoute);
router.use("/topGames", topGamesRoute);
router.use("/manual-update", manualUpdateRoute);
router.use("/search", searchRoute);

module.exports = router;
