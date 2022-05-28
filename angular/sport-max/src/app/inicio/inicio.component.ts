import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal/modal.service';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(public modalService:ModalService, public authService: AuthService) { }
  ngOnInit(): void {
  }
  abrirModal(){
    this.modalService.abrirModal();
    console.log("abrirModal");
  }
}
