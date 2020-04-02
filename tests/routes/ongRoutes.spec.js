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

describe('ONG', () => {
	it('should be able to list all ONGs', async () => {
		await ongDao.createOng(ongsMock);

		const response = await request(app)
			.get('/ongs');

		expect(response).toBeDefined();
		expect(response.status).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.body.length).toBe(3);
	})

	it('should be able to create a new ONG', async () => {
		const response = await request(app)
			.post('/ongs/create')
			.send({
				name: 'Test',
				email: 'test@test.com',
				whatsapp: '21000000000',
				city: 'Test City',
				uf: 'TC',
			});

		expect(response).toBeDefined();
		expect(response.status).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.body).toHaveProperty('id');
		expect(response.body.id).toHaveLength(8);
	});

	it('should be able to delete a ONGs', async () => {
		const ong = ongsMock[0];

		await ongDao.createOng(ong);

		const response = await request(app)
			.delete('/ongs/delete')
			.set({ Authorization: ong.id });

		const ongs = await ongDao.findOngs();

		expect(response).toBeDefined();
		expect(response.status).toBe(204);
		expect(ongs).toBeDefined();
		expect(ongs.length).toBe(0);
	})
});
