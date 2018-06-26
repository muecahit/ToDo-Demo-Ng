import {Component, OnInit} from '@angular/core';
import {TodoService} from '../todo.service';
import {ActivatedRoute} from '@angular/router';
import TodoItem from '../models/TodoItem';
import {URLStringToString} from '../../utils/URLHelper';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit {
  colConfigs: ColConfig[] = [
    {
      colDisplayName: 'Todo',
      colWidth: '75%',
      attributeName: 'toDo'
    },
    {
      colDisplayName: 'Erstellt am',
      colWidth: '25%',
      attributeName: 'creationDate'
    }
  ];

  renamePopup = false;
  addPopup = false;
  selectedTodoItem: TodoItem = null;

  constructor(public ts: TodoService, public ar: ActivatedRoute) {
  }

  ngOnInit() {
  }

  getTodoItemListName(): string {
    return URLStringToString(this.ar.snapshot.paramMap.get('listName'));
  }

  getTodoItems(): TodoItem[] {
    return this.ts.getTodoItems(this.getTodoItemListName());
  }

  onItemRemove(item: TodoItem) {
    this.ts.removeTodoItem(item, this.getTodoItemListName());
  }

  onItemSelect(item: TodoItem) {
    this.selectedTodoItem = item;
  }

  onItemEdit(item: TodoItem) {
    this.selectedTodoItem = item;
    this.renamePopup = true;
  }

  onPopupClose() {
    this.renamePopup = false;
    this.addPopup = false;
  }
}
