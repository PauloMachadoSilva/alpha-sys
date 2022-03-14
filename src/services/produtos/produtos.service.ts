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
export class produtosService {
    constructor (
        private _httpClient: HttpClient,
    ) {

    }

    /**
     * Consultando Servicos na Servidor, retornando JSON Ge
     * @author Paulo Eduardo - pauloems@yahoo.com.br
     */
    consultaProdutos(){
        return this
            ._httpClient
            .get(`http://www.alphasolucaoemseg.com.br/sys/produtos.php/produtos/`, httpOptions)
    }


    /**
     * Incluindo produtos
     * @author Paulo Eduardo - pauloems@yahoo.com.br
     */
     incluirProdutos(body: any){
      return this
          ._httpClient
          .post(`http://www.alphasolucaoemseg.com.br/sys/produtos.php/produtos/`, body, httpOptions)
  }

  /**
     * Atualizar produtos
     * @author Paulo Eduardo - pauloems@yahoo.com.br
     */
   atualizarProdutos(body: any){
    return this
        ._httpClient
        .post(`http://www.alphasolucaoemseg.com.br/sys/produtos.php/produtos/update`, body, httpOptions)
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
