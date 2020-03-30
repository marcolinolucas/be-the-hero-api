exports.up = knex => knex.schema.createTable('ongs', (table) => {
	table.string('id').primary().notNullable();

	table.string('name').unique().notNullable();
	table.string('email').unique().notNullable();
	table.string('whatsapp').unique().notNullable();
	table.string('city').notNullable();
	table.string('uf', 2).notNullable();
});

exports.down = knex => knex.schema.dropTable('ongs');
