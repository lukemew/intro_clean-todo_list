import type { FastifyReply, FastifyRequest } from 'fastify';
import type { CreateUserUseCase } from '../../../app/use-cases/create-user.use-case.js';
import type { CreateUserBody } from '../dtos/user.dto.js';

export class CreateUserController {
	constructor(private readonly createUserUseCase: CreateUserUseCase) {}

	async handle(
		request: FastifyRequest<{ Body: CreateUserBody }>,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		const { email, name, password } = request.body;

		const output = await this.createUserUseCase.execute({
			email,
			name,
			password,
		});

		return reply.status(201).send(output);
	}
}
