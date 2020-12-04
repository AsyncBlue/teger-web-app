import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ɵConsole } from '@angular/core';
import { Evento, Usuario, Tejido } from '../../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from '../../services/evento.service';
import { UsuarioService } from '../../services/usuario.service';
import { TejidoService } from '../../services/tejido.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertGuardarVotosComponent } from '../alert-guardar-votos/alert-guardar-votos.component';
import { MatDialog } from '@angular/material/dialog';
import { NetworkgraphComponent } from '../networkgraph/networkgraph.component';
import { AlertEnlacesComponent } from '../alert-enlaces/alert-enlaces.component';
import { AlertIniciarEnlacesComponent } from '../alert-iniciar-enlaces/alert-iniciar-enlaces.component';
import { AlertEventoFinalizadoComponent } from '../alert-evento-finalizado/alert-evento-finalizado.component';
import { Router } from '@angular/router';
import { AlertExpulsarUsuarioComponent } from '../alert-expulsar-usuario/alert-expulsar-usuario.component';
import { AlertSalirSinFinalizarComponent } from '../alert-salir-sin-finalizar/alert-salir-sin-finalizar.component';
import { element } from 'protractor';
import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';


@Component({
  selector: 'app-tejido',
  templateUrl: './tejido.component.html',
  styleUrls: ['./tejido.component.css']
})
export class TejidoComponent implements OnInit, OnDestroy {

  @ViewChild(NetworkgraphComponent) networkgraph: NetworkgraphComponent;

       //FLEX-LAYOUT
       mediaSub: Subscription;
       deviceXs: boolean;
       deviceMd: boolean;
       deviceSm: boolean;
       deviceLg: boolean;
       deviceXl: boolean;
       // -------------
 
  tejido: Tejido = {};

  eventoID = '';

  evento: Evento = {};

  usuario: Usuario = {};

  participantes = [];

  activo: boolean;

  dataGraf = [];

  usuarioVoto: boolean = false;

  enlaces: boolean = false;

  aceptarEnlaces: boolean = false;

  finTejido: boolean = false;

  destruido: boolean = false;

  creadorParticipando: boolean = false;

  existe: boolean;

  duenoDelTejido: Usuario = {};

  votos = [];

  maxEnlaces: number;



  constructor( private activatedRoute: ActivatedRoute, private eventosService: EventoService, private usuarioService: UsuarioService, private tejidoService: TejidoService, private _snackBar: MatSnackBar, public dialog: MatDialog, private router: Router, public mediaObserver: MediaObserver ) { }

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

    this.destruido = false;

    this.eventoID = this.activatedRoute.snapshot.paramMap.get('_id');

    this.verEvento(this.eventoID);

    this.usuario = this.usuarioService.getUsuario();

    this.verTejido(this.eventoID);

   
      setInterval( () => {

        if ( this.activo === true && this.enlaces === false && this.destruido === false) {

            this.tejidoService.verTejido(this.eventoID).subscribe( resp => {
              
              this.participantes = resp.tejido.participantes;

              this.activo = resp.tejido.activo;

              this.enlaces = resp.tejido.enlaces;

              //SACAR PARTICIPANTE DEL TEJIDO
              /*  if (this.participantes.length === 0 && this.usuario._id != this.tejido.usuario) {

                const dialogRef = this.dialog.open(AlertExpulsarUsuarioComponent);
                this.router.navigate(['/dashboard/inicio']);
                console.log('ARREGLO VACIO');
                
               }
              
               this.participantes.forEach(element => {
                
                if (element._id === this.usuario._id || this.usuario._id === this.tejido.usuario){
                  this.existe = true;
                  console.log('MARCA true')
                  console.log(this.existe);
               
                } 
              });

              if (this.existe === false && this.usuario._id != this.tejido.usuario && this.destruido === false) {
                const dialogRef = this.dialog.open(AlertExpulsarUsuarioComponent);
                this.router.navigate(['/dashboard/inicio']);
                console.log('DISTINTO === TRUE');
              } */

            });  

            

        }

       
        
        if (this.usuario._id != this.tejido.usuario && this.enlaces === true && this.aceptarEnlaces === false && this.activo === true && this.destruido === false){

          const dialogRef = this.dialog.open(AlertEnlacesComponent);
  
          this.aceptarEnlaces = !this.aceptarEnlaces;

        }

        if (this.usuario._id != this.tejido.usuario && this.finTejido === false && this.destruido === false) {

          this.tejidoService.verTejido(this.eventoID).subscribe( resp => {
            
            this.activo = resp.tejido.activo;

          });
          
          if (this.usuario._id != this.tejido.usuario && this.finTejido === false && this.activo === false && this.destruido === false) {

            const dialogRef = this.dialog.open(AlertEventoFinalizadoComponent);
  
            this.finTejido = !this.finTejido;

          }

        }


      }, 3000);

/*     if (this.tejido.votos.length > 0) {

      this.tejido.votos.forEach( (element: any) => {

        if ( element.from === this.usuario.nombre ) {
  
          this.usuarioVoto = !this.usuarioVoto;
  
          console.log('ELEMENT', element.from);
          console.log('USER', this.usuario.nombre);
  
        }
  
      });

    } *//* console.log(this.tejido.votos.length); */

