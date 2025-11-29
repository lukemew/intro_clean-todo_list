import { faker } from '@faker-js/faker';
import { Email } from 'app/entities/value-objects/email.vo.js';
import { InvalidEmailFormat } from 'app/errors/domain/invalid-email-format.error.js';

describe('Email VO', () => {
	it('should create an email when input is valid', () => {
		// Prepare
		const input = faker.internet.email();

		// Act
		const email = Email.create(input);

		// Compare
		expect(email).toBeInstanceOf(Email);
		expect(email.value).toBe(input);
	});

	it('should not create an email when input is invalid', () => {
		// Prepare
		const input = faker.internet.username();

		// Act
		const act = () => {
			Email.create(input);
		};

		// Compare
		expect(act).toThrow(InvalidEmailFormat);
	});
});
