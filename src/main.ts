import 'reflect-metadata';
import { env } from './config/env.js';
import { AppDataSource } from './infra/database/typeorm/data-source.js';
import { server } from './infra/http/server.js';

const start = async () => {
	try {
		await AppDataSource.initialize();
		console.log('Data source was initialized!');

		await server.listen({
			port: env.PORT,
			host: '0.0.0.0',
		});
		console.log(`🚀 Server listening at http://localhost:${env.PORT}`);
	} catch (error) {
		console.error(error);
		server.log.error(error);
		process.exit();
	}
};

start();
