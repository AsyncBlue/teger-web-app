import { Component, OnInit } from '@angular/core';
import { Evento, Usuario } from '../../interfaces/interfaces';
import { EventoService } from '../../services/evento.service';
import { TejidoService } from '../../services/tejido.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-mis-tejidos',
  templateUrl: './mis-tejidos.component.html',
  styleUrls: ['./mis-tejidos.component.css']
})
export class MisTejidosComponent implements OnInit {

  usuario: Usuario = {};

  eventos: Evento[] = [];

  eventoMomentaneo: Evento = {};

  unidos: Evento[] = [];


  constructor(  private eventosService: EventoService, private tejidoService: TejidoService, private usuarioService: UsuarioService ) { }

  ngOnInit(): void {

    this.usuario = this.usuarioService.getUsuario();

    this.siguientes();

    this.tejidoService.getTejidos().subscribe( resp => {

      resp.eventosFinal.forEach(element => {

        this.eventosService.verEvento(element).subscribe( evento => {

          this.usuarioService.verUsuarioDiferente(evento.evento.usuario).subscribe( user => {

            this.eventoMomentaneo = evento.evento;
          
            this.eventoMomentaneo.usuario = user.usuario

           /*   */

            this.unidos.push(this.eventoMomentaneo);

          });

        });

      });  

    });

  }

  siguientes( event?) {

    this.eventosService.getEventos().subscribe(  resp =>{
      /* console.log(resp); */
      this.eventos.push( ...resp.eventos );


  });

  }


}
