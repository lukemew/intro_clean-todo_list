import IdCollisionError from 'app/errors/application/id-collision.error.js';
import { User, type UserPrimitiveProps } from '../entities/user.entity.js';
import { EmailAlreadyExistsError } from '../errors/application/email-already-exists.error.js';
import type { IUserRepository } from '../repositories/user.repository.js';

type CreateUserInputDTO = UserPrimitiveProps;

interface CreateUserOutputDTO {
	id: string;
	name: string;
	email: string;
	createdAt: Date;
}

export class CreateUserUseCase {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(input: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
		const existing = await this.userRepository.findByEmail(input.email);

		if (existing) throw new EmailAlreadyExistsError(input.email);

		const user = await User.create(input);

		if (await this.userRepository.findById(user.id))
			throw new IdCollisionError();

		await this.userRepository.save(user);

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			createdAt: user.createdAt,
		};
	}
}
