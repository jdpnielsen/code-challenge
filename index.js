const fastify = require('fastify');
const server = fastify();

server.route(require('./api/cities-by-tag'));
server.route(require('./api/distance'));
server.route(require('./api/area'));
server.route(require('./api/area-result'));
server.route(require('./api/all-cities'));

server.listen(8080, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	console.log(`Server listening at ${address}`);
});
