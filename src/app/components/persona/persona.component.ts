import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "ns-persona",
    templateUrl: "./persona.component.html",
    styleUrls: ["./persona.component.css"]
})
export class PersonaComponent implements OnInit{ 
    
    idPersonSelect: number;

    constructor(
        private activateRoute: ActivatedRoute
    ){
        this.idPersonSelect = this.activateRoute.snapshot.params.idPersona;
    }

    ngOnInit(){
        
    }
}
