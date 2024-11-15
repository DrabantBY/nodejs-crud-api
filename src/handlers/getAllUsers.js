import { users } from '../db.js';
import HEADER from '../constants/header.js';

const getAllUsers = (_, res) => {
	res.writeHead(200, HEADER);
	res.end(JSON.stringify(users));
};

export default getAllUsers;
