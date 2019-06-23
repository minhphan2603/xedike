const _ = require("lodash");
const validator = require("validator");

validateRegisterInput = data => {
	let err = {};
	data.email = _.get(data, "email", "");
	data.password = _.get(data, "password", "");
	data.password2 = _.get(data, "password2", "");
	data.fullName = _.get(data, "fullName", "");
	data.userType = _.get(data, "userType", "");
	data.phone = _.get(data, "phone", "");
	data.DOB = _.get(data, "DOB", "");

	// email
	if (validator.isEmpty(data.email)) {
		err.email = "email is required";
	} else if (!validator.isEmail(data.email)) {
		err.email = "email is invalid";
	}

	// password
	if (validator.isEmpty(data.password)) {
		err.password = "password is required";
	} else if (!validator.isLength(data.password, { min: 6 })) {
		err.password = "password has at least 6 character";
	}

	// password 2
	if (validator.isEmpty(data.password2)) {
		err.password2 = "confirmed password is required";
	} else if (!validator.equals(data.password, data.password2)) {
		err.password2 = "confirmed password is not matched";
	}

	return {
		isValid: _.isEmpty(err),
		err
	};
};

module.exports = validateRegisterInput;
