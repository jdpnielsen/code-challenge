module.exports = {
	isAuthenticated,
};

function isAuthenticated (req, reply, done) {
	// Fake auth implementation. Should propably decode and validate the provided token.
	if (!req.headers['authorization'] || req.headers['authorization'] !== 'bearer dGhlc2VjcmV0dG9rZW4=') {
		return reply.status(401).send({ error: 'Unauthorized' });
	}

	done();
}
