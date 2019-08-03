const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const chalk = require("chalk");

// Load environment variables from .env file, where API keys and passwords are configured.
dotenv.config({path: ".env"});

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.json("Success");
});

app.listen(parseInt(process.env.PORT), () => {
	console.log(
		"%s App is running at http://localhost:%s in %s mode",
		chalk.green("✓"),
		process.env.PORT,
		app.get("env")
	);
	console.log("  Press CTRL-C to stop\n");
});
