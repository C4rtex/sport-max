import { Component, OnInit } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  crearRutina:boolean = true;
  verRutina:boolean = false;
  constructor(public authService:AuthService) { }

  ngOnInit(): void {
  }

  verCrearRutina(){
    this.crearRutina = true;
    this.verRutina = false;
  }

  verVerRutina(){
    this.verRutina = true;
    this.crearRutina = false;
  }
}
