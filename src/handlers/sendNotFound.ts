import finishResp from '../utils/finishResp.ts';
import { BAD_ID } from '../constants/regexp.ts';
import type { Handler } from '../types.ts';

const sendNotFound: Handler = (req, res) => {
	const isBadId = BAD_ID.test(req.url!);

	if (isBadId) {
		finishResp(res, 400, 'userId not uuid');
	} else {
		finishResp(res, 404, 'page not exist');
	}
};

export default sendNotFound;
