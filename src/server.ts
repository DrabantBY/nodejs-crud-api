import { createServer } from 'node:http';
import router from './router.ts';

const runHttpServer = (port: number): void => {
	createServer(router).listen(port, () => {
		console.log(`server is running: process id: ${process.pid}, port: ${port}`);
	});
};

export default runHttpServer;
