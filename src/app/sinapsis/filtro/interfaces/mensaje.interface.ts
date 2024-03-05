
export interface sendFilter {
    estado: number;
    estadoEnvio: number;
    fechaHoraEnvio: Date;
    cliente : number;
}

export interface Mensaje {
    id:             number;
    estadoEnvio:    number;
    fechaHoraEnvio: Date;
    mensaje:        string;
    estado:         number;
    campania:       Campania;
}

export interface Campania {
    id:      number;
    nombre:  string;
    usuario: Usuario;
}

export interface Usuario {
    id:      number;
    usuario: string;
    cliente: Cliente;
}

export interface Cliente {
    id:     number;
    nombre: string;
}


