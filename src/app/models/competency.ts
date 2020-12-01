export class Compentency {
    abrevCom: string; //max.length = 50;
    codigoCom: string; //max-length = 20;
    descCom: string; //max-length = 200;
    id: number;
    status: string;
    tipo?: CompentencyType;
    stars?: string[];
    numberStar?: number;
}

export class CompentencyType {
    abrevTpCom: string; // max-length: 50
    codigoTpCom: string; //maxi-length:20
    descTpCom: string; //max-length: 200
    id: number;
}

export class CompetencyOpinions {
    abrevCOp: string;
    codigoCOp: string;
    competencia1: Compentency;
    competencia2: Compentency;
    competencia3: Compentency;
    competencia4: Compentency;
    competencia5: Compentency;
    competencia6: Compentency;
    descCOp: string;
    finCOp: string;
    id: number;
    inicioCOp: string;
}

export class OpinionCompetency {
    competencia?: Compentency;
    estrellasOpiCom: number;
    id?: number;
    opinion: {};
    status?: string;
}