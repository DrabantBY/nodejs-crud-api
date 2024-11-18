import cluster from 'node:cluster';
import { availableParallelism } from 'node:os';
import { runHttpServer } from './server.ts';

const PORT = Number(process.env.PORT ?? '') || 4000;

if (cluster.isPrimary) {
	const count = availableParallelism();

	console.log(`Main process id: ${process.pid}`);
	console.log(`Forks amount: ${count}`);

	for (let i = 0; i < count; i++) {
		cluster.fork();
	}
} else {
	runHttpServer(PORT + cluster!.worker!.id - 1);
}
