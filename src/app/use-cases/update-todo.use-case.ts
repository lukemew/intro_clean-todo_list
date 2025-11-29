import { TodoNotFoundError } from "../errors/application/todo-not-found.error.js";
import type { ITodoRepository } from "../repositories/todo.repository.js";

interface UpdateTodoInputDTO {
  todoId: string;
  title?: string | undefined;
  description?: string | undefined;
  isDone?: boolean | undefined;
}

interface UpdateTodoOutputDTO {
  id: string;
  title: string;
  isDone: boolean;
  updatedAt: Date;
}

export class UpdateTodoUseCase {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async execute(input: UpdateTodoInputDTO): Promise<UpdateTodoOutputDTO> {
    const todo = await this.todoRepository.findById(input.todoId);

    if (!todo) {
      throw new TodoNotFoundError();
    }

    if (input.title !== undefined) {
      todo.updateTitle(input.title);
    }

    if (input.description !== undefined) {
      todo.updateDescription(input.description);
    }

    if (input.isDone !== undefined) {
      if (input.isDone) {
        todo.markAsDone();
      } else {
        todo.markAsUndone();
      }
    }

    await this.todoRepository.save(todo);

    return {
      id: todo.id,
      title: todo.title,
      isDone: todo.isDone,
      updatedAt: todo.updatedAt,
    };
  }
}
