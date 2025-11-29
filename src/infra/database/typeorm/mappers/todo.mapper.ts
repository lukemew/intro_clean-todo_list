import { Todo } from "../../../../app/entities/todo-entity.js";
import { TodoModel } from "../models/todo.model.js";

export class TodoMapper {
  static toPersistence(todo: Todo): TodoModel {
    const model = new TodoModel();
    model.id = todo.id;
    model.user_id = todo.userId;
    model.title = todo.title;
    model.description = todo.description ?? null;
    model.is_done = todo.isDone;
    model.created_at = todo.createdAt;
    model.updated_at = todo.updatedAt;
    model.deleted_at = todo.deletedAt;

    return model;
  }

  static toDomain(model: TodoModel): Todo {
    return Todo.create(
      {
        userId: model.user_id,
        title: model.title,
        description: model.description,
        isDone: model.is_done,
      },
      model.id,
      model.created_at,
      model.updated_at,
      model.deleted_at
    );
  }
}
