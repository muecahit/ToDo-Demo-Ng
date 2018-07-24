import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() colConfigs: ColConfig[] = [];
  @Input() tableData: object[] = [];
  @Input() searchShouldConsider: string[] = [];

  @Output() itemSelected = new EventEmitter<object>();
  @Output() itemEdited = new EventEmitter<object>();
  @Output() itemDeleted = new EventEmitter<object>();

  @Output() addButtonClicked = new EventEmitter();

  searchString = '';

  selectItem(item: object) {
    this.itemSelected.emit(item);
  }

  deleteItem(item: object) {
    this.itemDeleted.emit(item);
  }

  editItem(item: object) {
    this.itemEdited.emit(item);
  }

  addButtonClick() {
    this.addButtonClicked.emit();
  }

  getData(): object[] {
    if (this.searchString === '') {
      return this.tableData;
    }

    return this.tableData.filter(record => {
      for (const attr of this.searchShouldConsider) {
        if (record[attr].toString().toLowerCase().includes(this.searchString.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }
}
