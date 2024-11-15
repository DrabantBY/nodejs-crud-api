import { users } from '../db.js';
import HEADER from '../constants/header.js';

const getUserById = (_, res, userId) => {
	const user = users.find(({ id }) => userId === id);

	if (user) {
		res.writeHead(200, HEADER);
		res.end(JSON.stringify(user));
	} else {
		res.writeHead(404, HEADER);
		res.end(JSON.stringify({ code: 404, message: 'user not found' }));
	}
};

export default getUserById;
