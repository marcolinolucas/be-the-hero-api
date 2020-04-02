const connection = require('../database/connection');

function createIncident(data) {
	return connection('incidents')
		.insert(data);
}

function findIncidents() {
	return connection('incidents')
		.select('*');
}

function findIncidentById({ id }) {
	return connection('incidents')
		.where('id', id)
		.select('*')
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

function incidentsCount() {
	return connection('incidents')
		.count();
}

function updateIncident({ id, data }) {
	return connection('incidents')
		.where('id', id)
		.update(data);
}

function deleteIncident({ id }) {
	return connection('incidents')
		.where('id', id)
		.delete();
}

module.exports = {
	createIncident,
	findIncidents,
	findIncidentById,
	findIncidentByPage,
	findIncidentsByOngId,
	incidentsCount,
	updateIncident,
	deleteIncident,
};
