import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';

import { Compentency, CompetencyOpinions } from '@models/competency';
import { People } from '@models/people';

import { CommonService } from '@services/common.service';
import { CompetencyService } from '@services/competency.service';
import { OpinionsCompetencyService } from '@services/opinions-competency.service';
import { PersonsService } from '@services/persons.service';

@Component({
    selector: 'ns-competencyAssessment',
    templateUrl: 'competency-assessment.component.html',
    styleUrls: ['competency-assessment.component.css']
})

export class CompetencyAssessmentComponent implements OnInit {

    validCompetencia: boolean;
    loadCompetencia: boolean;
    peopleEvaluated: People;
    peopleEvaluatedImg: string;
    competencias: Compentency[];
    competencia: CompetencyOpinions;
    spinner: boolean;
    idUserEvaluar: number;
    stars = [1, 2, 3, 4, 5];

    constructor(
        private router: RouterExtensions,
        private routerActivated: ActivatedRoute,
        private personsService: PersonsService,
        private commonService: CommonService,
        private competencyService: CompetencyService,
        private opinionsCompetencyService: OpinionsCompetencyService
    ) {
        this.validCompetencia = true;
        this.loadCompetencia = true;
        this.spinner = true;
        this.idUserEvaluar = this.routerActivated.snapshot.params.idUser;
        this.loadComp();
    }

    ngOnInit() {
        this.getPersonaEvaluada();
        this.getAllCompetenciaOpinions();

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
    //  set color a las estrellas cuando se haga la seleccion 
    //  correspondiente de estrellas
    // ------------------------------------------------------------
    colorStar(number, indiceCompetencia?) {
        if (number != 0) {
            this.validCompetencia = false;
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
        let valid
        if (!this.validCompetencia) {

            this.competencias.forEach(unaCompetencia => {
                if (unaCompetencia.numberStar) {

                    // const json = {
                    //     competencia:,
                    //     estrellasOpiCom:,
                    //     id:,
                    //     opinion:,
                    //     status: ,
                    // }

                    // this.opinionsCompetencyService.updateOpinionCompetencias().subscribe(
                    //     (next) => {

                    //     },
                    //     error => {

                    //     }
                    // );
                }
            });

        } else {

        }

    }

    // ----------------------------------------------------------------
    // metodo para obtener las competencias y validar si estan vigentes 
    // ----------------------------------------------------------------
    getAllCompetenciaOpinions() {
        this.competencias = [];
        this.competencyService.getAllCompetenciaOpinions().subscribe(
            (next: CompetencyOpinions) => {
                if (next) {
                    this.competencia = next;

                    this.competencyService.getAllVigentes().subscribe(
                        (resp: CompetencyOpinions[]) => {

                            resp.forEach(unResp => {
                                if (unResp.competencia1.status == "ACTIVE") {
                                    this.competencias.push({
                                        ...next[0].competencia1,
                                        stars: ['white', 'white', 'white', 'white', 'white', 'white'],
                                        numberStar: null
                                    });
                                }

                                if (unResp.competencia2.status == "ACTIVE") {
                                    this.competencias.push({
                                        ...next[0].competencia2,
                                        stars: ['white', 'white', 'white', 'white', 'white', 'white'],
                                        numberStar: null
                                    });
                                }

                                if (unResp.competencia3.status == "ACTIVE") {
                                    this.competencias.push({
                                        ...next[0].competencia3,
                                        stars: ['white', 'white', 'white', 'white', 'white', 'white'],
                                        numberStar: null
                                    });
                                }

                                if (unResp.competencia4.status == "ACTIVE") {
                                    this.competencias.push({
                                        ...next[0].competencia4,
                                        stars: ['white', 'white', 'white', 'white', 'white', 'white'],
                                        numberStar: null
                                    });
                                }

                                if (unResp.competencia5.status == "ACTIVE") {
                                    this.competencias.push({
                                        ...next[0].competencia5,
                                        stars: ['white', 'white', 'white', 'white', 'white', 'white'],
                                        numberStar: null
                                    });
                                }

                                if (unResp.competencia6.status == "ACTIVE") {
                                    this.competencias.push({
                                        ...next[0].competencia6,
                                        stars: ['white', 'white', 'white', 'white', 'white', 'white'],
                                        numberStar: null
                                    });
                                }

                            })

                        }, error => {

                        }
                    )
                }
                this.loadCompetencia = false;
            }, error => {

            });
    }

}