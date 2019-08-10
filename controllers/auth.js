const db = require("../utils/db");
const {checkRequiredFields} = require("../utils/validator");
const {sanitiseEmail} = require("../utils/sanitiser");
const {resErr, resSucc} = require("../utils/response");

async function login(req, res) {
	let {email, password} = req.body;

	const missingFields = checkRequiredFields(["email", "password"], req.body);

	if (missingFields.length > 0) {
		return resErr(res, `The following required fields are missing: ${missingFields.join(", ")}.`);
	}

	email = sanitiseEmail(email);

	db.query("SELECT * FROM users WHERE email = ?", [email], (error, results, fields) => {
		if (error) {
			console.error(error);
			return resErr(res, "Unexpected error occurred.", {statusCode: 500});
		}

		if (results.length === 0) {
			return resErr(res, "The provided email does not exist.");
		}

		if (results[0].password !== password) {
			return resErr(res, "Wrong password.");
		}

		return resSucc(res);
	});
}

module.exports = {login};
