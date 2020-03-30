const crypto = require('crypto');

function hashId() {
	return crypto.randomBytes(4).toString('HEX');
}

module.exports = hashId;
