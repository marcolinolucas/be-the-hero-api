const connection = require('../../../src/database/connection');

const ongDao = require('../../../src/dao/ongDao');

const ongsMock = require('../../mock/ongsMock');

beforeEach(async () => {
	await connection.migrate.rollback();
	await connection.migrate.latest();
});

afterAll(async () => {
	await connection.destroy();
});

describe('Ong Dao', () => {
	it('should be able to create a ong', async () => {
		const ong = ongsMock[0];
		const [response] = await ongDao.createOng(ong);

		expect(response).toBeDefined();
		expect(response).toBe(1);
	});

	it('should be able to find ongs', async () => {
		await ongDao.createOng(ongsMock);

		const response = await ongDao.findOngs();

		expect(response).toBeDefined();
		expect(response.length).toBe(3);
	});

	it('should be able to find ong by id', async () => {
		const ong = ongsMock[0];
		await ongDao.createOng(ong);

		const response = await ongDao.findOngById({ ongId: ong.id });

		expect(response).toBeDefined();
		expect(response).toEqual(ong);
	});

	it('should be able to find incidents by data', async () => {
		const ong = ongsMock[0];
		await ongDao.createOng(ong);

		const data = {
			name: "Test1",
			email: "test1@test.com",
			whatsapp: "21000000001",
		};

		const response = await ongDao.findOngByData(data);

		expect(response).toBeDefined();
		expect(response).toEqual(ong);
	});

	it('should be able to update a ong', async () => {
		const ong = ongsMock[0];
		await ongDao.createOng(ong);

		const data = {
			email: 'test123@test.com',
			whatsapp: '21000000001',
		};

		const response = await ongDao.updateOngById({ ongId: ong.id, data });

		expect(response).toBeDefined();
		expect(response).toBe(1);
	});

	it('should be able to delete a ong', async () => {
		const ong = ongsMock[0];
		await ongDao.createOng(ong);

		const response = await ongDao.deleteOng({ ongId: ong.id });

		expect(response).toBeDefined();
		expect(response).toBe(1);
	});
});
