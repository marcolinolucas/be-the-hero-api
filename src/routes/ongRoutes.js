const express = require('express');

const routes = express.Router();

const ongDao = require('../dao/ongDao');

const hashId = require('../lib/hashId');
const statusError = require('../lib/statusError');

routes.get('/', async (req, res) => {
	try {
		const ongs = await ongDao.findOngs();
		return res.json(ongs);
	} catch (error) {
		return statusError(res, 500, error.message);
	}
});

routes.post('/create', async (req, res) => {
	try {
		const { name, email, whatsapp, city, uf } = req.body;

		if (!name) return statusError(res, 400, 'name is required');
		if (!email) return statusError(res, 400, 'email is required');
		if (!whatsapp) return statusError(res, 400, 'whatsapp is required');
		if (!city) return statusError(res, 400, 'city is required');
		if (!uf) return statusError(res, 400, 'uf is required');

		const ong = await ongDao.findOngByData({ name, email, whatsapp });
		if (ong) {
			const reasons = [];
			if (ong.name === name) reasons.push('name already registered');
			if (ong.email === email) reasons.push('email already registered');
			if (ong.whatsapp === whatsapp) reasons.push('whatsapp already registered');
			return statusError(res, 400, reasons);
		}

		const id = hashId();

		await ongDao.createOng({
			id,
			name,
			email,
			whatsapp,
			city,
			uf,
		});

		return res.json({ id });
	} catch (error) {
		return statusError(res, 500, error.message);
	}
});

routes.delete('/delete', async (req, res) => {
	try {
		const ongId = req.headers.authorization;

		if (!ongId) return statusError(res, 400, 'ongId is required');

		const ong = await ongDao.findOngById({ ongId });
		if (!ong) return statusError(res, 404, 'ONG not found');

		await ongDao.deleteOng({ ongId });
		return res.status(204).send();
	} catch (error) {
		return statusError(res, 500, error.message);
	}
});

module.exports = routes;
