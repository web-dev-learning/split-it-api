const db = require("../utils/db");
const {checkRequiredFields, isEmail, isMinLength} = require("../utils/validator");
const {sanitiseEmail} = require("../utils/sanitiser");

async function createNewUser(req, res) {
	let {username, email, password} = req.body;

	const missingFields = checkRequiredFields(["username", "email", "password"], req.body);

	if (missingFields.length > 0) {
		res.statusCode = 400;
		return res.json({
			success: false,
			message: `The following required fields are missing: ${missingFields.join(", ")}.`,
			data: null
		});
	}

	if (!isEmail(email)) {
		res.statusCode = 400;
		return res.json({
			success: false,
			message: "The provided email is not valid.",
			data: null
		});
	}

	const minPasswordLength = 8;
	if (!isMinLength(password, minPasswordLength)) {
		res.statusCode = 400;
		return res.json({
			success: false,
			message: `Password must be at least ${minPasswordLength} characters long.`,
			data: null
		});
	}

	email = sanitiseEmail(email);

	db.query("INSERT INTO users SET ?", {username, email, password}, (error, results, fields) => {
		if (error) {
			console.error(error);
			res.statusCode = 500;
			return res.json({
				success: false,
				message: "Unexpected error occurred.",
				data: null
			});
		}

		return res.json({
			success: true,
			message: "Success.",
			data: null
		});
	});
}

module.exports = {createNewUser};
