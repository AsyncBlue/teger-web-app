export interface Usuario {
    avatar?: string;
    _id?: string;
    nombre?: string;
    apellido?: string;
    email?: string;
    password?: string;
    /* checked?: boolean; */
  }

export interface Evento {
   _id?: string;
   nombre?: string;
   pregunta?: string;
   usuario?: Usuario;
   created?: string;
}

 export interface Tejido {
  _id?: string;
  evento?: Evento;
  participantes?: Usuario[];
  votos?: [];
  activo?: boolean;
  usuario?: string;
  enlaces?: boolean;
  maxEnlaces?: number;
}

export interface RespuestaEventos {
  ok: boolean;
  /* pagina: number; */
  eventos: Evento[];
}

export interface RespuestaTejido {
  ok: boolean;
  evento: Evento;
}

export interface RespuestaTejidoCreado {
  ok: boolean;
  tejido: Tejido;
}

export interface RespuestaTejidosss {
  ok: boolean;
  eventosFinal: string[];
}

export interface RespuestaUsuarioDiferente {
  ok: boolean;
  usuario: Usuario;
}