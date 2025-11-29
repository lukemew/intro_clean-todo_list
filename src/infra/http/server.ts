import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { AppError } from '../../app/errors/app-error.js';
import { env, isTest } from '../../config/env.js';
import { userRoutes } from './routes/user.routes.js';

const server = fastify({
	logger: !isTest,
}).withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(fastifyCors, {
	origin: '*',
});

server.register(fastifyJwt, {
	secret: env.JWT_SECRET,
});

server.register(userRoutes);

server.setErrorHandler((error, _request, reply) => {
	if (error instanceof AppError)
		return reply.status(error.statusCode).send({ message: error.message });

	server.log.error(error);

	return reply.status(500).send({ message: error.message });
});

export { server };
