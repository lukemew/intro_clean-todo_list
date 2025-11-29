import type { Todo } from "../entities/todo-entity.js";

export interface ITodoRepository {
  create(todo: Todo): Promise<void>;
  findById(id: string): Promise<Todo | null>;
  findAll(): Promise<Todo[]>;
  save(todo: Todo): Promise<void>;
}
