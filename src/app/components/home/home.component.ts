import { Component, OnInit } from "@angular/core";
import { PersonsService } from "../../services/persons.service";
import { People } from "../../models/people";
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

    constructor(private personsService: PersonsService) {
        this.spinner = false;
        this.loadPeople = false;
        this.filterNot = false;
    }

    ngOnInit() {}

    applyFIlter() {
        this.spinner = true;
        this.personsService.getAllPersonas(this.personsFilter).subscribe(
            (resp: People[]) => {

                if(resp.length != 0) {
                    this.filterPeople = resp;
                    this.filterNot = false;
                    this.spinner = false;
                    this.loadPeople = true;
                } else {
                    this.loadPeople = false;
                    this.filterNot = true;
                    this.spinner = false;
                }

            },
            (error) => {}
        );
    }
}
