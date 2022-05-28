import {Injectable} from '@angular/core'
import {
  HttpEvent,HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import {catchError} from 'rxjs/operators'
import {Router} from '@angular/router';
import {Observable,throwError} from 'rxjs'
import {AuthService} from '../auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private authService:AuthService,private router:Router){

  }
    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
        return next.handle(req).pipe(
          catchError(e=>{
            //acceso no autenticado
            if(e.status==401 ){
              if(this.authService.isAuthenticated()){
                this.authService.logOut();
              }
              this.router.navigate(['/inicio'])

            }
            //acceso prohibido
            if(e.status==403){
              this.router.navigate(['/perfil'])
            }
            return throwError(e)
          })
        );
    }
}
