const addresses = require('../data/addresses');
const auth = require('../lib/auth');

module.exports = {
	method: 'GET',
	url: '/cities-by-tag',
	schema: {
		query: {
			type: 'object',
			properties: {
				tag: { type: 'string' },
				isActive: { type: 'boolean' }
			}
		}
	},
	preValidation: auth.isAuthenticated,
	handler: getCitiesByTag,
};

async function getCitiesByTag (req) {
	const tag = req.query.tag;
	const isActive = req.query.isActive;

	const matchingAddresses = addresses.filter((each) => {
		return each.isActive === isActive && each.tags.includes(tag);
	});

	return { cities: matchingAddresses };
}
