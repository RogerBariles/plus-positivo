import { Component, OnInit } from '@angular/core';
import { Compentency } from '@models/competency';
import { RouterExtensions } from '@nativescript/angular';

@Component({
    selector: 'ns-competencyAssessment',
    templateUrl: 'competency-assessment.component.html',
    styleUrls: ['competency-assessment.component.css']
})

export class CompetencyAssessment implements OnInit {

    competencias: Compentency[];
    spinner: boolean;
    stars = [1, 2, 3, 4, 5];
    color: string[];

    constructor(
        private router: RouterExtensions
    ) {
        this.competencias = [];
        this.spinner = true;
        this.color = [];
    }

    ngOnInit() {
        this.competencias.length = 6;
        this.color.length = 5;
        this.colorStar(0);
        this.spinner = false;
    }

    get canGoBack() {
        return this.router.canGoBack();
    }

    //correspondiente al boton de regreso (lado izquierdo del actionBar)
    onGoBack() {
        this.router.backToPreviousPage();
    }

    //  set color a las estrellas ya sea cuando se inicializa
    //  el componente o cuando se haga la seleccion correspondiente
    colorStar(number) {
        if (number == 0) {
            for (let i = 1; i < 6; i++) {
                this.color[i] = "white";
            }
        } else {
            for (let i = 1; i < 6; i++) {
                if (i <= number) {
                    this.color[i] = 'yellow';
                } else {
                    this.color[i] = 'white';
                }
            }
        }
    };

    //set value of selected star
    countStar(indiceStar, indiceCompetencia) {
        this.colorStar(indiceStar);
    }

    //funcio del boton enviar
    onEnviar() {

    }

}