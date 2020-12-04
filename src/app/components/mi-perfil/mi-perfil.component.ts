import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertDatosComponent } from '../alert-datos/alert-datos.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertPassComponent } from '../alert-pass/alert-pass.component';
import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';



@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

     //FLEX-LAYOUT
     mediaSub: Subscription;
     deviceXs: boolean;
     deviceMd: boolean;
     deviceSm: boolean;
     deviceLg: boolean;
     deviceXl: boolean;
     // -------------

  usuario: Usuario = {};

  newPass = {
    pass1: '',
    pass2: ''
  }

  durationInSeconds = 3;

  constructor( private usuarioService: UsuarioService, public dialog: MatDialog, private _snackBar: MatSnackBar, public mediaObserver: MediaObserver ) { }

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

  }

  actualizar( fActualizar: NgForm ) {

    if ( fActualizar.invalid ) { return; }
    
    const dialogRef = this.dialog.open(AlertDatosComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if( result===true ) {
        this.usuarioService.actualizarUsuario( this.usuario );

        this._snackBar.open('Datos Actualizados Correctamente', '', {
          duration: 3000
        });
        
      }
    });
    
  
  }

  async actualizarPass( fActualizarPass: NgForm ) {

    if ( fActualizarPass.invalid ) { return; }

    if ( this.newPass.pass1 === this.newPass.pass2 ) {

      const dialogRef = this.dialog.open(AlertPassComponent);

      dialogRef.afterClosed().subscribe(result => {

        if( result===true ) {

          this.usuario.password = this.newPass.pass1;

          this.usuarioService.actualizarContraseña( this.usuario);

          this._snackBar.open('Contraseña Actualizada Correctamente', '', {
            duration: 3000
          });

        }

      });

    } else {

      this._snackBar.open('Error al actualizar, al parecer las nuevas contraseñas no son iguales', '', {
        duration: 3000
      });

    }
    
    

  }

  guardaNuevoAvatar(newAvatar) {
    this.usuario.avatar = newAvatar;
    this.usuarioService.actualizarUsuario( this.usuario );
  }


}
