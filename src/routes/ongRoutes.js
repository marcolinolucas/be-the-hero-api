const express = require('express');
const { celebrate } = require('celebrate');

const routes = express.Router();

const ongDao = require('../dao/ongDao');

const hashId = require('../lib/hashId');

const { createSchema, deleteSchema } = require('../validators/ongValidator');

routes.get('/', async (req, res) => {
	try {
		const ongs = await ongDao.findOngs();
		return res.json(ongs);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

routes.post('/create', celebrate(createSchema), async (req, res) => {
	try {
		const { name, email, whatsapp, city, uf } = req.body;

		const ong = await ongDao.findOngByData({ name, email, whatsapp });
		if (ong) {
			const reasons = [];
			if (ong.name === name) reasons.push('name already registered');
			if (ong.email === email) reasons.push('email already registered');
			if (ong.whatsapp === whatsapp) reasons.push('whatsapp already registered');
			return res.status(400).json({ error: reasons });
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
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

routes.delete('/delete', celebrate(deleteSchema), async (req, res) => {
	try {
		const ongId = req.headers.authorization;

		const ong = await ongDao.findOngById({ ongId });
		if (!ong) return res.status(404).json({ error: 'ONG not found' });

		await ongDao.deleteOng({ ongId });
		return res.status(204).send();
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

module.exports = routes;
