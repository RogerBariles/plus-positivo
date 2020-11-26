import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Compentency, CompetencyOpinions } from '@models/competency';
import { People } from '@models/people';
import { Estrellas } from '@models/competencia-opinion';

import { RouterExtensions } from '@nativescript/angular';
import { CommonService } from '@services/common.service';
import { CompetencyService } from '@services/competency.service';
import { PersonsService } from '@services/persons.service';

@Component({
    selector: 'ns-competencyAssessment',
    templateUrl: 'competency-assessment.component.html',
    styleUrls: ['competency-assessment.component.css']
})

export class CompetencyAssessmentComponent implements OnInit {

    loadCompetencia: boolean;
    peopleEvaluated: People;
    peopleEvaluatedImg: string;
    competencias: Compentency[];
    competencia: CompetencyOpinions;
    spinner: boolean;
    color: string[];
    idUserEvaluar: number;
    stars = [1, 2, 3, 4, 5];

    selectedStar: number = 0;

    constructor(
        private router: RouterExtensions,
        private routerActivated: ActivatedRoute,
        private personsService: PersonsService,
        private commonService: CommonService,
        private competencyService: CompetencyService
    ) {
        this.loadCompetencia = true;
        this.spinner = true;
        this.color = [];
        this.idUserEvaluar = this.routerActivated.snapshot.params.idUser;
        this.loadComp();
    }

    ngOnInit() {
        this.getPersonaEvaluada();
        this.getAllCompetenciaOpinions();
        this.color.length = 5;

        this.colorStar(0);
        this.spinner = false;
    }

    loadComp() {
    }

    // ------------------------------------------------------------
    //obtenemos datos de la persona a evaluar desde Common service para visualizar los datos
    // ------------------------------------------------------------
    getPersonaEvaluada() {
        this.peopleEvaluated = this.commonService.personaAEvaluar;
        this.peopleEvaluatedImg = "data:" + this.peopleEvaluated.imagenPrsContentType + ";base64," + this.peopleEvaluated.imagenPrs;
    }

    get canGoBack() {
        return this.router.canGoBack();
    }

    // ------------------------------------------------------------
    //correspondiente al boton de regreso (lado izquierdo del actionBar)
    // ------------------------------------------------------------
    onGoBack() {
        this.router.backToPreviousPage();
    }


    // ------------------------------------------------------------
    //  set color a las estrellas ya sea cuando se inicializa
    //  el componente o cuando se haga la seleccion correspondiente
    // ------------------------------------------------------------
    colorStar(number, indiceCompetencia?) {
        if (number == 0) {
            for (let i = 0; i < 6; i++) {
                this.color[i] = "white";
            }
        } else {
            for (let i = 0; i < 6; i++) {
                if (i <= number) {
                    this.competencias[indiceCompetencia].stars[i] = 'yellow';
                } else {
                    this.competencias[indiceCompetencia].stars[i] = 'white';
                }
            }
            this.competencias[indiceCompetencia].numberStar = number;
        }
    };

    // -------------------------------------
    //funcio del boton enviar
    // -------------------------------------
    onEnviar() {

    }

    // -------------------------------------
    // metodo para obtener las competencias
    // -------------------------------------
    getAllCompetenciaOpinions() {
        this.competencias = [];
        this.competencyService.getAllCompetenciaOpinions().subscribe(
            (next: CompetencyOpinions) => {
                if (next) {
                    let stars: Estrellas;
                    this.competencia = next;

                    this.competencias.push({
                        ...next[0].competencia1,
                        stars: ['white', 'white', 'white', 'white', 'white', 'white'],
                        numberStar: null
                    });
                    this.competencias.push({
                        ...next[0].competencia2,
                        stars: ['white', 'white', 'white', 'white', 'white', 'white'],
                        numberStar: null
                    });
                    this.competencias.push({
                        ...next[0].competencia3,
                        stars: ['white', 'white', 'white', 'white', 'white', 'white'],
                        numberStar: null
                    });
                    this.competencias.push({
                        ...next[0].competencia4,
                        stars: ['white', 'white', 'white', 'white', 'white', 'white'],
                        numberStar: null
                    });
                    this.competencias.push({
                        ...next[0].competencia5,
                        stars: ['white', 'white', 'white', 'white', 'white', 'white'],
                        numberStar: null
                    });
                    this.competencias.push({
                        ...next[0].competencia6,
                        stars: ['white', 'white', 'white', 'white', 'white', 'white'],
                        numberStar: null
                    });
                }
                this.loadCompetencia = false;
            }, error => {

            });
    }

}