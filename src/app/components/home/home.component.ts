import { Component, OnInit } from "@angular/core";
import { PersonsService } from "../../services/persons.service";
import { People } from "../../models/people";
import { Router } from "@angular/router";
import { getString } from "@nativescript/core/application-settings";

@Component({
    selector: "ns-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
    personsFilter: string;
    spinner: boolean;
    loadPeople: boolean;
    filterPeople: People[];
    filterNot: boolean;

    constructor(
        private personsService: PersonsService,
        private router: Router
    ) {
        this.spinner = false;
        this.loadPeople = false;
        this.filterNot = false;
    }

    ngOnInit() {}

    ngOnChanges(): void {
    }

    applyFIlter() {
        this.spinner = true;
        this.personsService.getAllPersonas(this.personsFilter).subscribe(
            (resp: People[]) => {
                if (resp.length != 0) {
                    this.filterPeople = resp.filter(
                        (x) => x.codigoPrs != getString("userLogin")
                    );
                    if (this.filterPeople.length > 0) {
                        this.filterNot = false;
                        this.loadPeople = true;
                    } else {
                        this.loadPeople = false;
                        this.filterNot = true;
                    }
                    this.spinner = false;
                } else {
                    this.loadPeople = false;
                    this.filterNot = true;
                    this.spinner = false;
                }
            },
            (error) => {}
        );
    }

    selectPerson(index) {
        this.router.navigate(["/persona/", this.filterPeople[index].id]);
    }

    onTextChange() {
        setTimeout(() => {
            this.applyFIlter();
        },500);
    }
}
