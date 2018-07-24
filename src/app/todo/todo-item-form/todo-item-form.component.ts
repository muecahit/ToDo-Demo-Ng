import {Component, Input, OnInit} from '@angular/core';
import {TodoService} from '../todo.service';
import TodoItem from '../models/TodoItem';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-todo-item-form',
  templateUrl: './todo-item-form.component.html',
  styleUrls: ['./todo-item-form.component.scss']
})
export class TodoItemFormComponent implements OnInit {
  @Input() todoItem: TodoItem = null;
  todoText = '';

  constructor(public ts: TodoService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.todoItem) {
      this.todoText = this.todoItem.toDo;
    }
  }

  addTodoItem() {
    if (this.todoText.length > 0) {
      this.ts.addTodoItem(this.todoText, this.ts.todoItemLists.get(this.getListName()));
    }
  }

  saveChanges() {
    if (this.todoText.length > 0) {
      this.ts.renameTodoItem(this.getListName(), this.todoItem, this.todoText);
    }
  }

  getListName(): string {
    return this.route.snapshot.params['listName'];
  }

  getSubmitCallback() {
    return this.todoItem ? this.saveChanges() : this.addTodoItem();
  }
}
