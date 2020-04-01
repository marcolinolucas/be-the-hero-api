const { Segments, Joi } = require('celebrate');

const createSchema = {
	[Segments.BODY]: Joi.object().keys({
		name: Joi.string().required(),
		email: Joi.string().required().email(),
		whatsapp: Joi.string().required().length(11),
		city: Joi.string().required(),
		uf: Joi.string().required().length(2),
	}).required(),
};

const deleteSchema = {
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required().length(8),
	}).unknown(),
};

module.exports = {
	createSchema,
	deleteSchema,
};
