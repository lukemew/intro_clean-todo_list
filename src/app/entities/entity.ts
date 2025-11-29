import { UniqueEntityID } from './value-objects/unique-entity-id.vo.js';

export abstract class Entity<T> {
	private readonly _id: UniqueEntityID;
	protected props: T;
	private readonly _createdAt: Date;
	private _updatedAt: Date;
	private _deletedAt: Date | undefined;

	protected constructor(
		props: T,
		id?: string,
		createdAt?: Date,
		updatedAt?: Date,
		deletedAt?: Date,
	) {
		this._id = UniqueEntityID.create(id);
		this.props = props;
		this._createdAt = createdAt ?? new Date();
		this._updatedAt = updatedAt ?? this._createdAt;
		this._deletedAt = deletedAt;

		Object.seal(this);
	}

	public get id(): string {
		return this._id.value;
	}

	public get createdAt() {
		return this._createdAt;
	}

	public get updatedAt() {
		return this._updatedAt;
	}

	public get deletedAt() {
		return this._deletedAt;
	}

	protected touch() {
		this._updatedAt = new Date();
	}

	public delete() {
		if (this.deletedAt) return;

		this._deletedAt = new Date();

		this.touch();
	}

	public restore() {
		if (!this.deletedAt) return;

		this._deletedAt = undefined;

		this.touch();
	}
}
