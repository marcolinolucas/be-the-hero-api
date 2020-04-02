const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

const ongDao = require('../../src/dao/ongDao');
const incidentDao = require ('../../src/dao/incidentDao');

const ongsMock = require('../mock/ongsMock');
const incidentsMock = require('../mock/incidentsMock');

beforeEach(async () => {
	await connection.migrate.rollback();
	await connection.migrate.latest();
});

afterAll(async () => {
	await connection.destroy();
});

describe('Incident', () => {
	it('should be able to list incidents', async () => {
		await ongDao.createOng(ongsMock[0]);
		await incidentDao.createIncident(incidentsMock);

		const response = await request(app)
			.get('/incidents');

		expect(response).toBeDefined();
		expect(response.status).toBe(200);
		expect(response.header).toBeDefined();
		expect(response.header['x-total-count']).toBe(''+incidentsMock.length);
		expect(response.body).toBeDefined();
		expect(response.body.length).toBe(5);
	})

	it('should be able to create a new incident', async () => {
		const ong = ongsMock[0];

		await ongDao.createOng(ong);

		const response = await request(app)
			.post('/incidents/create')
			.set({ Authorization: ong.id })
			.send({
				title: 'Case Test',
				description: 'Details Test',
				value: 100
			});

		expect(response).toBeDefined();
		expect(response.status).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.body).toHaveProperty('id');
	});

	it('should be able to delete a incident', async () => {
		const ong = ongsMock[0];
		const incident = incidentsMock[0];

		await ongDao.createOng(ong);
		await incidentDao.createIncident(incident);

		const response = await request(app)
			.delete(`/incidents/delete/1`)
			.set({ Authorization: ong.id });

		const incidents = await incidentDao.findIncidents();

		expect(response).toBeDefined();
		expect(response.status).toBe(204);
		expect(incidents).toBeDefined();
		expect(incidents.length).toBe(0);
	});

	it('should be able to update a incident', async () => {
		const ong = ongsMock[0];
		const incident = incidentsMock[0];

		await ongDao.createOng(ong);
		await incidentDao.createIncident(incident);

		const data = {
			title: 'Case Test',
			description: 'Details Test',
			value: 101
		};

		const response = await request(app)
			.put(`/incidents/update/1`)
			.set({ Authorization: ong.id })
			.send(data);

		const incidentUpdated = await incidentDao.findIncidentById({ id: 1 });
		expect(response).toBeDefined();
		expect(response.status).toBe(204);
		expect(incidentUpdated).toBeDefined();
		expect(incidentUpdated).toEqual({ ...incident, ...data, id: 1 });
	});
});
