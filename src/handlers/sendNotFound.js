import HEADER from '../constants/header.js';

const sendNotFound = (_, res) => {
	res.writeHead(404, HEADER);
	res.end(JSON.stringify({ code: 404, message: 'Page not found' }));
};

export default sendNotFound;
