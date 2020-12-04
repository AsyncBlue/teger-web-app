import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario, Evento } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EventoService } from '../../services/evento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TejidoService } from '../../services/tejido.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, OnDestroy {

  //FLEX-LAYOUT
  mediaSub: Subscription;
  deviceXs: boolean;
  deviceMd: boolean;
  deviceSm: boolean;
  deviceLg: boolean;
  deviceXl: boolean;
  // -------------

  ultimosEventos: Evento[] = [];

  unido: Evento = {};

  eventoID = {
    _id: ''
  }


  evento = {
    nombre: '',
    pregunta: '',
    maxEnlaces: Number
  };

  usuario: Usuario = {};

  eventoMomentaneo: Evento = {};

  ultimosUnidos: Evento[] = [];

  constructor( private usuarioService: UsuarioService, private router: Router, private eventosService: EventoService, private _snackBar: MatSnackBar, private tejidoService: TejidoService, public mediaObserver: MediaObserver ) { }

  ngOnInit(): void {

    // FLEX-LAYOUT
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias);
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
      this.deviceMd = result.mqAlias === 'md' ? true : false;
      this.deviceSm = result.mqAlias === 'sm' ? true : false;
      this.deviceLg = result.mqAlias === 'lg' ? true : false;
      this.deviceXl = result.mqAlias === 'xl' ? true : false;
    });
    //------------

    this.usuario = this.usuarioService.getUsuario();

    this.eventosService.ultimosEventos().subscribe( resp => {

      this.ultimosEventos.push( ...resp.eventos );

    });

    
    this.tejidoService.getTejidos().subscribe( resp => {

      resp.eventosFinal.forEach(element => {

        this.eventosService.verEvento(element).subscribe( evento => {

          this.usuarioService.verUsuarioDiferente(evento.evento.usuario).subscribe( user => {

            this.eventoMomentaneo = evento.evento;
          
            this.eventoMomentaneo.usuario = user.usuario

           /*   */

            this.ultimosUnidos.push(this.eventoMomentaneo);

          });

        });

      });  

    });

  }

  async crearEvento(fCrearEvento: NgForm) {

    if ( fCrearEvento.invalid ) { return; }
   
    const valido = await this.eventosService.crearEvento( this.evento );

    if ( valido ) {
      this.router.navigate(['/dashboard/mis-tejidos']);

      this._snackBar.open('Tejido Creado!', '', {
        duration: 3000
      });

    }

  }

  unirseEvento(fUnirseEvento: NgForm){

    if ( fUnirseEvento.invalid ) { return; }

    this.eventosService.verEvento(this.eventoID._id).subscribe( resp => {

      this.tejidoService.verTejido(resp.evento._id).subscribe( resp => {

          if ( resp.tejido.activo === true && resp.tejido.enlaces === false) {

            this.eventosService.unirseEvento( this.eventoID );

            this.eventoID = {
              _id: ''
            };

            this.eventosService.pasarUnido.subscribe( evento =>{

              this.unido = evento
              this.router.navigate(['/dashboard/tejido', this.unido._id]);
         
              });
        
              this._snackBar.open('Te has unido al tejido!', '', {
                duration: 3000
              });  
        
            
          } else {

            this._snackBar.open('El tejido ya ha sido finalizado oh ya inicio seleccion de enlaces. No puedes entrar', '', {
              duration: 5000
            });  

          }
  
  
      });

    });


   

  }

  ngOnDestroy(): void {

    this.mediaSub.unsubscribe();

  }

}
