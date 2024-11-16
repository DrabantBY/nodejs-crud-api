const finfishResp = (res, code, message) => {
	res.statusCode = code;
	res.statusMessage = message;
	res.end(JSON.stringify({ code, message }));
};

export default finfishResp;
