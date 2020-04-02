const crypto = require('crypto');

module.exports = function hashId() {
	return crypto.randomBytes(4).toString('HEX');
};
