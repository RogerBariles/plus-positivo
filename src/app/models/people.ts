import { Users } from "../models/user";

export class People extends Users {
    id: number;
    codigoPrs: string;
    apellidosPrs: string;
    nombresPrs: string;
    nacimientoPrs: any;
    imagenPrs: string;
    imagenPrsContentType: string;
    tipo: Tipo;
    lider: any;
    liderados: any;
    organizacion: Organizacion;
    puesto: Puesto;
}

export class Tipo {}

export class Organizacion {}

export class Puesto {}
