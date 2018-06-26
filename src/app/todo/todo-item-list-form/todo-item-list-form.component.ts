import {Component, Input} from '@angular/core';
import {NgForm} from '@angular/forms';
import {TodoService} from '../todo.service';
import TodoItemList from '../models/TodoItemList';

@Component({
  selector: 'app-todo-item-list-form',
  templateUrl: './todo-item-list-form.component.html',
  styleUrls: ['./todo-item-list-form.component.scss']
})
export class TodoItemListFormComponent {
  @Input() renameForm = false;
  @Input() addForm = false;
  @Input() todoItemList: TodoItemList = null;

  duplicateNameError = false;

  constructor(public ts: TodoService) {
  }

  addList(form: NgForm) {
    const listName = form.value.listName;

    if (listName.length > 0 && !this.ts.todoItemListExists(listName)) {
      this.ts.addTodoItemList(listName);
      this.duplicateNameError = false;
    } else {
      this.duplicateNameError = true;
    }
  }

  saveChanges(form: NgForm) {
    const listName = form.value.listName;

    if (listName.length > 0 && !this.ts.todoItemListExists(listName)) {
      this.ts.renameTodoItemList(this.todoItemList, listName);
      this.duplicateNameError = false;
    } else {
      this.duplicateNameError = true;
    }
  }

  getSubmitCallback(form: NgForm) {
    return this.renameForm ? this.saveChanges(form) : this.addList(form);
  }
}
