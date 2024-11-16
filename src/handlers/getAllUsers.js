import { users } from '../db.js';

const getAllUsers = (_, res) => {
	res.end(JSON.stringify(users));
};

export default getAllUsers;
