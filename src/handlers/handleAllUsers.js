import { v4 as uuid } from 'uuid';
import { users } from '../db.js';
import checkUser from '../utils/checkUser.js';
import finfishResp from '../utils/finishResp.js';

const handleAllUsers = (req, res) => {
	switch (req.method) {
		case 'GET':
			res.end(JSON.stringify(users));
			break;

		case 'POST':
			let body = '';

			req.on('data', (chunk) => {
				body += chunk;
			});

			req.on('error', () => {
				finfishResp(res, 500, 'internal server error');
			});

			req.on('end', () => {
				try {
					const user = JSON.parse(body);

					const isValidUser = checkUser(user);

					if (isValidUser) {
						user.id = uuid();
						users.push(user);
						finfishResp(res, 201, 'user successfully created');
					} else {
						finfishResp(res, 400, 'user has invalid data');
					}
				} catch {
					finfishResp(res, 500, 'internal server error');
				}
			});

			break;

		default:
			finfishResp(res, 501, 'method not implemented');
	}
};

export default handleAllUsers;
