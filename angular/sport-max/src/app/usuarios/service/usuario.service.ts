import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { URL_BACKEND } from 'src/app/config/config';
import { Rutina } from 'src/app/rutinaejercicio/rutina';
import { Usuario } from '../usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlEndpoint: string = URL_BACKEND+'/api';
  constructor(private http: HttpClient, private router: Router) { }
  create(usuario: Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(this.urlEndpoint+'/usuarios', usuario).pipe(
      map((json:any)=>json.cliente as Usuario),
      catchError(e=>{
        if(e.status==400){
          return throwError(e);
        }
        if(e.error.mensaje){
          console.log(e.error.mensaje);
        }
        return throwError(e);
      }
      )
    );;
  }

  getRutinas(id:number):Observable<Rutina[]>{
    return this.http.get<Rutina[]>(this.urlEndpoint+"/rutinas/"+id).pipe(
      catchError(e=>{
        return throwError(e)
      }),
      tap((response:any)=>{
        console.log(response.content)
      }),
      map((response:any)=>{
       (response.content as Rutina[])
        return response;
    }));
  }

  getRutina(id:number):Observable<Rutina>{
    return this.http.get<Rutina>(this.urlEndpoint+"/rutina/"+id).pipe(
      catchError(e=>{
        return throwError(e)
      }),
      tap((response:any)=>{
      }),
      map((response:any)=>{
       (response.content as Rutina)
        return response;
    }));
  }

}
