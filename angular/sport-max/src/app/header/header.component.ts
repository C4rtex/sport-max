import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal/modal.service';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public modalService:ModalService,public authService:AuthService) { }

  ngOnInit(): void {
  }
  abrirModal(){
    this.modalService.abrirModal();
    console.log("abrirModal");
  }
}
