import { Todo } from '../models/Todo';

export class UIStore {
  public draggedTodo: Todo | null = null;

  public setDraggedTodo = (todo: Todo | null) => {
    this.draggedTodo = todo;
  };
}
