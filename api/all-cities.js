const fs = require('fs');
const path = require('path');
const auth = require('../lib/auth');

const addressesPath = path.join(__dirname, '../data/addresses.json');

module.exports = {
	method: 'GET',
	url: '/all-cities',
	preValidation: auth.isAuthenticated,
	handler: allCities,
};

async function allCities (req, reply) {
	const stream = fs.createReadStream(addressesPath, 'utf8');

	return reply.send(stream);
}
