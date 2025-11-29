import type { ITodoRepository } from "../repositories/todo.repository.js";
import { Todo } from "../entities/todo-entity.js";

export class InMemoryTodoRepository implements ITodoRepository {
  public items: Todo[] = [];

  async create(todo: Todo): Promise<void> {
    this.items.push(todo);
  }

  async findById(id: string): Promise<Todo | null> {
    const todo = this.items.find((item) => item.id === id);

    if (!todo) {
      return null;
    }

    return todo;
  }

  async findAllByUserId(userId: string): Promise<Todo[]> {
    return this.items.filter(
      (item) => item.userId === userId && !item.deletedAt
    );
  }

  async save(todo: Todo): Promise<void> {
    const index = this.items.findIndex((item) => item.id === todo.id);

    if (index >= 0) {
      this.items[index] = todo;
    }
  }
}
