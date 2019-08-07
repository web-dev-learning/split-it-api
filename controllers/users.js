const db = require("../utils/db");

async function createNewUser(req, res) {
	const {username, email, password} = req.body;

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
