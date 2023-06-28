import { makeAutoObservable } from 'mobx';
import { nanoid } from 'nanoid';
import { Todo as ITodo } from '../models/Todo';
import { TODO_STATUS } from '../utils/todoStatuses';

export class TodoStore {
  todos: ITodo[] = [
    {
      id: '1',
      title: 'Learn React',
      status: TODO_STATUS.TODO,
      createdAt: new Date(),
      deletedAt: null,
    },
    {
      id: '2',
      title: 'Learn MobX',
      status: TODO_STATUS.TODO,
      createdAt: new Date(),
      deletedAt: null,
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  addTodo = (title: string) => {
    const newTodo = new Todo(title);
    this.todos.push(newTodo);
  };

  removeTodo = (id: string) => {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  };
}

export class Todo implements ITodo {
  id: string;
  status: TODO_STATUS;
  createdAt: Date;
  deletedAt: Date | null;

  constructor(public title = '') {
    makeAutoObservable(this);
    this.id = nanoid();
    this.title = title;
    this.status = TODO_STATUS.TODO;
    this.createdAt = new Date();
    this.deletedAt = null;
  }
}
