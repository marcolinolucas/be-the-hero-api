const express = require('express');

const routes = express.Router();

const InstagramService = require('../services/InstagramService');

routes.get('/', async (req, res) => {
	try {
		const { code } = req.query;
		// if (!code) return res.json({ message: 'WithoutCode' });
		const auth = await InstagramService.getAccessToken({ code });
		return res.json(auth);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

module.exports = routes;
