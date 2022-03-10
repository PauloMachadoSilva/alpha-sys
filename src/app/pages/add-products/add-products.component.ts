import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { produtosService } from 'src/services/produtos/produtos.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-incluir-produto',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
  svc: any;
  durationInSeconds = 5;
  constructor(
    private _servicosService: produtosService,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit (): void {
}

public formulario: FormGroup = new FormGroup({
  'nome': new FormControl(null,[ Validators.required,Validators.minLength(5),Validators.maxLength(150)]),
  'descricao': new FormControl(null, [ Validators.required,Validators.minLength(5),Validators.maxLength(550)]),
  'valor': new FormControl(null, [ Validators.required,Validators.minLength(1),Validators.maxLength(550)]),
  'quantidade': new FormControl(null, [ Validators.required,Validators.minLength(0),Validators.maxLength(2)])

});

incluir ():void {
  // this.openSnackBar();
  if (this.formulario.valid) {
    console.log(this.formulario);
    this
      ._servicosService
      .incluirProdutos(this.formulario.value)
      .subscribe(ret => console.log(ret));
      this.openSnackBar();
  }
}

openSnackBar() {
  this._snackBar.openFromComponent(SucessoComponent, {
    duration: this.durationInSeconds * 1000,
  });
  this.formulario.reset();
}

}

@Component({
  selector: 'sucesso-component',
  templateUrl: './sucesso-component/sucesso-component.html',
  styles: [
    `
    .sucesso {
      color: lime;
      text-align:center;
    }
  `,
  ],
})
export class SucessoComponent {}
