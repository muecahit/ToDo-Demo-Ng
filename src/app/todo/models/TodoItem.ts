export default class TodoItem {
  constructor(public id: string,
              public toDo: string,
              public creationDate: Date,
              public toDoItemListId: string) {
  }
}
