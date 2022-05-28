import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/modal/modal.service';
import { Rutina } from 'src/app/rutinaejercicio/rutina';

@Component({
  selector: 'app-ver-detalle-de-rutina',
  templateUrl: './ver-detalle-de-rutina.component.html',
  styleUrls: ['./ver-detalle-de-rutina.component.css']
})
export class VerDetalleDeRutinaComponent implements OnInit {

  constructor(public modalService:ModalService) { }
  @Input() public rutina:Rutina;
  ngOnInit(): void {
  }

  cerrarModal(){
    this.modalService.cerrarModal();
  }
}
