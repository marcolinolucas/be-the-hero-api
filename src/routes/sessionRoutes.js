const express = require('express');

const routes = express.Router();

const ongDao = require('../dao/ongDao');

const statusError = require('../lib/statusError');

routes.post('/login', async (req, res) => {
	try {
		const { ongId } = req.body;
		if (!ongId) return statusError(res, 400, 'ongId is required');

		const ong = await ongDao.findOngById({ ongId });
		if (!ong) return statusError(res, 404, 'ONG not found');

		return res.json(ong);
	} catch (error) {
		return statusError(res, 500, error.message);
	}
});

routes.put('/update', async (req, res) => {
	try {
		const { email, whatsapp } = req.body;
		const ongId = req.headers.authorization;
		if (!ongId) return statusError(res, 400, 'ongId is required');

		const ong = await ongDao.findOngById({ ongId });
		if (!ong) return statusError(res, 404, 'ONG not found');

		const data = {};
		if (email) data.email = email;
		if (whatsapp) data.whatsapp = whatsapp;

		if (Object.values(data).length === 0) {
			return statusError(res, 404, 'Empty update');
		}

		await ongDao.updateOngById({ ongId, data });
		return res.status(204).send();
	} catch (error) {
		return statusError(res, 500, error.message);
	}
});

module.exports = routes;
