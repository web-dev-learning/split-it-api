const validator = require("validator");

const checkRequiredFields = (requiredFields, fields) => {
	let missingFields = [];

	requiredFields.forEach((element) => {
		if (!fields[element] || validator.isEmpty(element)) {
			missingFields.push(element);
		}
	});

	return missingFields;
};

const isEmail = (email) => {
	return validator.isEmail(email);
};

const isMinLength = (field, minLength) => {
	return validator.isLength(field, {min: minLength});
};

module.exports = {checkRequiredFields, isEmail, isMinLength};
