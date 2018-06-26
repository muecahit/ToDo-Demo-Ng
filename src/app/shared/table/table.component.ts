import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() colConfigs: ColConfig[] = [];
  @Input() tableData: object[] = [];
  @Input() searchShouldConsider: string[] = [];

  @Output() itemSelected = new EventEmitter<object>();
  @Output() itemEdited = new EventEmitter<object>();
  @Output() itemDeleted = new EventEmitter<object>();

  @Output() addButtonClicked = new EventEmitter();

  searchString = '';

  order: string[];
  tdWidths = {};

  ngOnInit() {
    const order = [];

    for (const conf of this.colConfigs) {
      order.push(conf.attributeName);
      this.tdWidths[conf.attributeName] = conf.colWidth;
    }
    this.order = order;
  }

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
    return this.tableData.filter(record => {
      for (const attr of this.searchShouldConsider) {
        if (record[attr].toString().includes(this.searchString)) {
          return true;
        }
      }
      return false;
    });
  }
}
