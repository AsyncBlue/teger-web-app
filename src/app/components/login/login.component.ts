import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  loginUser = {
    email: '',
    password: ''
  };

  registerUser: Usuario = {
    email: '',
    nombre: '',
    apellido: '',
    password: '',
    avatar: 'av-1.png'
  };

  durationInSeconds = 3;

  constructor( private usuarioService: UsuarioService, private router: Router, private _snackBar: MatSnackBar ) { }

  ngOnInit(): void {

  }

   async login(fLogin: NgForm) {
 
    if (this.emailFormControl.hasError('email')) {
      
      this._snackBar.open('Correo electronico invalido', '', {
        duration: 3000
      });

    } else {

    if ( fLogin.invalid ) { return; }

    const valido = await this.usuarioService.login( this.loginUser.email, this.loginUser.password );

    if ( valido ) {
      this.router.navigate(['/dashboard/inicio']);
    } else {
      this._snackBar.open('Correo y/o Contraseña no son correctos', '', {
        duration: 3000
      });
    }

  }

  } 

  async registro(fRegistro: NgForm) {

     if (this.emailFormControl.hasError('email')) {
      
      this._snackBar.open('Correo electronico invalido', '', {
        duration: 3000
      });

    } else {

      if ( fRegistro.invalid ) { return; }

      this.registerUser.nombre = this.PrimeraMayuscula(this.registerUser.nombre);
      this.registerUser.apellido = this.PrimeraMayuscula(this.registerUser.apellido);

      const valido = await this.usuarioService.registro( this.registerUser );

      if ( valido ) {

        this.router.navigate(['/dashboard/inicio']);

        this._snackBar.open('Te has registrado correctamente', '', {
          duration: 3000
        });

      } else {
      
        this._snackBar.open('Correo electronico ya se encuentra registrado', '', {
          duration: 3000
        });

      }

    }

  }

  PrimeraMayuscula(string){
    return string.charAt(0).toUpperCase() + string.slice(1); 
   }

}
