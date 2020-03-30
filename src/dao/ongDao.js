const connection = require('../database/connection');

function findOngs() {
	return connection('ongs').select('*');
}

function findOngById({ ongId }) {
	return connection('ongs')
		.where('id', ongId)
		.select('*')
		.first();
}

function findOngByData({ name, email, whatsapp }) {
	return connection('ongs')
		.orWhere({ name })
		.orWhere({ email })
		.orWhere({ whatsapp })
		.select('*')
		.first();
}

function createOng(data) {
	return connection('ongs').insert(data);
}

function deleteOng({ ongId }) {
	return connection('ongs')
		.where('id', ongId)
		.delete();
}

function updateOngById({ ongId, data }) {
	return connection('ongs')
		.where('id', ongId)
		.update(data);
}

module.exports = {
	findOngs,
	findOngById,
	findOngByData,
	createOng,
	deleteOng,
	updateOngById,
};
