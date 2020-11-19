import { PersonsService } from "@services/persons.service";
import { Opiniones } from "@models/opinion";
import { People } from "@models/people";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OpinionsService } from "@services/opinions.service";
import { Promedios } from "@models/opinion";
import { RouterExtensions } from "@nativescript/angular";

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


    constructor(
        private routerActivate: ActivatedRoute,
        private personaService: PersonsService,
        private opinionsService: OpinionsService,
        private router: RouterExtensions
    ) {
        this.promPeople = new Promedios();
        this.spinner = true;
        this.idUser = this.routerActivate.snapshot.params.user;
    }

    ngOnInit() {
        this.getPersons();
    }

    onGoBack() {
        this.router.backToPreviousPage();
    }

    get canGoBack() {
        return this.router.canGoBack();
    }

    getPersons() {
        this.personaService
            .getPeopleById(this.idUser)
            .subscribe((next: People) => {
                this.peopleProfile = next;
                this.changePromedios(this.peopleProfile.codigoPrs);
            });
    }

    changePromedios(codigoPrs) {
        this.opinionsService
            .getOpinionsPromedioUser(codigoPrs)
            .subscribe((next: Promedios) => {
                this.promPeople.promLiderados = +next.promLiderados.toFixed(4);
                this.promPeople.promUser = +next.promUser.toFixed(4);
                this.getAllOpinions(this.peopleProfile.id);
            });
    }

    getAllOpinions(id) {
        this.opinionsService.getAllOpinionsByOpinadoId(id).subscribe(
            (resp: Opiniones[]) => {
                let i = 0;
                this.opiniones = resp;
                this.opiniones.forEach(un => {
                    un.fechaOpi = this.cleanFechaOpinion(un.fechaOpi);
                })

            }, error => {

            }, () => {
                this.spinner = false;
            });
    }


    cleanFechaOpinion(fechaOpinion): string {
        let fecha = fechaOpinion.replace('T', ' ');

        return fecha.substring(0, 16) + "=";
    }


    onScroll(event) {
        console.log('hoñlas');
    }

    //  Función para boton Plan de accion, sin niguna funcionalidad por el momento
    getPlanDeAccion() { }

    // Función para el boton Plan canje, sin ninguna funcionalidad por el momento
    getPlanCanje() { }
}
