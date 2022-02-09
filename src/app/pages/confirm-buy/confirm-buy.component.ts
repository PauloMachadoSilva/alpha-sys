import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { produtosService } from 'src/services/produtos/produtos.service';

@Component({
  selector: 'confirm-buy',
  templateUrl: './confirm-buy.component.html',
  styleUrls: ['./confirm-buy.component.css']
})
export class ConfirmBuyComponent implements OnInit {
  svc: any;
  typesOfShoes: {} = 
  [
    {'nome':'Livro 1', 'descricao':'Descrição do livro', 'valor': 'R$: 50,00', },
    {'nome':'Livro 2', 'descricao':'Descrição do livro', 'valor': 'R$: 30,00', }
  ];
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
