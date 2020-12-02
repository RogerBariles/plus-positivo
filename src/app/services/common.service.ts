import { Injectable } from '@angular/core';
import { Opiniones } from '@models/opinion';
import { People } from '@models/people';

@Injectable({ providedIn: 'root' })
export class CommonService {

    personaAEvaluar: People;
    personaLogueada: People;

    opinionCompetencyPrs: any;

    constructor() { }

    clean() {
        this.personaAEvaluar = new People();
        this.personaLogueada = new People();
    }

    setOpinionCompetencyPrs(opinionCompPrs) {
        this.opinionCompetencyPrs = opinionCompPrs;
    }

    getOpinionCompetencyPrs() {
        return this.opinionCompetencyPrs;
    }

    setPersonaLogueada(personaLogueada) {
        this.personaLogueada = personaLogueada;
    }

    getPersonaLogueada() {
        return this.personaLogueada;
    }

    setPersonaAEvaluar(personaAEvaluar) {
        this.personaAEvaluar = personaAEvaluar;
    }

    getPersonaAEvaluar() {
        return this.personaAEvaluar;
    }

}