import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ModalService } from '../modal/modal.service';
import { Rutina } from '../rutinaejercicio/rutina';
import { AuthService } from '../usuarios/auth.service';
import { UsuarioService } from '../usuarios/service/usuario.service';

@Component({
  selector: 'app-verrutina',
  templateUrl: './verrutina.component.html',
  styleUrls: ['./verrutina.component.css']
})
export class VerrutinaComponent implements OnInit {


  constructor( public modalService:ModalService, public usuarioService:UsuarioService,public authService:AuthService) { }
  rutinas:Rutina[]=[];
  rutinaSeleccionada:Rutina;
  private id:number=this.authService.usuario.id;
  ngOnInit(): void {
    this.usuarioService.getRutinas(this.id).subscribe(
      response =>{
        this.rutinas=response
      }
    );
  }
  abrirModal(rutina:Rutina){
    this.rutinaSeleccionada = rutina;
    this.modalService.abrirModal();
  }

}
