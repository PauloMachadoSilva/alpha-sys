import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { orcamentoService } from 'src/services/orcamento/orcamento.service';
import { produtosService } from 'src/services/produtos/produtos.service';
import { SucessoComponent } from '../../add-products/add-products.component';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  selectedOptions = [];
  svc:any;
  selectedOption;
  produtos: any;
  orcamento: any;
  productValue: any = 0;
  produtoValorGeral: any = 0;
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
    private _orcamentoService: orcamentoService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  valorPago = 0;

  ngOnInit() {
    var arr: any = 0;
    this.orcamento = this.data[0];
    this.consultarOrcamento();
  }

  sumValue() {
    var arr:any = 0;
    this.produtos.forEach(function(item, chave){
      arr = arr + parseFloat(item.valor) * item.quantidade
    });
    this.productValue = arr;
    this.produtoValorGeral = this.productValue + parseFloat(this.orcamento.valor_mao_obra);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  consultarOrcamento(): void {
    console.log(this.formulario);
    this._orcamentoService
      .consultaOrcamentoxProdutos(this.orcamento.id)
      .subscribe((ret) => {
      this.svc = ret ? ret : [];
      this.produtos = this.svc.retorno ? this.svc.retorno : []
      this.sumValue();});
  }

  gerarPdf() {}

  reload() {
    window.location.reload();
  }
  openSnackBar() {
    this._snackBar.openFromComponent(SucessoComponent, {
      duration: this.durationInSeconds * 1000,
    });
    this.formulario.reset();
  }
}