    /* this.votos.forEach( element => { */
     /*  console.log(this.votos); */
    /* }) */


  }

  copyText(val: string){
    let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = val;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);

      this._snackBar.open('Codigo del tejido copiado!', '', {
        duration: 3000
      });

    }

  verEvento(evento) {

    this.eventosService.verEvento(evento).subscribe( resp => {

      this.evento = resp.evento;

    });

  }

  verTejido(eventoID) {

    this.tejidoService.verTejido(eventoID).subscribe( resp => {

      this.tejido = resp.tejido;

      this.activo = resp.tejido.activo;

      this.enlaces = resp.tejido.enlaces;

      this.votos = resp.tejido.votos;

      this.maxEnlaces = resp.tejido.maxEnlaces;

      resp.tejido.votos.forEach( (element: any) => {

        if ( element.from === this.usuario.nombre ) {
  
          this.usuarioVoto = !this.usuarioVoto;
  
        }

      })

      if (this.usuario._id != this.tejido.usuario) {

        this.sumarParticipante(this.usuario, resp.tejido._id);

      }

      this.tejido.participantes.forEach(element => {

        this.participantes.push(element);

      });

      this.usuarioService.verUsuarioDiferente(resp.tejido.usuario).subscribe( user => {

        this.duenoDelTejido = user.usuario;

       });


    });
  }

  sumarParticipante(usuario: Usuario, tejido) {

    this.tejidoService.sumarParticipante(usuario, tejido);

  }


  finalizarTejido(){

    this.activo = !this.activo;

    this.tejidoService.cambiarEstado(this.activo, this.tejido._id);

    this.enlaces = !this.enlaces;

    this._snackBar.open('Finalizaste el tejido. Ve los resultados!', '', {
      duration: 3000
    });


  }

  onLinkClick(event: MatTabChangeEvent) {

    if ( event.tab.textLabel === "Tejido" ) {

      this.networkgraph.updateChart();

    }

  }

  guardarVotos() {

    /* this.tejidoService.guardarVotos(this.dataGraf, this.tejido._id); */

    const dialogRef = this.dialog.open(AlertGuardarVotosComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if( result===true ) {
        
        this.usuarioVoto = !this.usuarioVoto;
        this.tejidoService.guardarVotos(this.dataGraf, this.tejido._id);
      }

    });

  }

  onChange(from, to, participante) {

    let z = {from: from, to: to};
   
    participante.checked = !participante.checked

    if (participante.checked === true) {

      this.dataGraf.push(z);

      if ( this.maxEnlaces < this.dataGraf.length ) {

        this._snackBar.open('Ya seleccionaste el numero maximo de enlaces', '', {
          duration: 3000
        });

      }
   
    } else {

      this.dataGraf.forEach((element,index: number) => {
      
        if (element.to===z.to){
          
          this.dataGraf.splice(index,1);

        }

      });
      
    }
    
  }

  iniciarEnlaces() {

    const dialogRef = this.dialog.open(AlertIniciarEnlacesComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if( result===true ) {
        this.enlaces = !this.enlaces;
        this.tejidoService.iniciarEnlaces(this.enlaces, this.tejido._id)
      }

    });

  }

  creadorUnirse(usuario: Usuario, tejidoID) {

    var participando: Boolean = false;

    if (this.enlaces === false) {

      if (this.participantes.length === 0) {

        this.sumarParticipante(usuario, tejidoID);
  
          this._snackBar.open('Te has unido al tejido', '', {
            duration: 3000
          });

          this.creadorParticipando = !this.creadorParticipando;
  
      }
  
       this.participantes.forEach(element => {
        
         if ( element._id === usuario._id) { 
          
          this._snackBar.open('Ya te encuentras participando en el tejido', '', {
            duration: 3000
          });

          participando = true;
  
         } 
  
      });
      
      if ( participando === false ) {
  
        this.sumarParticipante(usuario, tejidoID);

        this._snackBar.open('Te has unido al tejido', '', {
          duration: 3000
        });

        this.creadorParticipando = !this.creadorParticipando;

       }

    } else {

      this._snackBar.open('Ya inicializaste la seleccion de enlaces. No puedes unirte', '', {
        duration: 4000
      });

    }

    
    
  }


  ngOnDestroy(): void {

    this.destruido = !this.destruido;

    if ( this.activo === true && this.usuario._id === this.tejido.usuario) {

      const dialogRef = this.dialog.open(AlertSalirSinFinalizarComponent);
  
      /* dialogRef.afterClosed().subscribe(result => {
        if( result===true ) {
          this.activo = !this.activo;
          this.tejidoService.cambiarEstado(this.activo, this.tejido._id);
        }

      }); */

    }

  }

  


}
