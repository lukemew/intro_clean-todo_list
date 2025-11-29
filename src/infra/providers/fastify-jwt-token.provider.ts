import type { FastifyInstance } from 'fastify';
import type { ITokenProvider } from '../../app/providers/token.provider.js';

export class FastifyJwtTokenProvider implements ITokenProvider {
	constructor(private readonly fastifyInstance: FastifyInstance) {}

	generate(payload: { sub: string }): string {
		const token = this.fastifyInstance.jwt.sign(payload);

		return token;
	}
}
