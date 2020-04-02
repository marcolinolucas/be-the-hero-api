const express = require('express');
const { celebrate } = require('celebrate');

const routes = express.Router();

const ongDao = require('../dao/ongDao');

const { loginSchema, updateSchema } = require('../validators/sessionValidator');

routes.post('/login', celebrate(loginSchema), async (req, res) => {
	try {
		const { ongId } = req.body;

		const ong = await ongDao.findOngById({ ongId });
		if (!ong) return res.status(404).json({ error: 'ONG not found' });

		return res.json(ong);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

routes.put('/update', celebrate(updateSchema), async (req, res) => {
	try {
		const { email, whatsapp } = req.body;
		const ongId = req.headers.authorization;

		const ong = await ongDao.findOngById({ ongId });
		if (!ong) return res.status(404).json({ error: 'ONG not found' });

		const data = {};
		if (email) data.email = email;
		if (whatsapp) data.whatsapp = whatsapp;

		if (Object.values(data).length === 0) {
			return res.status(404).json({ error: 'Empty update' });
		}

		await ongDao.updateOngById({ ongId, data });
		return res.status(204).send();
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

module.exports = routes;
