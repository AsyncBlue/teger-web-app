import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Evento, Usuario } from '../../interfaces/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { AlertBorrarEventoComponent } from '../alert-borrar-evento/alert-borrar-evento.component';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  @Input() evento: Evento = {};
  @Input() usuario: Usuario = {};
  @Output() eventoBorrado = new EventEmitter<Evento>();

  constructor( public dialog: MatDialog ) { }

  ngOnInit(): void {
  }

  borrarEvento() {

    const dialogRef = this.dialog.open(AlertBorrarEventoComponent);

    dialogRef.afterClosed().subscribe(result => {

      if( result===true ) {

        this.eventoBorrado.emit(this.evento);
        
      }

    });
    

  }


}
