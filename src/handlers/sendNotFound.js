import { BAD_ID } from '../constants/regexp.js';
import finfishResp from '../utils/finishResp.js';

const sendNotFound = (req, res) => {
	const isBadId = BAD_ID.test(req.url);

	if (isBadId) {
		finfishResp(res, 400, 'userId is not uuid');
	} else {
		finfishResp(res, 404, 'page is not exist');
	}
};

export default sendNotFound;
