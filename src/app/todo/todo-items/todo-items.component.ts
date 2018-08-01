import {Component, OnInit} from '@angular/core';
import {TodoService} from '../todo.service';
import {ActivatedRoute} from '@angular/router';
import TodoItem from '../models/TodoItem';
import {URLToString} from '../../utils/URLHelper';

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

  showPopup = false;
  selectedTodoItem: TodoItem = null;

  constructor(public ts: TodoService, public ar: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.ts.getTodoItemLists().length === 0) {
      this.ts.loadTodoItemLists();
    }
  }

  getTodoItemListName(): string {
    return URLToString(this.ar.snapshot.paramMap.get('listName'));
  }

  getTodoItems(): TodoItem[] {
    return this.ts.getTodoItems(this.getTodoItemListName());
  }

  onItemRemove(item: TodoItem) {
    this.ts.removeTodoItem(item, this.getTodoItemListName());
  }

  onItemSelect(item: TodoItem) {
  }

  onItemEdit(item: TodoItem) {
    this.selectedTodoItem = item;
    this.showPopup = true;
  }

  onPopupClose() {
    this.showPopup = false;
    this.selectedTodoItem = null;
  }
}
