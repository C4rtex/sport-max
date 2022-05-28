import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { InicioComponent } from './inicio/inicio.component';
import {RouterModule,Routes} from '@angular/router';
import { QuienessomosComponent } from './quienessomos/quienessomos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RutinaejercicioComponent } from './rutinaejercicio/rutinaejercicio.component';
import { ComousarComponent } from './comousar/comousar.component';
import { ModalComponent } from './modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CrearRutinaComponent } from './crear-rutina/crear-rutina.component';
import { VerrutinaComponent } from './verrutina/verrutina.component';
import { CrearRutinaCompletaComponent } from './crear-rutina/crear-rutina-completa/crear-rutina-completa.component';
import { VerDetalleDeRutinaComponent } from './verrutina/ver-detalle-de-rutina/ver-detalle-de-rutina.component';
import { TokenInterceptor } from './usuarios/interceptors/token.interceptor';
import { AuthInterceptor } from './usuarios/interceptors/auth.interceptor';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { RoleGuard } from './usuarios/guards/role.guard';


const routes: Routes = [  //rutas
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'quienessomos', component: QuienessomosComponent },
  { path: 'perfil', component: PerfilComponent , canActivate:[AuthGuard,RoleGuard], data:{role:'ROLE_USER'}},
  { path: 'rutinaejercicio/:id', component: RutinaejercicioComponent, canActivate:[AuthGuard,RoleGuard], data:{role:'ROLE_USER'} },
  { path: 'comousar', component: ComousarComponent },
  { path: 'modal', component: ModalComponent },
  { path: 'crear-rutina-completa', component: CrearRutinaCompletaComponent, canActivate:[AuthGuard,RoleGuard], data:{role:'ROLE_USER'} },
  ];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InicioComponent,
    QuienessomosComponent,
    PerfilComponent,
    RutinaejercicioComponent,
    ComousarComponent,
    ModalComponent,
    CrearRutinaComponent,
    VerrutinaComponent,
    CrearRutinaCompletaComponent,
    VerDetalleDeRutinaComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,  
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
