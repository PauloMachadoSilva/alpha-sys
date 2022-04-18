import { ModalBudgetComponent } from './modal-budget/modal-budget.component';
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


export interface UserData {
  id: string;
  name: string;
  progress: string;
  valor: string;
}

export interface DialogData {
  animal: string;
  name: string;
}

/** Constants used to fill up our data base. */
const VALOR: string[] = [
  'R$ 1.500,00', 'R$ 2.500,00', 'R$ 3.500,00', 'R$ 4.000,00', 'R$ 500,00', 'R$ 1.000,00', 'R$ 600,00'
];
const NAMES: string[] = [
  'Livro 1', 'Livro 2', 'Livro 3', 'Caderno 1', 'Caderno 2', 'Adesivo', 'Camisa'
];

@Component({
  selector: 'app-list-products',
  styleUrls: ['./list-products.component.scss'],
  templateUrl: './list-products.component.html',
})
export class ListProductsComponent {
  displayedColumns: string[] = ['select','nome', 'valor'];
  dataSource: MatTableDataSource<UserData>;
  animal: string;
  name: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  svc: any;
  selection = new SelectionModel<any>(true, []);

  types: {} =
  [
    {id:1, nome:'Conector P4', descricao:'Conector P4', valor: 2 },
    {id:2, nome:'Camera bullet infra-vermelho 20m	', descricao:'Camera bullet infra-vermelho 20m', valor: 109.90 }
  ];
  constructor(
    public dialog: MatDialog,
    private _servicosService: produtosService,
    private router: Router



  ) {
    this.getProdutos();
  }

  // getProdutos(): void {

  //       this.svc = this.types ? this.types : [];
  //       this.dataSource = new MatTableDataSource(this.svc ? this.svc : [] );
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;

  //   }

  getProdutos(): void {
    this
      ._servicosService
      .consultaProdutos()
      .subscribe(svc => {
        this.svc = svc ? svc : [];
        this.dataSource = new MatTableDataSource(this.svc.retorno ? this.svc.retorno : [] );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

  }

  // deleteProducts(): void {

  //       ._servicosService
  //       .deletarProdutos(this.formulario.value)
  //       .subscribe(ret => console.log(ret));
  //       this.openSnackBar();
  //       this.dialogRef.close();
  //       window.location.reload();

  //   }
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(): void {

    let dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data: this.selection.selected
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  AddBudget(): void {

    let dialogRef = this.dialog.open(ModalBudgetComponent, {
      width: '90%',
      data: this.selection.selected
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  redirectAdd() {
    this.router.navigate(['/add-products'])

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
