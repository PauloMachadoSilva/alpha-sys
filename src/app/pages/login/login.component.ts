import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { produtosService } from 'src/services/produtos/produtos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  svc: any;
  constructor(
    private _servicosService: produtosService
  ) { 
  }

  ngOnInit (): void {
    this.getProdutos();        
}

public formulario: FormGroup = new FormGroup({
  'nome': new FormControl(null,[ Validators.required,Validators.minLength(5),Validators.maxLength(150)]),
  'senha': new FormControl(null, [ Validators.required,Validators.minLength(7),Validators.maxLength(550)])
  
});
getProdutos (): void {
    this
        ._servicosService
        .consultaProdutos()
        .subscribe(svc => {
                this.svc = svc ? svc : [] ;
                console.log (this.svc)
            });
}

}
