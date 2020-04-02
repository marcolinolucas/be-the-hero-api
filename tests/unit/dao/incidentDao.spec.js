const connection = require('../../../src/database/connection');

const incidentDao = require('../../../src/dao/incidentDao');
const ongDao = require('../../../src/dao/ongDao');

const incidentsMock = require('../../mock/incidentsMock');
const ongsMock = require('../../mock/ongsMock');

beforeEach(async () => {
	await connection.migrate.rollback();
	await connection.migrate.latest();
});

afterAll(async () => {
	await connection.destroy();
});

describe('Incident Dao', () => {
	it('should be able to create a incidents', async () => {
		const incident = incidentsMock[0];
		const [response] = await incidentDao.createIncident(incident);

		expect(response).toBeDefined();
		expect(response).toBe(1);
	});

	it('should be able to find incidents', async () => {
		await incidentDao.createIncident(incidentsMock);

		const response = await incidentDao.findIncidents();

		expect(response).toBeDefined();
		expect(response.length).toBe(10);
	});

	it('should be able to find incident by id', async () => {
		const incident = incidentsMock[0];
		await incidentDao.createIncident(incident);

		const response = await incidentDao.findIncidentById({ id: 1 });

		expect(response).toBeDefined();
		expect(response).toEqual({ ...incident, id: 1 });
	});

	it('should be able to find incidents by page', async () => {
		await ongDao.createOng(ongsMock[0]);
		await incidentDao.createIncident(incidentsMock);

		const response = await incidentDao.findIncidentByPage({ page: 1, limit: 5 });

		expect(response).toBeDefined();
		expect(response.length).toBe(5);
	});

	it('should be able to find incidents by ong', async () => {
		const ong = ongsMock[0];

		await ongDao.createOng(ong);
		await incidentDao.createIncident(incidentsMock);

		const response = await incidentDao.findIncidentsByOngId({ ongId: ong.id });

		expect(response).toBeDefined();
		expect(response.length).toBe(10);
	});

	it('should be able to count incidents', async () => {
		await incidentDao.createIncident(incidentsMock);

		const [response] = await incidentDao.incidentsCount();

		expect(response).toBeDefined();
		expect(response).toEqual({ 'count(*)': 10 });
	});

	it('should be able to update a incident', async () => {
		const incident = incidentsMock[0];
		await incidentDao.createIncident(incident);

		const data = {
			title: 'Case Test',
			description: 'Details 1 test',
			value: 101,
		}

		const response = await incidentDao.updateIncident({ id: 1, data });

		expect(response).toBeDefined();
		expect(response).toBe(1);
	});

	it('should be able to delete a incident', async () => {
		const incident = incidentsMock[0];
		await incidentDao.createIncident(incident);

		const response = await incidentDao.deleteIncident({ id: 1 });

		expect(response).toBeDefined();
		expect(response).toBe(1);
	});
});
