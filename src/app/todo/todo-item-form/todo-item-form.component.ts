import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {TodoService} from '../todo.service';
import TodoItem from '../models/TodoItem';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-todo-item-form',
  templateUrl: './todo-item-form.component.html',
  styleUrls: ['./todo-item-form.component.scss']
})
export class TodoItemFormComponent implements OnInit {
  @Input() renameForm = false;
  @Input() addForm = false;
  @Input() todoItem: TodoItem = null;

  constructor(public ts: TodoService, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  addTodoItem(form: NgForm) {
    const todo = form.value.todo;
    const listName = this.route.snapshot.params['listName'];
    if (todo.length > 0) {
      this.ts.addTodoItem(todo, listName);
    }
  }

  saveChanges(form: NgForm) {
    const todo = form.value.todo;
    const listName = this.route.snapshot.params['listName'];
    if (todo.length > 0) {
      this.ts.renameTodoItem(listName, this.todoItem, todo);
    }
  }

  getSubmitCallback(form: NgForm) {
    return this.renameForm ? this.saveChanges(form) : this.addTodoItem(form);
  }
}
