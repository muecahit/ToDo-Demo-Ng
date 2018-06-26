import TodoItem from './TodoItem';

export default class TodoItemList {
  constructor(public id: string,
              public listName: string,
              public toDoItems: TodoItem[],
              public amount: number) {
  }
}
