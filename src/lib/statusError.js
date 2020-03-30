function statusError(res, code, message) {
	return res.status(code).json({ error: message });
}

module.exports = statusError;
