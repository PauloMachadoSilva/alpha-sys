import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';


const httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Authorization':'authkey',
      'userid':'1'
    })
  };


@Injectable()
export class orcamentoService {
    constructor (
        private _httpClient: HttpClient,
    ) {

    }

    /**
     * Consultando Servicos na Servidor, retornando JSON Ge
     * @author Paulo Eduardo - pauloems@yahoo.com.br
     */
    consultaOrcamentos(){
        return this
            ._httpClient
            .get(`http://www.alphasolucaoemseg.com.br/sys/orcamentos.php/orcamentos/`, httpOptions)
    }

    /**
     * Consultando Servicos na Servidor, retornando JSON Ge
     * @author Paulo Eduardo - pauloems@yahoo.com.br
     */
     consultaOrcamentoxProdutos(body: any){
      const $id = body;
      return this
          ._httpClient
          .get('http://www.alphasolucaoemseg.com.br/sys/orcamentos.php/orcamentos/'+ $id)
  }


  /**
     * Incluindo Orçamentos
     * @author Paulo Eduardo - pauloems@yahoo.com.br
     */
   incluirOrcamentos(body: any){
    return this
        ._httpClient
        .post(`http://www.alphasolucaoemseg.com.br/sys/orcamentos.php/orcamentos/`, body, httpOptions)
}

/**
     * Deletar produtos
     * @author Paulo Eduardo - pauloems@yahoo.com.br
     */
  deletarProdutos(body: any){
    return this
        ._httpClient
        .post(`http://www.alphasolucaoemseg.com.br/sys/produtos.php/produtos/update`, body, httpOptions)
}


}
