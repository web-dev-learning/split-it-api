const dotenv = require("dotenv");
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const chalk = require("chalk");

// Load environment variables from .env file, where API keys and passwords are configured.
dotenv.config({path: ".env"});

const db = mysql.createConnection(process.env.DB_CONNECTION_STRING);

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

app.get("/users", (req, res) => {
	try {
		db.query("SELECT * FROM users", function(error, results) {
			if (error) {
				throw error;
			}
			res.json(results);
		});
	} catch (err) {
		console.error(err);
		res.json("Error: " + err);
	}
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
