import { PersonsService } from "@services/persons.service";
import { Opiniones } from "@models/opinion";
import { People } from "@models/people";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OpinionsService } from "@services/opinions.service";
import { Promedios } from "@models/opinion";
import { RouterExtensions } from "@nativescript/angular";
import { CommonService } from "@services/common.service";
import { SnackBar } from "@nativescript-community/ui-material-snackbar";

@Component({
    selector: "ns-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {

    opiniones: Opiniones[];
    promPeople: Promedios;
    peopleProfile: People;
    idUser: number;
    spinner: boolean;
    snackbar = new SnackBar();



    constructor(
        private routerActivate: ActivatedRoute,
        private personaService: PersonsService,
        private opinionsService: OpinionsService,
        private commonService: CommonService,
        private router: RouterExtensions
    ) {
        this.promPeople = new Promedios();
        this.opiniones = [];
        this.spinner = true;
        this.idUser = this.routerActivate.snapshot.params.idUser;
    }

    ngOnInit() {
        this.getPersons();
    }

    // ----------------------------------------------------------------
    //correspondiente al boton de regreso (lado izquierdo del actionBar)
    // ----------------------------------------------------------------
    onGoBack() {
        this.opiniones = [];
        this.router.backToPreviousPage();
    }

    get canGoBack() {
        return this.router.canGoBack();
    }


    // -----------------------------------------------------------
    // buscamos persona logueada que lo guardamos en commonService
    // -----------------------------------------------------------
    getPersons() {

        this.peopleProfile = this.commonService.getPersonaLogueada();
        this.peopleProfile = this.peopleProfile[0];

        if (!this.peopleProfile) {
            this.snackbar
                .action({
                    message: `Error al obtener usuario`,
                    textColor: "white",
                    actionTextColor: "black",
                    backgroundColor: "red",
                    hideDelay: 2000,
                })
                .then((resp) => {
                    this.spinner = false;
                });
        } else {
            this.spinner = false;
            this.changePromedios(this.peopleProfile.codigoPrs);
        }

    }

    // ---------------------------------------------------------------------------
    //buscamos los promedios con el codigoPrs correspondiente a la persona logueada
    // ---------------------------------------------------------------------------
    changePromedios(codigoPrs) {
        this.opinionsService
            .getOpinionsPromedioUser(codigoPrs)
            .subscribe((next: Promedios) => {
                //recortamos la cantidad de decimales de los promedios
                if (next.promLiderados && next.promUser) {
                    this.promPeople.promLiderados = +next.promLiderados.toFixed(1);
                    this.promPeople.promUser = +next.promUser.toFixed(1);
                } else {
                    this.promPeople.promLiderados = 0;
                    this.promPeople.promUser = 0;
                }
                this.getAllOpinions(this.peopleProfile.id);
            }, error => {
                this.snackbar
                    .action({
                        message: `Error al obtener promedios`,
                        textColor: "white",
                        actionTextColor: "black",
                        backgroundColor: "red",
                        hideDelay: 2000,
                    })
                    .then((resp) => {
                        this.spinner = false;
                    });
            });
    }

    // -----------------------------------------------------------------
    //pedimos las opiniones correspondiente al id de la persona logeada
    // -----------------------------------------------------------------
    getAllOpinions(id) {
        this.opinionsService.getAllOpinionsByOpinadoId(id).subscribe(
            (resp: Opiniones[]) => {
                if (this.opiniones) {

                    resp.forEach(unaOpinion => {
                        unaOpinion.fechaOpi = this.cleanFechaOpinion(unaOpinion.fechaOpi);

                        this.opiniones.push(unaOpinion);
                    })
                } else {
                    this.opiniones = resp;
                    this.opiniones.forEach(anOpinion => {
                        //seteamos nueva estructura para la fecha de la opinion
                        anOpinion.fechaOpi = this.cleanFechaOpinion(anOpinion.fechaOpi);
                    })
                }
            }, error => {
                this.snackbar
                    .action({
                        message: `Error al obtener opiniones`,
                        textColor: "white",
                        actionTextColor: "black",
                        backgroundColor: "red",
                        hideDelay: 2000,
                    })
                    .then((resp) => {
                        this.spinner = false;
                    });
            }, () => {
                this.spinner = false;
            });
    }

    // ---------------------
    //  reordenamos la fecha
    // ---------------------
    cleanFechaOpinion(fechaOpinion): string {
        let fecha = fechaOpinion.replace('T', ' ');

        return fecha.substring(0, 16) + " -";
    }
    // ---------------------------------------------------------------------------
    //  Función para boton Plan de accion, sin niguna funcionalidad por el momento
    // ---------------------------------------------------------------------------
    getPlanDeAccion() { }


    // ---------------------------------------------------------------------------
    // Función para el boton Plan canje, sin ninguna funcionalidad por el momento
    // ---------------------------------------------------------------------------
    getPlanCanje() { }


    // ------------------------------------------------------------------------
    //  evento para cargar mas opiniones cuando el usuario scrollea hacia abajo
    // ------------------------------------------------------------------------
    evento() {
        this.getAllOpinions(this.peopleProfile.id);
    }
}
