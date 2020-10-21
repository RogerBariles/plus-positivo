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
    finPue: Date;
    id: number;
    inicioPue: Date;
}
