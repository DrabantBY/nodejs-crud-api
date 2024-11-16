import { BAD_ID } from '../constants/regexp.js';

const sendNotFound = (req, res) => {
	const isBadId = BAD_ID.test(req.url);

	if (isBadId) {
		res.statusCode = 400;
		res.statusMessage = 'user id does not uuid';
		res.end(JSON.stringify({ code: 400, message: 'user id is not uuid' }));
	} else {
		res.statusCode = 404;
		res.statusMessage = 'page does not exist';
		res.end(JSON.stringify({ code: 404, message: 'page is not exist' }));
	}
};

export default sendNotFound;
