import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  opened = false;

  usuario: Usuario = {};

  constructor( private usuarioService: UsuarioService, private cd: ChangeDetectorRef ) { }

  ngOnInit(): void {

    this.usuario = this.usuarioService.getUsuario();

  }

  logout() {
    this.usuarioService.logout();
  }

  refreshusuario() {
    this.usuario = this.usuarioService.getUsuario();
  }


}
