import { Entity } from "./entity.js";

export interface TodoProps {
  title: string;
  description?: string | null;
  isDone: boolean;
}

export type TodoPropsCreate = Omit<TodoProps, "isDone"> & {
  isDone?: boolean;
};

export class Todo extends Entity<TodoProps> {
  static create(
    props: TodoPropsCreate,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
  ): Todo {
    const todo = new Todo(
      {
        ...props,
        isDone: props.isDone ?? false,
        description: props.description ?? null,
      },
      id,
      createdAt,
      updatedAt,
      deletedAt
    );

    return todo;
  }

  public get title(): string {
    return this.props.title;
  }

  public get description(): string | null | undefined {
    return this.props.description;
  }

  public get isDone(): boolean {
    return this.props.isDone;
  }

  public updateTitle(title: string) {
    this.props.title = title;
    this.touch();
  }

  public updateDescription(description: string) {
    this.props.description = description;
    this.touch();
  }

  public markAsDone() {
    this.props.isDone = true;
    this.touch();
  }

  public markAsUndone() {
    this.props.isDone = false;
    this.touch();
  }
}
