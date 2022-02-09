import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { produtosService } from 'src/services/produtos/produtos.service';

@Component({
  selector: 'app-incluir-produto',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  svc: any;
  constructor(
    private _servicosService: produtosService
  ) { 
  }

  ngOnInit (): void {
}

public formulario: FormGroup = new FormGroup({
  'nome': new FormControl(null,[ Validators.required,Validators.minLength(5),Validators.maxLength(150)]),
  'descricao': new FormControl(null, [ Validators.required,Validators.minLength(100),Validators.maxLength(550)]),
  'valor': new FormControl(null, [ Validators.required,Validators.minLength(100),Validators.maxLength(550)]),
  'quantidade': new FormControl(null, [ Validators.required,Validators.minLength(100),Validators.maxLength(550)])
  
});

}
