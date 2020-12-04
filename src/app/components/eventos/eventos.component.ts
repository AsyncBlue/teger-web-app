import { Component, OnInit, Input } from '@angular/core';
import { Evento, Usuario } from '../../interfaces/interfaces';
import { EventoService } from '../../services/evento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  @Input() eventos: Evento[] = [];
  @Input() usuario: Usuario = {};

   //FLEX-LAYOUT
   mediaSub: Subscription;
   deviceXs: boolean;
   deviceMd: boolean;
   deviceSm: boolean;
   deviceLg: boolean;
   deviceXl: boolean;
   // -------------

  constructor( private eventosServices: EventoService, private _snackBar: MatSnackBar, public mediaObserver: MediaObserver ) { }

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

    console.log(this.eventos);

  }

  procesaEvento(evento) {

    var index = this.eventos.map(evento => evento).indexOf(evento);
    this.eventos.splice(index,1);
    
    const borrado = this.eventosServices.borrarEvento( evento );
    
    this._snackBar.open('Tejido eliminado', '', {
      duration: 3000
    });

  }


}
