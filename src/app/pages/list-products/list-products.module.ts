import { ModalBudgetModule } from './modal-budget/modal-budget.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ListProductsComponent } from './list-products.component';
import { DialogModule } from './modal';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox/';


@NgModule({
  declarations: [ListProductsComponent],
  exports: [ListProductsComponent],
  imports: [
    DialogModule,
    ModalBudgetModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    MatListModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
  ],
})
export class ListProductsModel {}
