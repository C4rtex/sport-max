import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modal:boolean = false;
  modal2:boolean = false;
  constructor() { }

  abrirModal(){
    this.modal=true;
    this.modal2=false;
    console.log("modal abierto");
  }
  cerrarModal(){
    this.modal=false;
    this.modal2=true;
  }
  abrirModal2(){
    this.modal2=true;
    this.modal=false;
  }
  cerrarModal2(){
    this.modal2=false;
    this.modal=true;
  }
  cerrarModales(){
    this.modal=false;
    this.modal2=false;
  }
}
