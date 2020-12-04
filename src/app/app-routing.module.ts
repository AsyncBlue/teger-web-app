import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsuarioGuard } from './guards/usuario.guard';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MisTejidosComponent } from './components/mis-tejidos/mis-tejidos.component';
import { TejidoComponent } from './components/tejido/tejido.component';
import { PoliticaPrivacidadComponent } from './components/politica-privacidad/politica-privacidad.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'politica-privacidad', component: PoliticaPrivacidadComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [ UsuarioGuard ], children: [
    {path: 'mi-perfil', component: MiPerfilComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'mis-tejidos', component: MisTejidosComponent},
    {path: 'tejido/:_id', component: TejidoComponent}
  ]},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
