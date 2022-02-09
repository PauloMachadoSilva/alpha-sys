import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { produtosService } from 'src/services/produtos/produtos.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {
  svc: any;
  constructor(
    private _servicosService: produtosService
  ) { 
  }

  ngOnInit (): void {
}

public formulario: FormGroup = new FormGroup({
  'data': new FormControl(null,[ Validators.required,Validators.minLength(12),Validators.maxLength(150)]),
  
});


}
