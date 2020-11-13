import { Users } from "../models/user";

export class People extends Users {
    id: number;
    codigoPrs: string;
    apellidosPrs: string;
    nombresPrs: string;
    nacimientoPrs: string;
    imagenPrs: string;
    imagenPrsContentType: string;
    tipo: Tipo;
    lider: Lider;
    liderados:  Liderados[];
    organizacion: Organizacion;
    puesto: Puesto;
}

export class Liderados {
    
}

export class Lider {
    
}

export class TipoOrg {
    abrevTpOrg: string;
    codigoTpOrg: string;
    descTpOrg: string;
    id: number
}

export class Tipo {
    abrevTpPrs: string;
    codigoTpPrs: string;
    descTpPrs: string;
    id: number
}

export class Organizacion {
    abrevOrg: string;
    codigoOrg: string;
    descOrg: string;
    id: number;
    tipo: TipoOrg;
}

export class Puesto {
    abrevPue: string;
    codigoPue: string;
    descPue: string;
    finPue: string;
    id: number;
    inicioPue: string;
}
