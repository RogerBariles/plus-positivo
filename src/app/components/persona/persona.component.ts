import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SnackBar } from "@nativescript-community/ui-material-snackbar";
import { People } from "src/app/models/people";
import { PersonsService } from "../../services/persons.service";

@Component({
    selector: "ns-persona",
    templateUrl: "./persona.component.html",
    styleUrls: ["./persona.component.css"],
})
export class PersonaComponent implements OnInit {
    snackbar = new SnackBar();
    spinner: boolean;
    idPersonSelect: number;
    people: People;
    peopleImg: string;
    descripcionPrs: string;
    newDescirpcion: string;

    constructor(
        private activateRoute: ActivatedRoute,
        private personsService: PersonsService
    ) {
        this.idPersonSelect = this.activateRoute.snapshot.params.idPersona;
    }

    ngOnInit() {
        this.spinner = true;
        this.getPeopleSelect();
    }

    getPeopleSelect() {

        this.personsService
            .getPeopleById(this.idPersonSelect)
            .subscribe((resp: People) => {
                this.people = resp;
                this.peopleImg =
                    "data:" +
                    resp.imagenPrsContentType +
                    ";base64," +
                    resp.imagenPrs;
                this.descripcionPrs = this.people.tipo.descTpPrs;
                this.spinner = false;
            });
    }

    onTextChange(even) {
        this.newDescirpcion = even.value;
    }

    updatePeople() {
        this.spinner = true;
        this.people.tipo.descTpPrs = this.newDescirpcion;
        this.descripcionPrs = this.newDescirpcion;

        this.personsService.updatePeople(this.people).subscribe(
            (resp) => {
                console.log(this.people.tipo.descTpPrs)
                console.log(resp);
                this.snackbar
                    .action({
                        message: `Datos guardados correctamente`,
                        textColor: "white",
                        actionTextColor: "white",
                        backgroundColor: "green",
                        actionText: "Exitó",
                        hideDelay: 2000,
                    })
                    .then((resp) => {
                        this.spinner = false;
                    });
            },
            (error) => {
                this.snackbar
                    .action({
                        message: `Error al guardar`,
                        textColor: "white",
                        actionTextColor: "black",
                        backgroundColor: "red",
                        hideDelay: 2000,
                    })
                    .then((resp) => {
                        this.spinner = false;
                    });
            }
        );
    }
}
