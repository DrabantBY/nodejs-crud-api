import { users } from '../db.js';

const getUserById = (_, res, userId) => {
	const user = users.find(({ id }) => userId === id);

	if (user) {
		res.end(JSON.stringify(user));
	} else {
		res.statusCode = 404;
		res.statusMessage = 'user does not exist';
		res.end(JSON.stringify({ code: 404, message: 'user does not exist' }));
	}
};

export default getUserById;
