const db = require("../utils/db");

async function login(req, res) {
	const {email, password} = req.body;

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
