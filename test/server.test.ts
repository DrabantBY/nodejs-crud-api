import request from 'supertest';
import { validate } from 'uuid';
import { server } from '../src/server';

const user = {
	username: 'Eugene',
	age: 37,
	hobbies: ['next.js', 'angular', 'node.js'],
};

describe('test server by route /api/users', () => {
	it('should return empty user list', async () => {
		const { status, body } = await request(server).get('/api/users');

		expect(status).toBe(200);

		expect(body).toEqual([]);
	});

	it('should create new user in current user list', async () => {
		const { status, body } = await request(server)
			.post('/api/users')
			.send(user);

		expect(status).toBe(201);

		expect(body).toMatchObject({
			code: 201,
			message: 'user successfully created',
		});
	});

	it('should return user list with created user', async () => {
		const { status, body } = await request(server).get('/api/users');

		expect(status).toBe(200);

		expect(body).toHaveLength(1);

		expect(validate(body[0].id)).toBe(true);

		expect(body[0]).toMatchObject(user);
	});
});
