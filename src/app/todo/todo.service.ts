import {Injectable} from '@angular/core';
import TodoItemList from './models/TodoItemList';
import {HttpClient, HttpParams} from '@angular/common/http';
import TodoItem from './models/TodoItem';
import {UUID} from 'angular2-uuid';

@Injectable()
export class TodoService {
  private todoItemLists: Map<string, TodoItemList> = new Map<string, TodoItemList>();

  constructor(private http: HttpClient) {
  }

  /** BACKEND DONE */
  loadTodoItemLists() {
    this.http.get<TodoItemList[]>('todoItemLists/getAll')
      .subscribe(todoItemLists => {
          todoItemLists.forEach(list => this.todoItemLists.set(list.listName, list));
        }
      );
  }

  /** BACKEND DONE */
  addTodoItemList(listName: string) {
    this.http.post<TodoItemList>('todoItemLists/create', new TodoItemList(UUID.UUID(), listName, [], 0))
      .subscribe(list => this.todoItemLists.set(list.listName, list));
  }

  /** BACKEND DONE */
  renameTodoItemList(todoItemList: TodoItemList, newListName: string) {
    const params = new HttpParams()
      .append('oldListName', todoItemList.listName)
      .append('newListName', newListName);

    this.http.put<TodoItemList>('todoItemLists/rename', null, {params})
      .subscribe(renamedTodoItemList => {
        this.todoItemLists.delete(todoItemList.listName);
        this.todoItemLists.set(renamedTodoItemList.listName, renamedTodoItemList);
      });
  }

  /** BACKEND DONE */
  renameTodoItem(listName: string, todoItem: TodoItem, newText: string) {
    const params = new HttpParams()
      .append('id', todoItem.id)
      .append('newText', newText);

    this.http.put<TodoItemList>('todoItems/rename', null, {params})
      .subscribe(() => {
        const items = this.getTodoItems(listName);
        const index = items.findIndex(value => value.id === todoItem.id);
        items[index].toDo = newText;
      });
  }

  /** BACKEND DONE */
  removeTodoItemList(item: TodoItemList) {
    const params = new HttpParams()
      .append('id', item.id);

    this.http.delete('todoItemLists/remove', {params})
      .subscribe(() => this.todoItemLists.delete(item.listName));
  }

  /** BACKEND DONE */
  addTodoItem(todo: string, todoItemListName: string) {
    const params = new HttpParams()
      .append('todo', todo)
      .append('todoItemListId', this.todoItemLists.get(todoItemListName).id);


    this.http.post<TodoItem>('todoItems/create', null, {params})
      .subscribe(item => this.todoItemLists.get(todoItemListName).toDoItems.push(item));
  }

  /** BACKEND DONE */
  removeTodoItem(todo: TodoItem, listName: string) {
    const params = new HttpParams()
      .append('id', todo.id);

    this.http.delete('todoItems/remove', {params: params, responseType: 'text'})
      .subscribe(() => {
        const todoItems = this.todoItemLists.get(listName).toDoItems;
        const index = todoItems.findIndex(value => value.id === todo.id);
        todoItems.splice(index, 1);
      });
  }

  todoItemListExists(listName: string): boolean {
    return this.todoItemLists.has(listName);
  }

  getTodoItems(listName: string): TodoItem[] {
    return this.todoItemLists.get(listName).toDoItems;
  }

  getTodoItemLists(): TodoItemList[] {
    return Array.from(this.todoItemLists.values());
  }
}
