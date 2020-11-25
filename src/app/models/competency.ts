export class Compentency {
    abrevCom: string; //max.length = 50;
    codigoCom: string; //max-length = 20;
    descCom: string; //max-length = 200;
    id: number;
    tipo: CompentencyType;
    stars?: number[];
}

export class CompentencyType {
    abrevTpCom: string; // max-length: 50
    codigoTpCom: string; //maxi-length:20
    descTpCom: string; //max-length: 200
    id: number;
}