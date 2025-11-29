import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("todos")
export class TodoModel {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  title!: string;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @Column({ type: "boolean", default: false })
  is_done!: boolean;

  @CreateDateColumn({ type: "timestamp without time zone" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamp without time zone" })
  updated_at!: Date;

  @DeleteDateColumn({ type: "timestamp without time zone", nullable: true })
  deleted_at!: Date | undefined;
}
