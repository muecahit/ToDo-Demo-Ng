import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TodoItemListFormComponent} from './todo-item-list-form.component';

describe('TodoItemListFormComponent', () => {
  let component: TodoItemListFormComponent;
  let fixture: ComponentFixture<TodoItemListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoItemListFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
