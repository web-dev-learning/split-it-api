const db = require("../utils/db");

async function createNewUser(req, res) {
	const {username, email, password} = req.body;

	db.query("INSERT INTO users SET ?", {username, email, password}, (error, results, fields) => {
		if (error) {
			console.error(error);
			res.statusCode = 400;
			return res.json({
				success: false,
				message: error.sqlMessage,
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
