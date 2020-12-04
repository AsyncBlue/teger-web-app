import { Injectable } from '@angular/core';
import { RespuestaUsuarioDiferente, Usuario } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  usuario: Usuario = {};

  constructor( private http: HttpClient, private router: Router ) { }

  login( email: string, password: string ) {

    const data = { email, password };

    return new Promise( resolve =>{

      this.http.post(`${URL}/user/login`, data).subscribe( async resp =>{
        console.log(resp);
  
        if ( resp['ok'] ) {
          await this.guardarToken( resp['token'] );
          resolve(true);
        } else {
          this.token = null;
          localStorage.clear(); // borra todo lo que este grabado en el storage
          resolve(false);
        }
  
      });

    });

  }

  async guardarToken( token: string ){

    this.token = token;
    await localStorage.setItem('token', token);

    await this.validaToken();

  }

  async validaToken(): Promise<boolean> {

    await this.cargarToken();

    if ( !this.token ) {
      this.router.navigate(['/login']);
      return Promise.resolve(false);
    }

    return new Promise<boolean>( resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${URL}/user/`, { headers }).subscribe( resp => {

        if ( resp['ok'] ) {
          this.usuario = resp['usuario'];
          resolve(true);
        } else {
          this.router.navigate(['/login']);;
          resolve(false);
        }

      });

    });

  }

  async cargarToken() {

    this.token = await localStorage.getItem('token') || null;

  }

  logout() {

    this.token = null; // limpia el token
    this.usuario = null; // limpia el usuario
    localStorage.clear(); // limpia el storage
    this.router.navigate(['/home']);

  }


  getUsuario() {

    if (!this.usuario._id) {
      this.validaToken();
    }

    return { ...this.usuario };

  }

  actualizarUsuario( usuario: Usuario ) {

    const headers = new HttpHeaders( {
      'x-token': this.token
    });

    return new Promise( resolve => {

      this.http.post(`${URL}/user/update`, usuario, { headers }).subscribe( resp => {

        if ( resp['ok'] ) {
          this.guardarToken( resp['token'] );
          resolve(true);
        } else {
          resolve(false);
        }
  
      });

    });

  }

  actualizarContraseña( usuario: Usuario) {


    const headers = new HttpHeaders( {
      'x-token': this.token
    });

    return new Promise( resolve => {

      this.http.post(`${URL}/user/updatePass`, usuario, { headers }).subscribe( resp => {

        if ( resp['ok'] ) {
          this.guardarToken( resp['token'] );
          resolve(true);
        } else {
          resolve(false);
        }
  
      });

    });

  }

  registro( usuario: Usuario ) {

    return new Promise( resolve => {

      this.http.post(`${URL}/user/create`, usuario).subscribe( async resp =>{

        console.log(resp);

        if ( resp['ok'] ) {
          await this.guardarToken( resp['token'] );
          resolve(true);
        } else {
          this.token = null;
          localStorage.clear(); // borra todo lo que este grabado en el storage
          resolve(false);
        }
         
      });

    });

  }

//VER USUARIO DIFERENTE
  verUsuarioDiferente( usuario ) {

    const data = { usuario: usuario };

    return this.http.post<RespuestaUsuarioDiferente>(`${URL}/user/verUsuarioDiferente`, data);
  
  }


}
