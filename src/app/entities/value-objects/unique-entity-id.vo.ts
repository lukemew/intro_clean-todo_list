import { v7 } from 'uuid';
import { InvalidUniqueEntityIdFormat } from '../../errors/domain/invalid-unique-entity-id-format.error.js';

export class UniqueEntityID {
	public readonly value: string;

	private constructor(value?: string) {
		this.value = value ?? v7();

		Object.freeze(this);
	}

	public static create(id?: string): UniqueEntityID {
		if (id && !UniqueEntityID.validate(id))
			throw new InvalidUniqueEntityIdFormat(id);

		return new UniqueEntityID(id);
	}

	private static validate(id: string) {
		const uuidRegex =
			/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

		return uuidRegex.test(id);
	}
}
