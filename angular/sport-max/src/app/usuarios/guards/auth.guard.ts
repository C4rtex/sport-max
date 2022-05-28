import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(private authService:AuthService,
    private router:Router){}
  
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(this.authService.isAuthenticated()){
          if(this.isTokenExpired()){
            this.authService.logOut();
              this.router.navigate(['/inicio']);
              return false;
          }
          return true;
        }
        this.router.navigate(['/inicio']);
      return false;
    }
  
    isTokenExpired():boolean{
      let token = this.authService.token;
      let payLoad = this.authService.obtenerDatosToken(token);
      let now = new Date().getTime()/1000;
      if(payLoad.exp<now){
        return true;
      }
      return false;
    }
  
}
