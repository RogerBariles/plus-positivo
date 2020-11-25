import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Compentency } from '@models/competency';
import { People } from '@models/people';
import { RouterExtensions } from '@nativescript/angular';
import { CommonService } from '@services/common.service';
import { PersonsService } from '@services/persons.service';

@Component({
    selector: 'ns-competencyAssessment',
    templateUrl: 'competency-assessment.component.html',
    styleUrls: ['competency-assessment.component.css']
})

export class CompetencyAssessmentComponent implements OnInit {

    peopleEvaluated: People;
    peopleEvaluatedImg: string;
    competencias: Compentency[];
    spinner: boolean;
    //stars = [1, 2, 3, 4, 5];
    color: string[];
    idUserEvaluar: number;

    constructor(
        private router: RouterExtensions,
        private routerActivated: ActivatedRoute,
        private personsService: PersonsService,
        private commonService: CommonService,
    ) {
        this.competencias = [];
        this.competencias.length = 6;
        this.spinner = true;
        this.color = [];
        this.idUserEvaluar = this.routerActivated.snapshot.params.idUser;
        this.loadComp();
    }

    ngOnInit() {
        this.getPersonaEvaluada();
        this.color.length = 5;
        this.colorStar(0);
        this.spinner = false;
    }

    loadComp() {
        // for (let i = 0; i < 6; i++) {
        //     for (let j = 0; j < 6; j++) {
        //         this.competencias[i].stars.push(j + 1);
        //     }
        //     console.log(this.competencias[i].stars)
        // }
    }

    //obtenemos datos de la persona a evaluar desde Common service para visualizar los datos
    getPersonaEvaluada() {
        this.peopleEvaluated = this.commonService.personaAEvaluar;
        this.peopleEvaluatedImg = "data:" + this.peopleEvaluated.imagenPrsContentType + ";base64," + this.peopleEvaluated.imagenPrs;
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
        console.log(indiceCompetencia)
    }

    //funcio del boton enviar
    onEnviar() {

    }

}