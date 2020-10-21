import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { People } from "src/app/models/people";
import { PersonsService } from "../../services/persons.service";

@Component({
    selector: "ns-persona",
    templateUrl: "./persona.component.html",
    styleUrls: ["./persona.component.css"],
})
export class PersonaComponent implements OnInit {

    spinner: boolean;
    idPersonSelect: number;
    people: People;

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
                this.people.imagenPrs ='data:'+ resp.imagenPrsContentType + ';base64,' + resp.imagenPrs;
                this.spinner = false;
            });
    }
}
