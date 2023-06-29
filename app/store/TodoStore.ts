import { makeAutoObservable } from 'mobx';
import { nanoid } from 'nanoid';
import { Todo as ITodo } from '../models/Todo';
import { TODO_STATUS } from '../utils/todoStatuses';

export class TodoStore {
  public todos: ITodo[] = [new Todo('Make coffee'), new Todo('Learn nextjs')];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public addTodo = (title: string) => {
    const newTodo = new Todo(title);
    this.todos.push(newTodo);
  };

  public removeTodo = (id: string) => {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  };

  public updateTodo = (todo: Todo) => {
    const index = this.todos.findIndex((t) => t.id === todo.id);
    this.todos[index] = todo;
    return this.todos[index];
  };
}

export class Todo implements ITodo {
  public id: string;
  public status: TODO_STATUS;
  public createdAt: Date;
  public deletedAt: Date | null;

  constructor(public title = '') {
    makeAutoObservable(this);
    this.id = nanoid();
    this.title = title;
    this.status = TODO_STATUS.TODO;
    this.createdAt = new Date();
    this.deletedAt = null;
  }
}
