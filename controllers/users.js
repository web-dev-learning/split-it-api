const bcrypt = require("bcryptjs");

const db = require("../utils/db");
const {checkRequiredFields, isEmail, isMinLength} = require("../utils/validator");
const {sanitiseEmail} = require("../utils/sanitiser");
const {resErr, resSucc} = require("../utils/response");

async function createNewUser(req, res) {
	let {username, email, password} = req.body;

	const missingFields = checkRequiredFields(["username", "email", "password"], req.body);

	if (missingFields.length > 0) {
		return resErr(res, `The following required fields are missing: ${missingFields.join(", ")}.`);
	}

	if (!isEmail(email)) {
		return resErr(res, "The provided email is not valid.");
	}

	const minPasswordLength = 8;
	if (!isMinLength(password, minPasswordLength)) {
		return resErr(res, `Password must be at least ${minPasswordLength} characters long.`);
	}

	password = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
	email = sanitiseEmail(email);

	db.query("INSERT INTO users SET ?", {username, email, password}, (error, results, fields) => {
		if (error) {
			console.error(error);
			return resErr(res, "Unexpected error occurred.", {statusCode: 500});
		}

		return resSucc(res);
	});
}

module.exports = {createNewUser};
