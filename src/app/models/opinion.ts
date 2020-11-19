import { Compentency } from "@models/competency";
import { People } from "@models/people";

export class Context {
    abrevCtx: string;
    codigoCtx: string;
    descCtx: string;
    id: number;
    tipo: TipoCtx;
}

export class TipoCtx {
    abrevTpCtx: string;
    codigoTpCtx: string;
    descTpCtx: string;
    id: number;
}

export class Promedios {
    promUser: number;
    promLiderados: number;
}

export class Opiniones {
    comentarioOpi: string;
    contexto: Context;
    criterioOpi: number;
    estrellasOpi: number;
    fechaOpi: string;
    id: number;
    opinado: People;
    opinante: People;
    resultados: Result[];
}

export class Result {
    competencia: Compentency;
    fechaRes: string;
    id: number;
    opinion: any;
    valorRes: number;
}
