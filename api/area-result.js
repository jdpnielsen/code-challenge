const store = require('../lib/store');
const auth = require('../lib/auth');

module.exports = {
	method: 'GET',
	url: '/area-result/:key',
	preValidation: auth.isAuthenticated,
	handler: areaResult,
};

async function areaResult (req, reply) {
	const storedValue = store.get(req.params.key);

	if (!storedValue) {
		return reply.status(400).send({ message: 'No such key was found' });
	}

	if (storedValue.status === 'pending') {
		return reply.status(202).send();
	}

	return reply.status(200).send({ cities: storedValue.cities });
}
