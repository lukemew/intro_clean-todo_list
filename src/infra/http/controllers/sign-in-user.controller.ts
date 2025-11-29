import type { FastifyReply, FastifyRequest } from 'fastify';
import type { SignInUserUseCase } from '../../../app/use-cases/sign-in-user.use-case.js';
import type { SignInUserBody } from '../dtos/user.dto.js';

export class SignInUserController {
	constructor(private signInUserUseCase: SignInUserUseCase) {}

	async handle(
		request: FastifyRequest<{ Body: SignInUserBody }>,
		reply: FastifyReply,
	): Promise<FastifyReply> {
		const { email, password } = request.body;

		const response = await this.signInUserUseCase.execute({ email, password });

		return reply.status(200).send(response);
	}
}
