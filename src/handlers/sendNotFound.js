import finishResp from '../utils/finishResp.js';
import { BAD_ID } from '../constants/regexp.js';

const sendNotFound = (req, res) => {
	const isBadId = BAD_ID.test(req.url);

	if (isBadId) {
		finishResp(res, 400, 'userId not uuid');
	} else {
		finishResp(res, 404, 'page not exist');
	}
};

export default sendNotFound;
