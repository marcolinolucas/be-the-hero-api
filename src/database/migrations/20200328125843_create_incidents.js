exports.up = knex => knex.schema.createTable('incidents', (table) => {
	table.increments();

	table.string('title').notNullable();
	table.string('description').notNullable();
	table.decimal('value').notNullable();

	table.string('ongId').notNullable();
	table.foreign('ongId').references('id').inTable('ongs');
});

exports.down = knex => knex.schema.dropTable('incidents');
