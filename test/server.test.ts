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

describe('test server by route /api/users/{userId}', () => {
	let userId: string;

	beforeAll(async () => {
		await request(server).post('/api/users').send(user);
		const { body } = await request(server).get('/api/users');
		userId = body[0].id;
	});

	it('should get user', async () => {
		const { status, body } = await request(server).get(`/api/users/${userId}`);

		expect(status).toBe(200);
		expect(validate(body.id)).toBe(true);
		expect(body.id).toBe(userId);
		expect(body).toMatchObject(user);
	});

	it('should update user', async () => {
		const { status, body } = await request(server)
			.put(`/api/users/${userId}`)
			.send({ username: 'John' });

		expect(status).toBe(200);
		expect(body).toMatchObject({
			code: 200,
			message: 'user successfully updated',
		});
	});

	it('should get updated user', async () => {
		const { status, body } = await request(server).get(`/api/users/${userId}`);

		expect(status).toBe(200);
		expect(validate(body.id)).toBe(true);
		expect(body.id).toBe(userId);
		expect(body.username).toBe('John');
	});

	it('should be error by put invalid data', async () => {
		const { status, body } = await request(server)
			.put(`/api/users/${userId}`)
			.send({ hobbies: 'stalker2' });

		expect(status).toBe(400);
		expect(body).toMatchObject({
			code: 400,
			message: 'user has invalid data',
		});
	});

	it('should be error on unimplemented method', async () => {
		const { status, body } = await request(server)
			.patch(`/api/users/${userId}`)
			.send({ username: 'John' });

		expect(status).toBe(501);
		expect(body).toMatchObject({
			code: 501,
			message: 'method not implemented',
		});
	});

	it('should delete user', async () => {
		const { status, body } = await request(server).delete(
			`/api/users/${userId}`
		);

		expect(status).toBe(204);
		expect(body).toBe('');
	});

	it('should be error if user does not exist', async () => {
		const { status, body } = await request(server).get(`/api/users/${userId}`);

		expect(status).toBe(404);
		expect(body).toMatchObject({
			code: 404,
			message: 'user not exist',
		});
	});
});

describe('test common server errors', () => {
	it('should be error by invalid route', async () => {
		const { status, body } = await request(server).get('/not/exist/route');

		expect(status).toBe(404);
		expect(body).toMatchObject({
			code: 404,
			message: 'page not exist',
		});
	});

	it('should be error by invalid userId', async () => {
		const { status, body } = await request(server).get('/api/users/userId');

		expect(status).toBe(400);
		expect(body).toMatchObject({
			code: 400,
			message: 'userId not uuid',
		});
	});
});
