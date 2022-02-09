import { ServicosService } from './../../services/servicos/servicos.service';
import { Component } from '@angular/core';

@Component({
    selector: 'partial-svc',
    templateUrl: 'partial-svc.component.html',
    styleUrls: ['partial-svc.component.sass']
})

export class PartialSvc {
    svc: any;
    plataformaSelecionada: string;
    constructor (
        private _servicosService: ServicosService,
    ) {
        
    }
    ngOnInit (): void {
        this.getServicos();        
    }
    getServicos (): void {
        this
            ._servicosService
            .consultaServicos()
            .subscribe(svc => {
                    this.svc = svc;
                });
    }
}