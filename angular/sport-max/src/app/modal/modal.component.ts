import { Component, OnInit,  } from '@angular/core';
import { ModalService } from './modal.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AuthService } from '../usuarios/auth.service';
import { Usuario } from '../usuarios/usuario';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuarios/service/usuario.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  nombreFormControl2 = new FormControl('', [Validators.required,Validators.minLength(4)]);
  emailFormControl2 = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl2 = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  public usuario:Usuario;
  public nuevoUsuario:Usuario;
  public errores: string[];
  constructor(public modalService: ModalService,public authService :AuthService,private router:Router,public usuarioService:UsuarioService) {
    this.usuario = new Usuario();
    this.nuevoUsuario = new Usuario();
   }
  ngOnInit(): void {
  }
  cerrarModal(){
    this.modalService.cerrarModal();
  }
  cerrarModal2(){
    this.modalService.cerrarModal2();
  }
  abrirModal2(){
    this.modalService.abrirModal2();
  }
  cerrarModales(){
    this.modalService.cerrarModales();
  }
  login():void{
    console.log(this.usuario);
    if(this.usuario.username==null||this.usuario.password==null ||this.usuario.username.trim()==""||this.usuario.password.trim()=="" ){
      swal.fire('Error login','Username o password vacías '+this.usuario.nombre,'error')
      return;
    }

    this.authService.login(this.usuario).subscribe(
      response=>{
        console.log(response);
        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);
        let usuario = this.authService.usuario;
        this.router.navigate(['/perfil']);
        swal.fire('Login',`Hola ${usuario.username}, has iniciado sesión con exito`,'success');
      },err=>{
        if(err.status==400){
          swal.fire('Error Login','Usuario o clave incorrecta','error')
        }
      }
    );

  }

  registro():void{
    this.usuarioService.create(this.nuevoUsuario).subscribe(
      cliente=> {
      this.router.navigate(['./inicio'])
      swal.fire('Nuevo Usuario',`Usuario ${this.nuevoUsuario.nombre} creado con exito`,'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error("Codigo del estatus: "+err.status);
      console.error(err.error.errors);
    }  );
  }
}
