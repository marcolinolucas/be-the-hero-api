const express = require('express');
const { celebrate } = require('celebrate');

const routes = express.Router();

const incidentDao = require('../dao/incidentDao');
const ongDao = require('../dao/ongDao');

const statusError = require('../lib/statusError');

const {
	pageSchema,
	headerSchema,
	createSchema,
	deleteSchema,
	updateSchema,
} = require('../validators/incidentValidator');

routes.get('/', celebrate(pageSchema), async (req, res) => {
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

routes.get('/ong', celebrate(headerSchema), async (req, res) => {
	try {
		const ongId = req.headers.authorization;

		const ong = await ongDao.findOngById({ ongId });
		if (!ong) return statusError(res, 404, 'ONG not found');

		const incidents = await incidentDao.findIncidentsByOngId({ ongId });
		return res.json(incidents);
	} catch (error) {
		return statusError(res, 500, error.message);
	}
});

routes.post('/create', celebrate(createSchema), async (req, res) => {
	try {
		const { title, description, value } = req.body;
		const ongId = req.headers.authorization;

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

routes.delete('/delete/:id', celebrate(deleteSchema), async (req, res) => {
	try {
		const { id } = req.params;
		const ongId = req.headers.authorization;

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

routes.put('/update/:id', celebrate(updateSchema), async (req, res) => {
	try {
		const { title, description, value } = req.body;
		const { id } = req.params;
		const ongId = req.headers.authorization;

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
