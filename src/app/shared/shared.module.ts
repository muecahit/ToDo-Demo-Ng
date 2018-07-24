import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PopupComponent} from './popup/popup.component';
import {TableComponent} from './table/table.component';
import {ClickStopPropagationDirective} from './directives/click-stop-propagation.directive';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    PopupComponent,
    TableComponent,
    ClickStopPropagationDirective,
  ],
  exports: [
    FormsModule,
    PopupComponent,
    TableComponent,
    ClickStopPropagationDirective
  ]
})
export class SharedModule {
}
