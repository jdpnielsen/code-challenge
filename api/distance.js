const addresses = require('../data/addresses');
const calc = require('../lib/geo-calc');
const auth = require('../lib/auth');

module.exports = {
	method: 'GET',
	url: '/distance',
	schema: {
		query: {
			required: ['from', 'to'],
			type: 'object',
			properties: {
				from: { type: 'string' },
				to: { type: 'string' },
			}
		}
	},
	preValidation: auth.isAuthenticated,
	handler: distance,
};

async function distance (req) {
	const from = addresses.find((each) => each.guid === req.query.from);
	const to = addresses.find((each) => each.guid === req.query.to);

	const distance = calc.distance([from.latitude, from.longitude], [to.latitude, to.longitude]);

	return {
		from,
		to,
		unit: 'km',
		distance: Math.round(distance * 100) / 100
	};
}
