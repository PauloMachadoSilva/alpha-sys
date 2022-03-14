import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { produtosService } from 'src/services/produtos/produtos.service';
import { SucessoComponent } from '../../add-products/add-products.component';
import { DialogData } from '../list-products.component';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  selectedOptions = [];
  selectedOption;
  produto: any;
  productValue: any = 0;
  productOriginValue: any = 0;
  productAmount: any = 0;
  productValueCompare: any = 0;
  typeValue: boolean = false;
  formas: any[] = [
    { value: '1', viewValue: 'Dinheiro' },
    { value: '2', viewValue: 'Cartão' },
    { value: '3', viewValue: 'Outras formas' },
  ];
  outrasFormas: any[] = [
    { value: '1', viewValue: 'Dinheiro' },
    { value: '2', viewValue: 'Cartão' },
  ];
  public formulario: FormGroup;
  durationInSeconds = 5;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _servicosService: produtosService,
    private router: Router,
    private _snackBar: MatSnackBar

  ) {}
  valorPago = 0;

  onNoClick(): void {
    this.dialogRef.close();
  }

  atualizar(): void {
    if (this.formulario.valid) {
      console.log(this.formulario);
      this
        ._servicosService
        .atualizarProdutos(this.formulario.value)
        .subscribe(ret => console.log(ret));
        this.openSnackBar();
        this.dialogRef.close();
        setTimeout(this.reload, 2500);
    }
  }

  reload() {
    window.location.reload()
  }
  openSnackBar() {
    this._snackBar.openFromComponent(SucessoComponent, {
      duration: this.durationInSeconds * 1000,
    });
    this.formulario.reset();
  }

  ngOnInit() {
    var arr: any = 0;
    this.produto = this.data[0];
    this.formulario = new FormGroup({
      id: new FormControl(this.produto.id),
      nome: new FormControl(this.produto.nome, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(150),
      ]),
      descricao: new FormControl(this.produto.descricao, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(550),
      ]),
      valor: new FormControl(this.produto.valor, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(550),
      ])
    });
  }

  checkvalue() {
    var count: number = 0;
    count = this.productValue - this.valorPago;
    this.productValueCompare = count;
  }
  addItem(valor, $event) {
    var a = parseFloat(valor);
    this.productAmount = parseInt($event.key);
    if (isNaN(this.productAmount) == false) {
      if (this.productAmount <= 1 || this.productAmount == '') {
        this.productValue = this.productOriginValue;
      } else {
        this.productValue =
          this.productOriginValue + this.productAmount * a - a;
      }
    }
  }

  onNgModelChange($event) {
    console.log($event);
    if ($event == 3) {
      this.typeValue = true;
    } else {
      this.typeValue = false;
    }
    this.selectedOption = $event;
  }
}
