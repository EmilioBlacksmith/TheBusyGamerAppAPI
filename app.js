const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const schedule = require("./modules/schedule");
const app = express();
const initialUpdate = require("./modules/initialUpdate");

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(routes);

console.clear();

app.listen(PORT, () => {
	console.log(`// Server is running on: ${PORT}`);
	console.log(`// CTRL + C to close server...`);
});

initialUpdate();
