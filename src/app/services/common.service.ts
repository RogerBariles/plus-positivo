import { Injectable } from '@angular/core';
import { People } from '@models/people';

@Injectable({ providedIn: 'root' })
export class CommonService {

    personaAEvaluar: People;
    personaLogueada: People;

    constructor() { }

    clean() {
        this.personaAEvaluar = new People();
        this.personaLogueada = new People();
    }

}