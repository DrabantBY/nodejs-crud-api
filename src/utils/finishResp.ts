import type { ServerResponse } from 'http';

const finishResp = (
	res: ServerResponse,
	code: number,
	message: string
): void => {
	res.statusCode = code;
	res.statusMessage = message;
	res.end(JSON.stringify({ code, message }));
};

export default finishResp;
