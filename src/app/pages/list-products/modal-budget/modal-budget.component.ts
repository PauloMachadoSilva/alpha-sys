import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { produtosService } from 'src/services/produtos/produtos.service';
import { SucessoComponent } from '../../add-products/add-products.component';

@Component({
  selector: 'app-modal-budget',
  templateUrl: './modal-budget.component.html',
  styleUrls: ['./modal-budget.component.scss']
})
export class ModalBudgetComponent {

  selectedOptions = [];
  selectedOption;
  produtos: any;
  products: any;
  productsOrigin: any;
  productsArray: any;
  quantidade: any = 0;
  productValue: any = 0;
  productOriginValue: any = 0;
  productAmount: any = 0;
  valueGeral: any = 0;
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
    public dialogRef: MatDialogRef<ModalBudgetComponent>,
    @Inject(MAT_DIALOG_DATA) public dataProducts: any,
    private _servicosService: produtosService,
    private router: Router,
    private _snackBar: MatSnackBar

  ) {
    // localStorage.setItem('dataProducts', JSON.stringify(this.dataProducts));
    this.products = this.dataProducts;
  }
  valorPago = 0;
  ngOnInit() {
    var produtosArray = [];
    this.products.forEach(function(item, chave){
      produtosArray = [
        ...produtosArray, {'quantidade': 1,
        'id': item.id,
        'nome': item.nome,
        'descricao': item.descricao,
        'valor': item.valor}
      ]
    });
    this.productsArray = produtosArray;
    this.sumValue();
  }

  sumValue() {
    var arr:any = 0;
    this.productsArray.forEach(function(item, chave){
      arr = arr + parseFloat(item.valor) * item.quantidade
    });
    this.productValue = arr;
    this.productOriginValue = this.productValue;
  }

  checkvalue() {
    var count:number = 0
    count = this.productValue - this.valorPago;
    this.productValueCompare = count;
}
addItem(valor, id, $event) {
  // const storageVal = localStorage.getItem('dataProducts');
  // const storage = JSON.parse(storageVal);
  // this.products = storage;
  if (isNaN(parseInt($event.target.value)) == false) {
    var foundIndex = this.productsArray.findIndex(x => x.id == id);
    let val = $event.target.value * this.products[foundIndex].valor;
    this.productsArray[foundIndex].quantidade = $event.target.value;
    this.sumValue();
  }
  else {
    // const storageVal = localStorage.getItem('dataProducts');
    // const storage = JSON.parse(storageVal);
    // this.products = storage;
    var foundIndex = this.products.findIndex(x => x.id == id);
    this.productsArray[foundIndex].quantidade = this.productsArray[foundIndex].quantidade;
    this.sumValue();
  }

}

findIndexToUpdate(id) {
  return id === this;
}


addValorMobra($event) {
  if ($event.target.value.length < 11) {
    this.valueGeral = $event.target.value == '' ? 0 : parseFloat($event.target.value.replace('R$ ', '').replace(',','.')) +  this.productValue;
  }
  else {
    const v = $event.target.value.replace('R$ ', '').replace('.','')
    this.valueGeral = v == '' ? 0 : parseFloat(v.replace(',', '.')) +  this.productValue;

  }
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

}
