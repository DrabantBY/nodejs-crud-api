import { createServer } from 'node:http';
import router from './router.js';

const runHttpServer = (port) => {
	createServer(router).listen(port, () => {
		console.log(`server is running: process id: ${process.pid}, port: ${port}`);
	});
};

export default runHttpServer;
