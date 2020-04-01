const { Segments, Joi } = require('celebrate');

const headerSchema = {
	[Segments.HEADERS]: Joi.object({
		authorization: Joi.string().required().length(8),
	}).unknown(),
};

const loginSchema = {
	[Segments.BODY]: Joi.object().keys({
		ongId: Joi.string().required().length(8),
	}).required(),
	...headerSchema,
};

const updateSchema = {
	[Segments.BODY]: Joi.object().keys({
		email: Joi.string().required().email(),
		whatsapp: Joi.string().required().length(11),
	}).required(),
	...headerSchema,
};

module.exports = {
	headerSchema,
	loginSchema,
	updateSchema,
};
