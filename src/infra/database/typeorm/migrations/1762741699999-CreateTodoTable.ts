import { Table } from "typeorm";
import type { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTodoTable1762741699999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "todos",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },

          { name: "title", type: "varchar", length: "255" },
          { name: "description", type: "text", isNullable: true },
          { name: "is_done", type: "boolean", default: false },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
          { name: "deleted_at", type: "timestamp", isNullable: true },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("todos");
  }
}
