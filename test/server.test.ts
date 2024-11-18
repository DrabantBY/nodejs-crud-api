import request from 'supertest';
import { server } from '../src/server';

describe('Server Tests', () => {
	it('should return status 200', async () => {
		const response = await request(server).get('/api/users');
		expect(response.status).toBe(200);
		// expect(response.body.status).toBe('ok');
	});
});
