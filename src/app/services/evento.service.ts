import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { RespuestaEventos, Evento, RespuestaTejido } from '../interfaces/interfaces';
import { environment } from '../../environments/environment.prod';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  pasarUnido = new EventEmitter<Evento>();

  constructor( private http: HttpClient, private usuarioService: UsuarioService ) { }

  getEventos() {

    const headers = new HttpHeaders({
      
      'x-token': this.usuarioService.token  // recoge el token del usuario

    });

    return this.http.get<RespuestaEventos>(`${URL}/eventos/obtenerEventosWEB`, {headers});

  }

  crearEvento( evento ) {

    /* const data = { nombre: evento.nombre, pregunta: evento.pregunta, maxEnlaces: evento.maxEnlaces } */

    const headers = new HttpHeaders({
      
      'x-token': this.usuarioService.token

    });


    return new Promise ( resolve => {

      this.http.post(`${URL}/eventos/crearEventoWEB`, evento , {headers})
      .subscribe( resp => {  
        
        /* this.pasarEvento.emit( resp['evento'] );  */
        resolve(true);

      });

    });
  
  }

  verEvento( tejido: string ) {

    const data = { tejido };

    return this.http.post<RespuestaTejido>(`${URL}/eventos/vertejido`, data);
  
  }

  unirseEvento( idEvento ){

    return new Promise ( resolve => {

      this.http.post(`${URL}/eventos/unirseEvento`, idEvento)
      .subscribe( resp => { 

         if ( resp['ok'] ) {
          this.pasarUnido.emit( resp['evento'] );
          resolve(true);
        } else {
          resolve(false);
        } 

      });

    });
    
  }

   //Borrar Evento
   borrarEvento( evento ){

    const headers = new HttpHeaders({
      
      'x-token': this.usuarioService.token  // recoge el token del usuario

    });

    return new Promise ( resolve => {

      this.http.post(`${URL}/eventos/borrarEventoWEB`, evento, {headers})  // INSERCION EN BD 1- la url 2- la data que enviara 3- los headers(token)
      .subscribe( resp => {  // es para ver el evento creado en la consola xd
        
        if ( resp['ok'] ) {
          resolve(true);
        } else {
          resolve(false);
        }

      });

    });

  }

//ULTIMOS EVENTOS
  ultimosEventos() {

    const headers = new HttpHeaders({
      
      'x-token': this.usuarioService.token  // recoge el token del usuario

    });

    return this.http.get<RespuestaEventos>(`${URL}/eventos/ultimosEventos`, {headers});

  }


}
