import { faker } from '@faker-js/faker';
import { Password } from 'app/entities/value-objects/password.vo.js';
import { InvalidPasswordError } from 'app/errors/domain/invalid-password.error.js';

describe('Password VO', () => {
	it('should create a password when payload is valid', async () => {
		// Prepare
		const plainTextPassword = faker.internet.password({
			length: 8,
			prefix: 'a1',
		});

		// Act
		const output = await Password.create(plainTextPassword);

		// Assert
		expect(output).toBeInstanceOf(Password);
		expect(output.value).not.toBe(plainTextPassword);
		expect(output).toHaveProperty(['value', 'length'], 60);
	});

	it('should not create a password when payload is invalid', async () => {
		// Prepare
		const plainTextPassword = faker.string.alpha({ length: 6 });

		// Act
		const act = async () => {
			await Password.create(plainTextPassword);
		};

		// Assert
		await expect(act).rejects.toThrow(InvalidPasswordError);
	});

	it('should successfully compare a hash with his password', async () => {
		// Prepare
		const plainTextPassword = faker.internet.password({
			length: 8,
			prefix: 'a1',
		});

		// Act
		const output = await Password.create(plainTextPassword);

		// Assert
		await expect(output.compare(plainTextPassword)).resolves.toBeTruthy();
	});

	it('should fail to compare a hash with an incorrect password', async () => {
		// Prepare
		const plainTextPassword = faker.internet.password({
			length: 8,
			prefix: 'a1',
		});
		const wrongPassword = faker.internet.password({
			length: 8,
			prefix: 'a1',
		});

		// Act
		const output = await Password.create(plainTextPassword);

		// Assert
		await expect(output.compare(wrongPassword)).resolves.toBeFalsy();
	});
});
