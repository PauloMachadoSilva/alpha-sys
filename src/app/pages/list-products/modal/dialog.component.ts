import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../list-products.component';

@Component({
    selector: 'app-dialog',
    templateUrl: 'dialog.component.html',
    styleUrls: ['./dialog.component.css'],

})
export class DialogComponent {
    selectedOptions = [];
    selectedOption;
    productValue:any = 0;
    productOriginValue:any = 0;
    productAmount:any = 0;
    productValueCompare:any = 0;
    typeValue:boolean = false;
    formas: any[] = [
        {value: '1', viewValue: 'Dinheiro'},
        {value: '2', viewValue: 'Cartão'},
        {value: '3', viewValue: 'Outras formas'}
      ];
    outrasFormas: any[] = [
        {value: '1', viewValue: 'Dinheiro'},
        {value: '2', viewValue: 'Cartão'},
      ];
    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }
        valorPago = 0;

    onNoClick(): void {
        this.dialogRef.close();
    }
        
    ngOnInit() {
        var arr:any = 0;
        this.data.forEach(function(valor, chave){
            arr = arr + parseFloat(valor.valor)
        });
        this.productValue = this.productValue + arr;
        this.productOriginValue = this.productValue;
    }

    checkvalue() {
        var count:number = 0
        count = this.productValue - this.valorPago;
        this.productValueCompare = count;
    }
    addItem(valor,$event) {
        var a = parseFloat(valor);
        this.productAmount = parseInt($event.key);
        if (isNaN(this.productAmount) == false) {
            if (this.productAmount <= 1 || this.productAmount == '') {
                this.productValue = this.productOriginValue
            }
            else {
                this.productValue = this.productOriginValue + (this.productAmount * a) - a
            }
        }

    }

    onNgModelChange($event){
        console.log($event);
        if ($event == 3) {
            this.typeValue = true;
        }
        else {
            this.typeValue = false;
        }
        this.selectedOption=$event;
        
      }


}