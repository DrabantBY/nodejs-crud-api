import runHttpServer from './server.ts';
import 'dotenv/config';

const PORT = parseInt(process.env.PORT ?? '') || 4000;

runHttpServer(PORT);
