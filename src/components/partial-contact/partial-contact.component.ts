import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
    selector: 'partial-contact',
    templateUrl: 'partial-contact.component.html',
    styleUrls: ['partial-contact.component.sass']
})

export class PartialContact {

    //Máscaras
    public maskTelefone = [ /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public maskCpf = [ /[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.',  /\d/, /\d/, /\d/, '-', /\d/, /\d/];
    public maskNascimento = [ /[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
    
    public formulario: FormGroup = new FormGroup({
        'nome': new FormControl(null,[ Validators.required,Validators.minLength(5),Validators.maxLength(150)]),
        'email': new FormControl(null,[ Validators.required,Validators.minLength(5),Validators.maxLength(150)]),    
        'duvidas': new FormControl(null,[ Validators.required,Validators.minLength(1),Validators.maxLength(150)]),
        'ddd': new FormControl(null, [ Validators.required,Validators.minLength(2),Validators.maxLength(2)]),        
        'telefone': new FormControl(null, [ Validators.required,Validators.minLength(7),Validators.maxLength(150)]),
        'txtduvidas': new FormControl(null, [ Validators.required,Validators.minLength(7),Validators.maxLength(550)])
        
    });
    
    enviarContato(plano:string): void{
        if(this.formulario.status === 'INVALID'){
            this.formulario.get('nome').markAsTouched()
            this.formulario.get('email').markAsTouched()
            this.formulario.get('duvidas').markAsTouched()
            this.formulario.get('ddd').markAsTouched()
            this.formulario.get('telefone').markAsTouched()
            this.formulario.get('txtduvidas').markAsTouched()
        }
        else {
            //Criando objeto a ser exibido no console
            let resultado = [{
                nome:this.formulario.get('nome').value,
                email:this.formulario.get('email').value,
                duvidas:this.formulario.get('duvidas').value,
                ddd:this.formulario.get('ddd').value,
                telefone:this.formulario.get('telefone').value,
                txtduvidas: this.formulario.get('txtduvidas').value,
            }]
            alert('O objeto foi escrito no Console')
            console.log(resultado);
        }   
        }  
}
