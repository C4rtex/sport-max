import { Rutina } from "../rutinaejercicio/rutina";

export class Usuario {
    id:number;
    username:string;
    password:string;
    nombre:string;
    roles:string[]=[];
    rutinas:Rutina[]=[];
}
