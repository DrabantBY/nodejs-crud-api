import { users } from '../db.js';
import finishResp from '../utils/finishResp.js';
import checkUser from '../utils/checkUser.js';

const handleUserId = (req, res, userId) => {
	if (users.has(userId)) {
		switch (req.method) {
			case 'GET':
				res.end(JSON.stringify(users.get(userId)));
				break;

			case 'DELETE':
				users.delete(userId);
				finishResp(res, 204, 'user successfully deleted');
				break;

			case 'PUT':
				let body = '';

				req.on('data', (chunk) => {
					body += chunk;
				});

				req.on('error', () => {
					finishResp(res, 500, 'internal server error');
				});

				req.on('end', () => {
					try {
						const data = JSON.parse(body);

						const isValidData = checkUser(data, 'put');

						if (isValidData) {
							const user = users.get(userId);
							users.set(userId, { ...user, ...data });

							finishResp(res, 200, 'user successfully updated');
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
	} else {
		finishResp(res, 404, 'user not exist');
	}
};

export default handleUserId;
