import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserModel {
	@PrimaryColumn('uuid')
	id!: string;

	@Column({ type: 'varchar' })
	name!: string;

	@Column({ type: 'varchar', length: 255 })
	email!: string;

	@Column({ type: 'varchar', length: 64 })
	password_hash!: string;

	@CreateDateColumn({ type: 'timestamp without time zone' })
	created_at!: Date;

	@UpdateDateColumn({ type: 'timestamp without time zone' })
	updated_at!: Date;

	@DeleteDateColumn({ type: 'timestamp without time zone', nullable: true })
	deleted_at!: Date | undefined;
}
