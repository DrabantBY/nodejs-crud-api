const checkUser = (user) => {
	const arr = Object.entries(user);

	let isValidUser = arr.length === 3;

	if (!isValidUser) {
		return isValidUser;
	}

	arr.forEach(([key, val]) => {
		isValidUser =
			(key === 'username' && typeof val === 'string' && val.length > 0) ||
			(key === 'age' && Number.isInteger(val) && val > 0) ||
			(key === 'hobbies' &&
				Array.isArray(val) &&
				val.every((v) => typeof v === 'string'));
	});

	return isValidUser;
};

export default checkUser;
