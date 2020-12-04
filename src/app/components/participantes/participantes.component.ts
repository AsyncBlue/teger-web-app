import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario, Tejido } from '../../interfaces/interfaces';
import { TejidoService } from '../../services/tejido.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';


@Component({
  selector: 'app-participantes',
  templateUrl: './participantes.component.html',
  styleUrls: ['./participantes.component.css']
})
export class ParticipantesComponent implements OnInit {

  @Input() participantes: Usuario[] = [];
  @Input() tejido: Tejido = {};
  @Input() usuario: Usuario = {};
  @Input() activo: boolean;

         //FLEX-LAYOUT
         mediaSub: Subscription;
         deviceXs: boolean;
         deviceMd: boolean;
         deviceSm: boolean;
         deviceLg: boolean;
         deviceXl: boolean;
         // -------------


  constructor( private tejidoService: TejidoService, private _snackBar: MatSnackBar, public mediaObserver: MediaObserver ) { }

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

  }

  borrarParticipante(participante) {

    var index = this.participantes.map(participante => participante).indexOf(participante);
    this.participantes.splice(index,1);

    this.tejidoService.borrarParticipante(participante, this.tejido._id);

    this._snackBar.open('Participante Eliminado', '', {
      duration: 3000
    });

  }

}
