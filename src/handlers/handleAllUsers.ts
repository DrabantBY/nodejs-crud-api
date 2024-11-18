import { v4 as uuid } from 'uuid';
import { users } from '../db.ts';
import checkUser from '../utils/checkUser.ts';
import finishResp from '../utils/finishResp.ts';
import type { Handler, User } from '../types.ts';

const handleAllUsers: Handler = (req, res) => {
	switch (req.method) {
		case 'GET':
			res.end(JSON.stringify([...users.values()]));
			break;

		case 'POST':
			let body = '';

			req.on('data', (chunk) => {
				body += chunk;
			});

			req.on('error', () => {
				finishResp(res, 500, 'internal server error');
			});

			req.on('end', () => {
				try {
					const user = JSON.parse(body) as User;

					const isValidUser = checkUser(user, 'post');

					if (isValidUser) {
						user.id = uuid();
						users.set(user.id, user);

						finishResp(res, 201, 'user successfully created');
					} else {
						finishResp(res, 400, 'user has invalid data');
					}
				} catch {
					finishResp(res, 500, 'internal server error');
				}
			});

			break;

		default:
			finishResp(res, 501, 'method not implemented');
	}
};

export default handleAllUsers;
