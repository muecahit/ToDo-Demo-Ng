import {Component, Input, OnInit} from '@angular/core';
import {TodoService} from '../todo.service';
import TodoItemList from '../models/TodoItemList';

@Component({
  selector: 'app-todo-item-list-form',
  templateUrl: './todo-item-list-form.component.html',
  styleUrls: ['./todo-item-list-form.component.scss']
})
export class TodoItemListFormComponent implements OnInit {
  @Input() todoItemList: TodoItemList = null;

  listName = '';
  duplicateNameError = false;

  ngOnInit(): void {
    if (this.todoItemList) {
      this.listName = this.todoItemList.listName;
    }
  }

  constructor(public ts: TodoService) {
  }

  addList() {
    if (this.listName.length > 0 && !this.ts.todoItemListExists(this.listName)) {
      this.ts.addTodoItemList(this.listName);
      this.duplicateNameError = false;
    } else {
      this.duplicateNameError = true;
    }
  }

  saveChanges() {
    if (this.listName.length > 0 && !this.ts.todoItemListExists(this.listName)) {
      this.ts.renameTodoItemList(this.todoItemList, this.listName);
      this.duplicateNameError = false;
    } else {
      this.duplicateNameError = true;
    }
  }

  getSubmitCallback() {
    return this.todoItemList ? this.saveChanges() : this.addList();
  }

  getSubmitValue(): string {
    return this.todoItemList ? 'Speichern' : 'Erstellen';
  }
}
