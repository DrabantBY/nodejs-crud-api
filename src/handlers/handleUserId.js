import { users } from '../db.js';
import finfishResp from '../utils/finishResp.js';

const handleUserId = (_, res, userId) => {
	const user = users.find(({ id }) => userId === id);

	if (user) {
		res.end(JSON.stringify(user));
	} else {
		finfishResp(res, 404, 'user is not exist');
	}
};

export default handleUserId;
