const validator = require("validator");

const sanitiseEmail = (email) => {
	return validator.normalizeEmail(email);
};

module.exports = {sanitiseEmail};
