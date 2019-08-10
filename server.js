const dotenv = require("dotenv");
// Load environment variables from .env file, where API keys and passwords are configured.
dotenv.config({path: ".env"});

const db = require("./utils/db");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const chalk = require("chalk");

db.connect((err) => {
	if (err) {
		console.error(err);
		console.log("%s MySQL connection error. Please make sure MySQL is running.", chalk.red("✗"));
		process.exit();
	}
});

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/docs", require("./routes/docs"));
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));

app.listen(parseInt(process.env.PORT), () => {
	console.log(
		"%s App is running at http://localhost:%s in %s mode",
		chalk.green("✓"),
		process.env.PORT,
		app.get("env")
	);
	console.log("  Press CTRL-C to stop\n");
});
