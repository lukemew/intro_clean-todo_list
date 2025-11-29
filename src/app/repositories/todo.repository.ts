import type { Todo } from "../entities/todo-entity.js";

export interface ITodoRepository {
  create(todo: Todo): Promise<void>;
  findById(id: string): Promise<Todo | null>;
  findAllByUserId(userId: string): Promise<Todo[]>;
  save(todo: Todo): Promise<void>;
}
