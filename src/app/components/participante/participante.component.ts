import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario, Tejido } from '../../interfaces/interfaces';
import {MatDialog} from '@angular/material/dialog';
import { AlertBorrarUsuarioComponent } from '../alert-borrar-usuario/alert-borrar-usuario.component';

@Component({
  selector: 'app-participante',
  templateUrl: './participante.component.html',
  styleUrls: ['./participante.component.css']
})
export class ParticipanteComponent implements OnInit {

  @Input() participante: Usuario = {};
  @Input() usuarioTejido = '';
  @Input() usuario: Usuario = {};
  @Output() participanteBorrado = new EventEmitter();
  @Input() activo: boolean;

  constructor( public dialog: MatDialog ) { }

  ngOnInit(): void {

  }

  async borrarParticipante() {
    
      const dialogRef = this.dialog.open(AlertBorrarUsuarioComponent);
  
      dialogRef.afterClosed().subscribe(result => {

        if ( result === true) {

          this.participanteBorrado.emit(this.participante);

        }
        
      });  

  }

}
