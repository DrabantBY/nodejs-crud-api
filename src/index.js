import { createServer } from 'node:http';

const PORT = 3000;

export const server = createServer();

server.listen(PORT, () => console.log(`server is running on PORT: ${PORT}`));
