import { Component, OnInit } from "@angular/core";
import { Context } from "../../../models/opinion";
import { PersonsService } from '../../../services/persons.service';

@Component({
    selector: "modal-context",
    templateUrl: "modal-context.component.html",
    styleUrls: ["modal-context.component.css"],
})
export class ModalContextComponent implements OnInit {
    
    load: boolean;
    contexts: string[];

    constructor(
        private personsService: PersonsService
    ) {
        this.load = true;
        this.contexts = [];
    }

    ngOnInit() {
        this.getAllContext();
    }

    getAllContext() {
        this.contexts = [];
        this.personsService.getAllConetext().subscribe(
            (next: Context[]) => {
                next.forEach((nextElement) => {
                    this.contexts.push(nextElement.descCtx);
                });
                this.load = true;
            },
            (error) => {}
        );
    }

}
