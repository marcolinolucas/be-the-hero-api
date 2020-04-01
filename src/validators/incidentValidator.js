const { Segments, Joi } = require('celebrate');

const headerSchema = {
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required().length(8),
	}).unknown(),
};

const paramsSchema = {
	[Segments.PARAMS]: Joi.object().keys({
		id: Joi.number().required(),
	}).required(),
};

const pageSchema = {
	[Segments.QUERY]: Joi.object().keys({
		page: Joi.number(),
		limit: Joi.number(),
	}),
	...headerSchema,
};

const createSchema = {
	[Segments.BODY]: Joi.object().keys({
		title: Joi.string().required(),
		description: Joi.string().required(),
		value: Joi.number().required(),
	}),
	...headerSchema,
};

const deleteSchema = {
	...headerSchema,
	...paramsSchema,
};

const updateSchema = {
	...headerSchema,
	...paramsSchema,
	...createSchema,
};

module.exports = {
	headerSchema,
	paramsSchema,
	pageSchema,
	createSchema,
	deleteSchema,
	updateSchema,
};
