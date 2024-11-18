import { createServer } from 'node:http';
import router from './router.ts';

const server = createServer(router);

const runHttpServer = (port: number): void => {
	server.listen(port, () => {
		console.log(`\nserver is running: pid ${process.pid}, port ${port}`);
	});
};

export { server, runHttpServer };
