import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Evento, Usuario, Tejido, RespuestaTejidoCreado, RespuestaTejidosss } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class TejidoService {

  pasarTejido = new EventEmitter<Tejido>();

  constructor( private http: HttpClient, private usuarioService: UsuarioService ) { }

  /* VER TEJIDO */

  verTejido( eventoID ) {
    
      const data = { eventoID };
  
      return this.http.post<RespuestaTejidoCreado>(`${URL}/tejido/verTejido`, data);
    
  }


  /* SUMAR PARTICIPANTE */
  sumarParticipante( usuario: Usuario, tejido: string ) {

    const data = { usuario: usuario, tejido: tejido };

    return new Promise ( resolve => {

      this.http.post(`${URL}/tejido/sumarParticipanteWEB`, data)
      .subscribe( resp => {  
        
        /* this.pasarEvento.emit( resp['evento'] );  */
        resolve(true);

      });

    });
  
  }


  /* RECORRER TEJIDO */
  recorrerTejido( tejido ) {

   /*  console.log('SERVICE: ', tejido); */

    const data = { tejido: tejido };

    return this.http.post<RespuestaTejidoCreado>(`${URL}/tejido/recorrerTejido`, data);
  
  }

  //BORRAR PARTICIPANTE
  borrarParticipante( participante: Usuario, tejido){

    const data = { usuario: participante, tejido: tejido }

    return new Promise ( resolve => {

      this.http.post(`${URL}/tejido/borrarParticipante`, data)  // INSERCION EN BD 1- la url 2- la data que enviara 3- los headers(token)
      .subscribe( resp => {  // es para ver el evento creado en la consola xd
        
        if ( resp['ok'] ) {
          resolve(true);
        } else {
          resolve(false);
        }

      });

    });

  }

  //GUARDAR VOTOS
  guardarVotos( votos, tejido ){

    const data = { votos: votos , tejido: tejido }

    return new Promise ( resolve => {

      this.http.post(`${URL}/tejido/guardarVotos`, data)  // INSERCION EN BD 1- la url 2- la data que enviara 3- los headers(token)
      .subscribe( resp => {  // es para ver el evento creado en la consola xd
        
        if ( resp['ok'] ) {
          resolve(true);
        } else {
          resolve(false);
        }

      });

    });

  }


    /* Cambiar Estado */
    cambiarEstado( estado: boolean, tejido: string ) {

      const data = { activo: estado, tejido: tejido };
  
      return new Promise ( resolve => {
  
        this.http.post(`${URL}/tejido/cambiarEstado`, data)
        .subscribe( resp => {  
          
          /* this.pasarEvento.emit( resp['evento'] );  */
          resolve(true);
  
        });
  
      });
    
    }

    /* INICIAR ENLACES */
    iniciarEnlaces( enlaces: boolean, tejido: string ) {

      const data = { enlaces: enlaces, tejido: tejido };
  
      return new Promise ( resolve => {
  
        this.http.post(`${URL}/tejido/iniciarEnlaces`, data)
        .subscribe( resp => {  
          
          /* this.pasarEvento.emit( resp['evento'] );  */
          resolve(true);
  
        });
  
      });
    
    }

    //VER TEJIDOSSS
    getTejidos() {

      const headers = new HttpHeaders({
        
        'x-token': this.usuarioService.token  // recoge el token del usuario
  
      });
  
      return this.http.get<RespuestaTejidosss>(`${URL}/tejido/verTejidos`, {headers});
  
    }


    //ULTIMOS TEJIDOS
  ultimosTejidos() {

    const headers = new HttpHeaders({
      
      'x-token': this.usuarioService.token  // recoge el token del usuario

    });

    return this.http.get<RespuestaTejidosss>(`${URL}/tejido/ultimosTejidos`, {headers});

  }


}
