import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../material/material/material.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { AlertDatosComponent } from './alert-datos/alert-datos.component';
import { AlertPassComponent } from './alert-pass/alert-pass.component';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { InicioComponent } from './inicio/inicio.component';
import { MisTejidosComponent } from './mis-tejidos/mis-tejidos.component';
import { EventoComponent } from './evento/evento.component';
import { EventosComponent } from './eventos/eventos.component';
import { TejidoComponent } from './tejido/tejido.component';
import { ParticipantesComponent } from './participantes/participantes.component';
import { ParticipanteComponent } from './participante/participante.component';
import { NetworkgraphComponent } from './networkgraph/networkgraph.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { AlertBorrarUsuarioComponent } from './alert-borrar-usuario/alert-borrar-usuario.component';
import { AlertGuardarVotosComponent } from './alert-guardar-votos/alert-guardar-votos.component';
import { AlertEnlacesComponent } from './alert-enlaces/alert-enlaces.component';
import { AlertIniciarEnlacesComponent } from './alert-iniciar-enlaces/alert-iniciar-enlaces.component';
import { AlertEventoFinalizadoComponent } from './alert-evento-finalizado/alert-evento-finalizado.component';
import { AlertExpulsarUsuarioComponent } from './alert-expulsar-usuario/alert-expulsar-usuario.component';
import { AlertSalirSinFinalizarComponent } from './alert-salir-sin-finalizar/alert-salir-sin-finalizar.component';
import { AlertBorrarEventoComponent } from './alert-borrar-evento/alert-borrar-evento.component';
import { FooterComponent } from './footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PoliticaPrivacidadComponent } from './politica-privacidad/politica-privacidad.component';



@NgModule({
  declarations: [NavbarComponent, HomeComponent, LoginComponent, DashboardComponent, MiPerfilComponent, AlertDatosComponent, AlertPassComponent, AvatarSelectorComponent, InicioComponent, MisTejidosComponent, EventoComponent, EventosComponent, TejidoComponent, ParticipantesComponent, ParticipanteComponent, NetworkgraphComponent, AlertBorrarUsuarioComponent, AlertGuardarVotosComponent, AlertEnlacesComponent, AlertIniciarEnlacesComponent, AlertEventoFinalizadoComponent, AlertExpulsarUsuarioComponent, AlertSalirSinFinalizarComponent, AlertBorrarEventoComponent, FooterComponent, PoliticaPrivacidadComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HighchartsChartModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  exports: [
    NavbarComponent,
    LoginComponent
  ]
})
export class ComponentsModule { }
