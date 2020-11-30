import { Component, OnInit } from "@angular/core";
import { PersonsService } from "@services/persons.service";
import { People } from "@models/people";
import { Router } from "@angular/router";
import { getString } from "@nativescript/core/application-settings";
import { RouterExtensions } from "@nativescript/angular";

@Component({
    selector: "ns-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
    personsFilter: string;
    spinner: boolean;
    loadPeople: boolean;
    filterPeople: People[];
    filterNot: boolean;

    constructor(
        private routerExtensions: RouterExtensions,
        private personsService: PersonsService,
        private router: Router
    ) {
        this.spinner = false;
        this.loadPeople = false;
        this.filterNot = false;
    }

    ngOnInit() { }

    ngOnChanges(): void {
    }

    // ---------------------------------------------
    //  metodo para realizar la busqueda de personas
    // ---------------------------------------------
    applyFIlter() {
        this.spinner = true;
        this.personsService.getAllPersonas(this.personsFilter).subscribe(
            (resp: People[]) => {
                if (resp.length != 0) {
                    const usrActual = getString("userLogin");
                    this.filterPeople = resp.filter(
                        (x) => x.codigoPrs !== usrActual
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
            (error) => { }
        );
    }

    // -----------------------------------------------------------------
    //  Una vez haya salido las persona correspondiente al buscador
    //  al seleccionar un renglon redirigimos al componente persona
    // -----------------------------------------------------------------
    selectPerson(index) {
        this.router.navigate(["/persona/", this.filterPeople[index].id]);
    }

    // -----------------------------------------------------------------
    //  Hacemos un setTimeOut para que la persona vaya escribiendo y vaya
    //  buscando
    // -----------------------------------------------------------------
    onTextChange() {
        setTimeout(() => {
            this.applyFIlter();
        }, 500);
    }

    // -----------------------------------------------------------------
    //correspondiente al boton de regreso (lado izquierdo del actionBar)
    // -----------------------------------------------------------------
    onGoBack() {
        this.routerExtensions.backToPreviousPage();
    }

    get canGoBack() {
        return this.routerExtensions.canGoBack();
    }
}
