const connection = require('../database/connection');

function findIncidents() {
	return connection('incidents')
		.select('*');
}

function findIncidentById({ id }) {
	return connection('incidents')
		.where('id', id)
		.select('ongId')
		.first();
}

function findIncidentsByOngId({ ongId }) {
	return connection('incidents')
		.where('ongId', ongId)
		.select('*');
}

function findIncidentByPage({ page, limit }) {
	return connection('incidents')
		.join('ongs', 'ongs.id', '=', 'incidents.ongId')
		.offset((page - 1) * limit)
		.limit(limit)
		.select([
			'incidents.*',
			'ongs.name',
			'ongs.email',
			'ongs.whatsapp',
			'ongs.city',
			'ongs.uf',
		]);
}

function createIncident(data) {
	return connection('incidents')
		.insert(data);
}

function deleteIncident({ id }) {
	return connection('incidents')
		.where('id', id)
		.delete();
}

function incidentsCount() {
	return connection('incidents')
		.count();
}

function updateIncident({ id, data }) {
	return connection('incidents')
		.where('id', id)
		.update(data);
}

module.exports = {
	findIncidents,
	findIncidentById,
	findIncidentByPage,
	findIncidentsByOngId,
	createIncident,
	deleteIncident,
	incidentsCount,
	updateIncident,
};
