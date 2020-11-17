import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "ns-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
    userName: string;

    constructor(private routerActivate: ActivatedRoute) {
        this.userName = this.routerActivate.snapshot.params.user;
    }

    ngOnInit() {}

    //  Función para boton Plan de accion, sin niguna funcionalidad por el momento
    getPlanDeAccion() {}

    // Función para el boton Plan canje, sin ninguna funcionalidad por el momento
    getPlanCanje() {}
}
