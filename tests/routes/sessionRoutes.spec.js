const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

const ongDao = require('../../src/dao/ongDao');

const ongsMock = require('../mock/ongsMock');

beforeEach(async () => {
	await connection.migrate.rollback();
	await connection.migrate.latest();
});

afterAll(async () => {
	await connection.destroy();
});

describe('Session', () => {
	it('should be able to login a ONG', async () => {
		const ong = ongsMock[0];
		await ongDao.createOng(ong);

		const response = await request(app)
			.post('/session/login')
			.send({ ongId: ong.id });

		expect(response).toBeDefined();
		expect(response.status).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.body).toEqual(ong);
	});

	it('should be able to update a ONG information', async () => {
		const ong = ongsMock[0];
		await ongDao.createOng(ong);

		const data = {
			email: 'testUpdated@test.com',
			whatsapp: '21000000000',
		};

		const response = await request(app)
			.put('/session/update')
			.set({ authorization: ong.id })
			.send(data);

		const ongUpdated = await ongDao.findOngById({ ongId: ong.id });

		expect(response).toBeDefined();
		expect(response.status).toBe(204);
		expect(ongUpdated).toBeDefined();
		expect(ongUpdated).toEqual({ ...ong, ...data });
	});
});
