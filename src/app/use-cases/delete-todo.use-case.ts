import { TodoNotFoundError } from "../errors/application/todo-not-found.error.js";
import type { ITodoRepository } from "../repositories/todo.repository.js";

interface DeleteTodoInputDTO {
  todoId: string;
}

export class DeleteTodoUseCase {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async execute(input: DeleteTodoInputDTO): Promise<void> {
    const todo = await this.todoRepository.findById(input.todoId);

    if (!todo) {
      throw new TodoNotFoundError();
    }

    todo.delete();

    await this.todoRepository.save(todo);
  }
}
