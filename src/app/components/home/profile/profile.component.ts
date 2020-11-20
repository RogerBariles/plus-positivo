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

    //correspondiente al boton de regreso (lado izquierdo del actionBar)
    onGoBack() {
        this.router.backToPreviousPage();
    }

    get canGoBack() {
        return this.router.canGoBack();
    }

    // buscamos persona logueada por el id
    getPersons() {
        this.personaService
            .getPeopleById(this.idUser)
            .subscribe((next: People) => {
                this.peopleProfile = next;
                //cuando obtenemos la informacion completa , pasamos a obtener los promedios correspondientes
                this.changePromedios(this.peopleProfile.codigoPrs);
            });
    }

    //buscamos los promedios con el codigoPrs correspondiente a la persona logueada
    changePromedios(codigoPrs) {
        this.opinionsService
            .getOpinionsPromedioUser(codigoPrs)
            .subscribe((next: Promedios) => {
                //recortamos la cantidad de decimales de los promedios
                this.promPeople.promLiderados = +next.promLiderados.toFixed(4);
                this.promPeople.promUser = +next.promUser.toFixed(4);
                this.getAllOpinions(this.peopleProfile.id);
            });
    }

    //pedimos las opiniones correspondiente al id de la persona logeada
    getAllOpinions(id) {
        this.opinionsService.getAllOpinionsByOpinadoId(id).subscribe(
            (resp: Opiniones[]) => {
                let i = 0;
                this.opiniones = resp;
                this.opiniones.forEach(anOpinion => {
                    //seteamos nueva estructura para la fecha de la opinion
                    anOpinion.fechaOpi = this.cleanFechaOpinion(anOpinion.fechaOpi);
                })

            }, error => {

            }, () => {
                this.spinner = false;
            });
    }

    //reordenamos la fecha
    cleanFechaOpinion(fechaOpinion): string {
        let fecha = fechaOpinion.replace('T', ' ');

        return fecha.substring(0, 16) + ":";
    }

    //  Función para boton Plan de accion, sin niguna funcionalidad por el momento
    getPlanDeAccion() { }

    // Función para el boton Plan canje, sin ninguna funcionalidad por el momento
    getPlanCanje() { }
}
