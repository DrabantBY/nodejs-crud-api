import type { User } from '../types.ts';

const checkUser = (user: User, method: string): boolean => {
	const arr = Object.entries(user);

	let isValidUser =
		method === 'post'
			? arr.length === 3
			: method === 'put'
			? arr.length > 0 && arr.length <= 3
			: false;

	if (!isValidUser) {
		return isValidUser;
	}

	for (const [key, val] of arr) {
		isValidUser =
			(key === 'username' && typeof val === 'string' && val.length > 0) ||
			(key === 'age' &&
				typeof val === 'number' &&
				Number.isInteger(val) &&
				val > 0) ||
			(key === 'hobbies' &&
				Array.isArray(val) &&
				val.every((v) => typeof v === 'string'));

		if (!isValidUser) {
			break;
		}
	}

	return isValidUser;
};

export default checkUser;
