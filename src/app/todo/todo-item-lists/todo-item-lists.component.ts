import {Component, OnInit} from '@angular/core';
import {TodoService} from '../todo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {StringToURLString} from '../../utils/URLHelper';
import TodoItemList from '../models/TodoItemList';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-item-lists.component.html',
  styleUrls: ['./todo-item-lists.component.scss']
})
export class TodoItemListsComponent implements OnInit {
  colConfigs: ColConfig[] = [
    {
      colDisplayName: 'Name der Liste',
      colWidth: '75%',
      attributeName: 'listName'
    },
    {
      colDisplayName: 'Anzahl Todos',
      colWidth: '25%',
      attributeName: 'amount'
    }
  ];
  showPopup = false;
  selectedTodoItemList: TodoItemList = null;

  constructor(public ts: TodoService, public router: Router, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.ts.loadTodoItemLists();
  }

  onItemRemove(item: TodoItemList) {
    this.ts.removeTodoItemList(item);
  }

  onItemSelect(item: TodoItemList) {
    this.router.navigate([StringToURLString(item.listName)], {relativeTo: this.route});
  }

  onItemEdit(item: TodoItemList) {
    this.selectedTodoItemList = item;
    this.showPopup = true;
  }

  onAddButtonClick() {
    this.showPopup = true;
  }

  onPopupClose() {
    this.showPopup = false;
    this.selectedTodoItemList = null;
  }
}
