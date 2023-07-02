import { makeAutoObservable } from 'mobx';
import { nanoid } from 'nanoid';
import { Todo as ITodo } from '../models/Todo';
import { TODO_STATUS } from '../utils/todoStatuses';

export class TodoStore {
  public todos: ITodo[] = [
    new Todo({ title: 'Learn react', status: TODO_STATUS.TODO }),
    new Todo({ title: 'Learn mobx', status: TODO_STATUS.TODO }),
    new Todo({ title: 'Learn typescript', status: TODO_STATUS.BACKLOG }),
  ];

  constructor() {
    makeAutoObservable(this, {
      getFilteredTodos: false,
    });
  }

  public addTodo = (title: string, status: TODO_STATUS) => {
    const newTodo = new Todo({ title, status });
    this.todos.push(newTodo);
  };

  public removeTodo = (id: string) => {
    this.todos.splice(
      this.todos.findIndex((t) => t.id === id),
      1
    );
  };

  public updateTodo = (todo: Todo) => {
    const updatedTodo = new Todo({
      ...todo,
    });
    const index = this.todos.findIndex((t) => t.id === updatedTodo.id);
    this.todos.splice(index, 1, updatedTodo);
    return this.todos[index];
  };

  public swapAndUpdateTodos = (draggedTodo: Todo, todo2: Todo) => {
    const index1 = this.todos.findIndex((t) => t.id === draggedTodo.id);
    const index2 = this.todos.findIndex((t) => t.id === todo2.id);
    const updatedTodo = new Todo({
      ...draggedTodo,
      status: todo2.status,
    });
    this.todos[index1] = todo2;
    this.todos[index2] = updatedTodo;
  };

  public getFilteredTodos = (status: TODO_STATUS) => {
    return this.todos.filter((t) => t.status === status);
  };
}

export class Todo implements ITodo {
  public id: string;
  public title: string;
  public status: TODO_STATUS;
  public createdAt: Date;
  public deletedAt: Date | null;

  constructor({
    id = nanoid(),
    title,
    status = TODO_STATUS.TODO,
    createdAt = new Date(),
    deletedAt = null,
  }: Partial<Omit<ITodo, 'title'>> & Pick<ITodo, 'title'>) {
    makeAutoObservable(this);
    this.id = id;
    this.title = title;
    this.status = status;
    this.createdAt = createdAt;
    this.deletedAt = deletedAt;
  }
}
