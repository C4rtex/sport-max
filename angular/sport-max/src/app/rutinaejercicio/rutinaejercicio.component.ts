import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../usuarios/service/usuario.service';
import { Rutina } from './rutina';

@Component({
  selector: 'app-rutinaejercicio',
  templateUrl: './rutinaejercicio.component.html',
  styleUrls: ['./rutinaejercicio.component.css'],
})
export class RutinaejercicioComponent implements OnInit {
  public rutina:Rutina;
  private listaTiempoEjercicios = [];
  private copiaTiempoEjercicios=[]
  public minutoInicio = 0;
  public segundoInicio = 0;
  public segundooriginal = 0;
  public minDescanso = 0;
  public segDescanso = 5;
  public cont = 1;
  public referencia =1;
  public minutosVista = 0;
  public segundosVista = 0;
  public numEjercicio: any = "";
  public numSerieReal:number;
  public btnActivo=true;
  constructor(public usuarioService:UsuarioService,private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.cargarRutina();
  }
  iniciarRutina(){
    this.btnActivo=false;
    this.numSerieReal=this.rutina.series;
    this. pasarEjericios();
    this.copiaTiempoEjercicios=this.listaTiempoEjercicios.slice();
    this.actualizar(this.cont, 2);
  }
  actualizar(contador: number, bandera) {
    if (bandera == 1) {
      this.minutosVista = this.minDescanso;
      this.segundosVista = this.segDescanso;
      if (this.segDescanso == 0) {
        if (this.minDescanso == 0 && this.segDescanso == 0) {
          this.minDescanso = 0;
          this.segDescanso = 5;
          setTimeout(() => {
            this.numEjercicio = contador;
          }, 100);
          var time = setTimeout(this.actualizar.bind(this), 100, contador, 2);
        } else {
          this.minDescanso -= 1;
          this.segDescanso = 59;
          var time = setTimeout(this.actualizar.bind(this), 100, contador, 1);
        }
      } else {
        this.numEjercicio = 'Descanso';
        this.segDescanso -= 1;
        var time = setTimeout(this.actualizar.bind(this), 100, contador, 1);
      }
    } else {
      this.minutosVista = this.listaTiempoEjercicios[contador - 1];
      this.minutoInicio = this.listaTiempoEjercicios[contador - 1];

      this.segundosVista = this.segundoInicio;

      if (this.segundoInicio == 0) {
        if (this.listaTiempoEjercicios[contador - 1] == 0 && this.segundoInicio == 0) {
          if (this.referencia < this.numSerieReal) {
            if(contador==this.listaTiempoEjercicios.length){
              contador=0;
              this.listaTiempoEjercicios=this.copiaTiempoEjercicios.slice();
              this.referencia=this.referencia+1;
            }
            this.minutoInicio = this.listaTiempoEjercicios[contador - 1];
            this.segundoInicio = this.segundooriginal;
            setTimeout(() => {
              this.numEjercicio = contador + 1;
            }, 100);
            var time = setTimeout(
              this.actualizar.bind(this),
              100,
              contador + 1,
              1
            );
          } else {
            this.numEjercicio = 'Finalizado';
            clearTimeout(time);
          }
        } else {
          contador = contador;

          this.listaTiempoEjercicios[contador - 1] = this.listaTiempoEjercicios[contador - 1] - 1;

          this.segundoInicio = 59;

          var time = setTimeout(this.actualizar.bind(this), 100, contador, 2);
        }
      } else {
        contador = contador;
        this.segundoInicio -= 1;
        var time = setTimeout(this.actualizar.bind(this), 100, contador, 2);
      }
    }
  }

  cargarRutina():void{
    this.activatedRoute.params.subscribe(params=>{
      let id =params['id'];
      if(id){
        this.usuarioService.getRutina(id).subscribe(
          response =>{
            this.rutina=response
          }
        );
      }
    });
  }
  pasarEjericios(){
    for(let i=0;i<this.rutina.ejercicios.length;i++){
      this.listaTiempoEjercicios.push(this.rutina.ejercicios[i].duracion);
    }
  }
}
