const db = require("../utils/db");

const {checkRequiredFields} = require("../utils/validator");
const {sanitiseEmail} = require("../utils/sanitiser");

async function login(req, res) {
	let {email, password} = req.body;

	const missingFields = checkRequiredFields(["email", "password"], req.body);

	if (missingFields.length > 0) {
		res.statusCode = 400;
		return res.json({
			success: false,
			message: `The following required fields are missing: ${missingFields.join(", ")}.`,
			data: null
		});
	}

	email = sanitiseEmail(email);

	db.query("SELECT * FROM users WHERE email = ?", [email], (error, results, fields) => {
		if (error) {
			console.error(error);
			res.statusCode = 500;
			return res.json({
				success: false,
				message: "Unexpected error occurred.",
				data: null
			});
		}

		if (results.length === 0) {
			res.statusCode = 400;
			return res.json({
				success: false,
				message: "The provided email does not exist.",
				data: null
			});
		}

		if (results[0].password !== password) {
			res.statusCode = 400;
			return res.json({
				success: false,
				message: "Wrong password.",
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

module.exports = {login};
