import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryTodoRepository } from "../repositories/in-memory-todo.repository.js";
import { CreateTodoUseCase } from "../../app/use-cases/create-todo.use-case.js";
import { ListUserTodosUseCase } from "../../app/use-cases/list-user-todos.use-case.js";
import { UpdateTodoUseCase } from "../../app/use-cases/update-todo.use-case.js";
import { DeleteTodoUseCase } from "../../app/use-cases/delete-todo.use-case.js";
import { TodoNotFoundError } from "../../app/errors/application/todo-not-found.error.js";

describe("Todo Use Cases (Integration)", () => {
  let todoRepository: InMemoryTodoRepository;
  let createTodo: CreateTodoUseCase;
  let listTodos: ListUserTodosUseCase;
  let updateTodo: UpdateTodoUseCase;
  let deleteTodo: DeleteTodoUseCase;

  beforeEach(() => {
    todoRepository = new InMemoryTodoRepository();
    createTodo = new CreateTodoUseCase(todoRepository);
    listTodos = new ListUserTodosUseCase(todoRepository);
    updateTodo = new UpdateTodoUseCase(todoRepository);
    deleteTodo = new DeleteTodoUseCase(todoRepository);
  });

  it("should be able to run a full todo lifecycle", async () => {
    const userId = "user-01";

    const created = await createTodo.execute({
      userId,
      title: "Terminar o projeto",
      description: "Fazer testes unitários",
    });

    expect(created.id).toBeDefined();
    expect(created.title).toBe("Terminar o projeto");
    expect(created.isDone).toBe(false);

    const listResult = await listTodos.execute({ userId });
    expect(listResult.todos).toHaveLength(1);
    expect(listResult.todos[0]!.title).toBe("Terminar o projeto");

    const updated = await updateTodo.execute({
      userId,
      todoId: created.id,
      isDone: true,
      title: "Projeto Finalizado",
    });

    expect(updated.isDone).toBe(true);
    expect(updated.title).toBe("Projeto Finalizado");

    const listAfterUpdate = await listTodos.execute({ userId });
    expect(listAfterUpdate.todos[0]!.isDone).toBe(true);
    expect(listAfterUpdate.todos[0]!.title).toBe("Projeto Finalizado");

    await deleteTodo.execute({
      userId,
      todoId: created.id,
    });

    const listAfterDelete = await listTodos.execute({ userId });
    expect(listAfterDelete.todos).toHaveLength(0);
  });

  it("should not be able to update or delete a non-existing todo", async () => {
    await expect(() =>
      updateTodo.execute({
        userId: "user-01",
        todoId: "fake-id",
        title: "New Title",
      })
    ).rejects.toBeInstanceOf(TodoNotFoundError);

    await expect(() =>
      deleteTodo.execute({
        userId: "user-01",
        todoId: "fake-id",
      })
    ).rejects.toBeInstanceOf(TodoNotFoundError);
  });

  it("should only list todos from the specific user", async () => {
    await createTodo.execute({ userId: "user-A", title: "Task A" });

    await createTodo.execute({ userId: "user-B", title: "Task B" });

    const listA = await listTodos.execute({ userId: "user-A" });
    const listB = await listTodos.execute({ userId: "user-B" });

    expect(listA.todos).toHaveLength(1);
    expect(listA.todos[0]!.title).toBe("Task A");

    expect(listB.todos).toHaveLength(1);
    expect(listB.todos[0]!.title).toBe("Task B");
  });
});
