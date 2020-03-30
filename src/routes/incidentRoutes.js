const express = require('express');

const routes = express.Router();

const incidentDao = require('../dao/incidentDao');
const ongDao = require('../dao/ongDao');

const statusError = require('../lib/statusError');

routes.get('/', async (req, res) => {
	try {
		const { page = 1, limit = 5 } = req.query;

		const promises = [];
		promises.push(incidentDao.incidentsCount());
		promises.push(incidentDao.findIncidentByPage({ page, limit }));

		const [[incidentsCount], incidents] = await Promise.all(promises);

		res.header('X-Total-Count', incidentsCount['count(*)']);
		return res.json(incidents);
	} catch (error) {
		return statusError(res, 500, error.message);
	}
});

routes.get('/ong', async (req, res) => {
	try {
		const ongId = req.headers.authorization;
		if (!ongId) return statusError(res, 400, 'ongId is required');

		const ong = await ongDao.findOngById({ ongId });
		if (!ong) return statusError(res, 404, 'ONG not found');

		const incidents = await incidentDao.findIncidentsByOngId({ ongId });
		return res.json(incidents);
	} catch (error) {
		return statusError(res, 500, error.message);
	}
});

routes.post('/create', async (req, res) => {
	try {
		const { title, description, value } = req.body;
		const ongId = req.headers.authorization;

		if (!title) return statusError(res, 400, 'title is required');
		if (!description) return statusError(res, 400, 'description is required');
		if (!value) return statusError(res, 400, 'value is required');

		const ong = await ongDao.findOngById({ ongId });
		if (!ong) return statusError(res, 404, 'ONG not found');

		const [id] = await incidentDao.createIncident({
			title,
			description,
			value,
			ongId,
		});

		return res.json({ id });
	} catch (error) {
		return statusError(res, 500, error.message);
	}
});

routes.delete('/delete/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const ongId = req.headers.authorization;

		if (!id) return statusError(res, 400, 'id is required');
		if (!ongId) return statusError(res, 400, 'ongId is required');

		const incident = await incidentDao.findIncidentById({ id });
		if (!incident) return statusError(res, 404, 'Incident not found');

		if (incident.ongId !== ongId) {
			return statusError(res, 401, 'Operation not permitted');
		}

		await incidentDao.deleteIncident({ id });
		return res.status(204).send();
	} catch (error) {
		return statusError(res, 500, error.message);
	}
});

routes.put('/update/:id', async (req, res) => {
	try {
		const { title, description, value } = req.body;

		const { id } = req.params;
		if (!id) return statusError(res, 400, 'incidentId is required');

		const ongId = req.headers.authorization;
		if (!ongId) return statusError(res, 400, 'ongId is required');

		const ong = await ongDao.findOngById({ ongId });
		if (!ong) return statusError(res, 404, 'ONG not found');

		const incident = await incidentDao.findIncidentById({ id });
		if (!incident) return statusError(res, 404, 'Incident not found');

		if (incident.ongId !== ongId) {
			return statusError(res, 401, 'Operation not permitted');
		}

		const data = {};
		if (title) data.title = title;
		if (description) data.description = description;
		if (value) data.value = value;

		await incidentDao.updateIncident({ id, data });
		return res.status(204).send();
	} catch (error) {
		return statusError(res, 500, error.message);
	}
});

module.exports = routes;
