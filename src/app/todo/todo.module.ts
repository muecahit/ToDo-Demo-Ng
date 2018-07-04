import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodoItemFormComponent} from './todo-item-form/todo-item-form.component';
import {TodoItemListFormComponent} from './todo-item-list-form/todo-item-list-form.component';
import {TodoItemListsComponent} from './todo-item-lists/todo-item-lists.component';
import {TodoItemsComponent} from './todo-items/todo-items.component';
import {OnlyAuthGuard} from '../core/guards/only-auth.guard';
import {Route, RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {TodoService} from './todo.service';


const routes: Route[] = [
  {path: 'todolists', component: TodoItemListsComponent, canActivate: [OnlyAuthGuard]},
  {path: 'todolists/:listName', component: TodoItemsComponent, canActivate: [OnlyAuthGuard]},
];


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    TodoItemListsComponent,
    TodoItemListFormComponent,
    TodoItemsComponent,
    TodoItemFormComponent
  ],
  providers: [
    TodoService
  ]
})
export class TodoModule {
}
