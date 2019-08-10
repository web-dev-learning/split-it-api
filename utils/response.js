function resErr(res, message, {statusCode = 400} = {}) {
	res.statusCode = statusCode;
	return res.json({success: false, message, data: null});
}

function resSucc(res, data = null) {
	return res.json({success: true, message: "Success.", data});
}

module.exports = {resErr, resSucc};
