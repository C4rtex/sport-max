import { Usuario } from "../usuarios/usuario";
import { Ejercicio } from "./ejercicios/ejercicio";

export class Rutina {
    id:number;
    nombreRutina:string;
    usuario:Usuario;
    series:number;
    ejercicios:Ejercicio[]=[];
    totalRutina:number;
}
