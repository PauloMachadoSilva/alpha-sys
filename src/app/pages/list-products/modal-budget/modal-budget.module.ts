import { ModalBudgetComponent } from './modal-budget.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCommonModule } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser'
import { NgxCurrencyModule } from 'ngx-currency';

@NgModule({
  declarations: [ModalBudgetComponent],
  entryComponents: [ModalBudgetComponent],
  imports: [
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatCommonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatListModule,
    MatCardModule,
    ReactiveFormsModule,
    NgxCurrencyModule
  ],
})
export class ModalBudgetModule {}
