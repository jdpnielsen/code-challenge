const addresses = require('../data/addresses');
const calc = require('../lib/geo-calc');
const store = require('../lib/store');
const auth = require('../lib/auth');

module.exports = {
	method: 'GET',
	url: '/area',
	schema: {
		query: {
			required: ['from', 'distance'],
			type: 'object',
			properties: {
				from: { type: 'string' },
				distance: { type: 'number' },
			}
		}
	},
	preValidation: auth.isAuthenticated,
	handler: area,
};

async function area (req, reply) {
	const from = addresses.find((each) => each.guid === req.query.from);
	const key = '2152f96f-50c7-4d76-9e18-f7033bd14428';

	// Return http response immediately
	reply.status(202).send({ resultsUrl: `${req.protocol}://${req.hostname}/area-result/${key}` });

	const result = {
		status: 'pending',
	};

	store.set(key, result);

	const matchingAddresses = addresses.filter((each) => {
		if (from.guid === each.guid) {
			return false;
		}

		const distance = calc.distance([from.latitude, from.longitude], [each.latitude, each.longitude]);
		if (distance < req.query.distance) {
			return true;
		}
	});

	// Update result
	result.status = 'completed';
	result.cities = matchingAddresses;
}
