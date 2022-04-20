import { AfterViewInit, Component, Inject, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { produtosService } from 'src/services/produtos/produtos.service';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogComponent } from './modal/dialog.component';
import { Router } from '@angular/router';
import { orcamentoService } from 'src/services/orcamento/orcamento.service';


export interface UserData {
  id: string;
  data: string;
  progress: string;
  valor: string;
};

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})

export class BudgetComponent {
  displayedColumns: string[] = ['select', 'cliente' ,'data', 'valor_orcamento'];
  dataSource: MatTableDataSource<UserData>;
  animal: string;
  name: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  svc: any;
  selection = new SelectionModel<any>(true, []);

  types: {} =
  [
    {id:1, data:'2022-04-18', cliente:'Cliente 1', valor_orcamento: 1000, valor_mao_obra : 100, observacao:'obs' },
    {id:1, data:'2022-04-10', cliente:'Cliente 2', valor_orcamento: 500, valor_mao_obra : 100, observacao:'obs' },
  ];
  orderObj = {};
  constructor(
    private _orcamentoService: orcamentoService,
    public dialog: MatDialog,
    private router: Router
    ) {
      this.getOrcamentos();
     }

  // getOrcamentos(): void {
  //   this.svc = this.types ? this.types : [];
  //   this.dataSource = new MatTableDataSource(this.svc ? this.svc : [] );
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }


  getOrcamentos(): void {
    this
      ._orcamentoService
      .consultaOrcamentos()
      .subscribe(svc => {
        this.svc = svc ? svc : [];
        this.dataSource = new MatTableDataSource(this.svc.retorno ? this.svc.retorno : [] );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(): void {

    let dialogRef = this.dialog.open(DialogComponent, {
      width: '90%',
      data: this.selection.selected
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  redirectAdd() {
    this.router.navigate(['/list-products'])

  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      if (this.selection.selected.length > 0) {
         const numSelected = this.selection.selected.length;
         const numRows = this.dataSource.data.length;
         return numSelected === numRows;
      }
   }

   /** Selects all rows if they are not all selected; otherwise clear selection. */
   masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;


  }

}
