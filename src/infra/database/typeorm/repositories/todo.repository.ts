import type { ITodoRepository } from "../../../../app/repositories/todo.repository.js";
import { Todo } from "../../../../app/entities/todo-entity.js";
import { AppDataSource } from "../data-source.js";
import { TodoModel } from "../models/todo.model.js";
import { TodoMapper } from "../mappers/todo.mapper.js";

export class TypeOrmTodoRepository implements ITodoRepository {
  private repository = AppDataSource.getRepository(TodoModel);

  async create(todo: Todo): Promise<void> {
    const model = TodoMapper.toPersistence(todo);
    await this.repository.save(model);
  }

  async save(todo: Todo): Promise<void> {
    const model = TodoMapper.toPersistence(todo);
    await this.repository.save(model);
  }

  async findById(id: string): Promise<Todo | null> {
    const model = await this.repository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!model) return null;

    if (model.deleted_at) return null;

    return TodoMapper.toDomain(model);
  }

  async findAll(): Promise<Todo[]> {
    const models = await this.repository.find(); // Sem where
    return models.map(TodoMapper.toDomain);
  }
}
