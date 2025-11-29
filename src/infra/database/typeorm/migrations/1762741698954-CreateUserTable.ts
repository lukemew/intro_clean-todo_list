import { type MigrationInterface, type QueryRunner, Table } from 'typeorm';

export class CreateUserTable1762741698954 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'users',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
					},
					{
						name: 'name',
						type: 'varchar',
					},
					{
						name: 'email',
						type: 'varchar',
						length: '255',
					},
					{
						name: 'password_hash',
						type: 'varchar',
						length: '64',
					},
					{
						name: 'created_at',
						type: 'timestamp without time zone',
						default: 'now()',
					},
					{
						name: 'updated_at',
						type: 'timestamp without time zone',
						default: 'now()',
					},
					{
						name: 'deleted_at',
						type: 'timestamp without time zone',
						isNullable: true,
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users');
	}
}
