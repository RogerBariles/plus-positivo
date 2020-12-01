import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';

import { Compentency, CompetencyOpinions } from '@models/competency';
import { People } from '@models/people';

import { CommonService } from '@services/common.service';
import { CompetencyService } from '@services/competency.service';
import { OpinionsCompetencyService } from '@services/opinions-competency.service';
import { PersonsService } from '@services/persons.service';
import { OpinionsService } from '@services/opinions.service';
import { Opiniones } from '@models/opinion';
import { OpinionCompetency } from '@models/competency';

@Component({
    selector: 'ns-competencyAssessment',
    templateUrl: 'competency-assessment.component.html',
    styleUrls: ['competency-assessment.component.css']
})

export class CompetencyAssessmentComponent implements OnInit {

    OpinionCompetencyPrs: any;
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
        private opinionService: OpinionsService,
        private commonService: CommonService,
        private competencyService: CompetencyService,
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
        this.OpinionCompetencyPrs = this.commonService.getOpinionCompetencyPrs();

        delete this.OpinionCompetencyPrs.contexto.abrevCtx;
        delete this.OpinionCompetencyPrs.contexto.tipo.abrevTpCtx;
        delete this.OpinionCompetencyPrs.contexto.status;

        delete this.OpinionCompetencyPrs.opinado.imagenPrs;
        delete this.OpinionCompetencyPrs.opinado.imagenPrsContentType;
        delete this.OpinionCompetencyPrs.opinado.lider;
        delete this.OpinionCompetencyPrs.opinado.nombresPrs;
        delete this.OpinionCompetencyPrs.opinado.nacimientoPrs;
        delete this.OpinionCompetencyPrs.opinado.fechaOpi;
        delete this.OpinionCompetencyPrs.opinado.organizacion.abrevOrg;
        delete this.OpinionCompetencyPrs.opinado.status;

        delete this.OpinionCompetencyPrs.opinante.imagenPrs;
        delete this.OpinionCompetencyPrs.opinante.imagenPrsContentType;
        delete this.OpinionCompetencyPrs.opinante.lider;
        delete this.OpinionCompetencyPrs.opinante.nombresPrs;
        delete this.OpinionCompetencyPrs.opinante.nacimientoPrs;
        delete this.OpinionCompetencyPrs.opinante.fechaOpi;
        delete this.OpinionCompetencyPrs.opinante.organizacion.abrevOrg;
        delete this.OpinionCompetencyPrs.opinante.status;

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
        if (!this.validCompetencia) {
            this.loadCompetencia = true;
            const opinionComp: OpinionCompetency[] = [];

            this.competencias.forEach(unaCompetencia => {
                if (unaCompetencia.numberStar) {
                    delete unaCompetencia.stars;
                    opinionComp.push({
                        competencia: unaCompetencia,
                        estrellasOpiCom: unaCompetencia.numberStar,
                        opinion: {},
                    });
                }
            });



            const json: Opiniones = {
                ...this.OpinionCompetencyPrs,
                opinionesCompetencias: opinionComp,
            }

            console.log(this.OpinionCompetencyPrs);
            this.opinionService.newOpinion(json).subscribe(
                (next) => {
                    console.log("trabo bien");

                },
                error => {
                    console.log(error);
                }
            );

        } else {

        }

    }

    // ----------------------------------------------------------------
    // metodo para obtener las competencias (y validar si estan vigentes //lo comentado)
    // ----------------------------------------------------------------
    getAllCompetenciaOpinions() {
        this.competencias = [];
        this.competencyService.getAllCompetenciaOpinions().subscribe(
            (next: CompetencyOpinions) => {
                if (next) {
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

                    // this.competencyService.getAllVigentes().subscribe(
                    //     (resp: CompetencyOpinions[]) => {

                    //         resp.forEach(unResp => {
                    //             if (unResp.competencia1.status == "ACTIVE") {
                    //                 this.competencias.push({
                    //                     ...next[0].competencia1,
                    //                     stars: ['white', 'white', 'white', 'white', 'white', 'white'],
                    //                     numberStar: null
                    //                 });
                    //             }
                    //             if (unResp.competencia2.status == "ACTIVE") {
                    //                 this.competencias.push({
                    //                     ...next[0].competencia2,
                    //                     stars: ['white', 'white', 'white', 'white', 'white', 'white'],
                    //                     numberStar: null
                    //                 });
                    //             }

                    //             if (unResp.competencia3.status == "ACTIVE") {
                    //                 this.competencias.push({
                    //                     ...next[0].competencia3,
                    //                     stars: ['white', 'white', 'white', 'white', 'white', 'white'],
                    //                     numberStar: null
                    //                 });
                    //             }

                    //             if (unResp.competencia4.status == "ACTIVE") {
                    //                 this.competencias.push({
                    //                     ...next[0].competencia4,
                    //                     stars: ['white', 'white', 'white', 'white', 'white', 'white'],
                    //                     numberStar: null
                    //                 });
                    //             }

                    //             if (unResp.competencia5.status == "ACTIVE") {
                    //                 this.competencias.push({
                    //                     ...next[0].competencia5,
                    //                     stars: ['white', 'white', 'white', 'white', 'white', 'white'],
                    //                     numberStar: null
                    //                 });
                    //             }

                    //             if (unResp.competencia6.status == "ACTIVE") {
                    //                 this.competencias.push({
                    //                     ...next[0].competencia6,
                    //                     stars: ['white', 'white', 'white', 'white', 'white', 'white'],
                    //                     numberStar: null
                    //                 });
                    //             }

                    //         })

                    //     }, error => {

                    //     }
                    // )
                }
                this.loadCompetencia = false;
            }, error => {

            });
    }

}