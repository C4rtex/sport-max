import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../auth.service';
import swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate{

  constructor(private authService:AuthService,
  private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let role= route.data['role'] as string;
    if(!this.authService.isAuthenticated()){
      this.router.navigate(['/inicio'])
      return false;
    }
    console.log(role)
    if(this.authService.hasRole(role)){
      return true;
    }
    swal.fire('Aceso denegado',`Hola ${this.authService.usuario.nombre} no tienes los permisos necesarios`,'warning')
    this.router.navigate(['/perfil'])
    return false;
  }
}

