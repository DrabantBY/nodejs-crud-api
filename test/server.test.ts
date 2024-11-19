import request from 'supertest';
import { validate } from 'uuid';
import { server } from '../src/server';

const user = {
	username: 'Eugene',
	age: 37,
	hobbies: ['next.js', 'angular', 'node.js'],
};

describe('test server by route /api/users', () => {
	it('should get empty user list', async () => {
		const { status, body } = await request(server).get('/api/users');
		expect(status).toBe(200);
		expect(body).toEqual([]);
	});

	it('should post new user', async () => {
		const { status, body } = await request(server)
			.post('/api/users')
			.send(user);

		expect(status).toBe(201);
		expect(body).toMatchObject({
			code: 201,
			message: 'user successfully created',
		});
	});

	it('should get new user list', async () => {
		const { status, body } = await request(server).get('/api/users');

		expect(status).toBe(200);
		expect(body).toHaveLength(1);
		expect(validate(body[0].id)).toBe(true);
		expect(body[0]).toMatchObject(user);
	});

	it('should be error on unimplemented method', async () => {
		const { status, body } = await request(server).delete('/api/users');

		expect(status).toBe(501);
		expect(body).toMatchObject({
			code: 501,
			message: 'method not implemented',
		});
	});

	it('should be error by post invalid data', async () => {
		const { status, body } = await request(server)
			.post('/api/users')
			.send({ age: 20 });

		expect(status).toBe(400);
		expect(body).toMatchObject({
			code: 400,
			message: 'user has invalid data',
		});
	});
});
