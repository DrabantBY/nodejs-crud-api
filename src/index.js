import { createServer } from 'node:http';
import 'dotenv/config';
import router from './router.js';

const PORT = process.env.PORT || 4000;

export const server = createServer((req, res) => {
	res.end(router(req, res));
});

server.listen(PORT, () => {
	console.log(`server is running on PORT: ${PORT}`);
});
