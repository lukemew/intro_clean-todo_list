import { WrongEmailOrPasswordError } from '../errors/application/wrong-email-or-password.error.js';
import type { ITokenProvider } from '../providers/token.provider.js';
import type { IUserRepository } from '../repositories/user.repository.js';

interface SignInUserInputDTO {
	email: string;
	password: string;
}

interface SignInUserOutputDTO {
	token: string;
}

export class SignInUserUseCase {
	constructor(
		private userRepository: IUserRepository,
		private tokenProvider: ITokenProvider,
	) {}

	async execute({
		email,
		password,
	}: SignInUserInputDTO): Promise<SignInUserOutputDTO> {
		const user = await this.userRepository.findByEmail(email);

		if (!user || !(await user.comparePassword(password)))
			throw new WrongEmailOrPasswordError();

		const token = this.tokenProvider.generate({ sub: user.id });

		return { token };
	}
}
