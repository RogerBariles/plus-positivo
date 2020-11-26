import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'ns-menu',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.css']
})

export class MenuComponent implements OnInit {

    idUser: number;

    constructor(
        private router: Router,
        private param: ActivatedRoute,
    ) {
        this.idUser = this.param.snapshot.params.user;
    }

    ngOnInit() {
    }

    // --------------------------------------
    //redireccion al componente de Mi perfil
    // --------------------------------------
    onMiProfile(): void {
        this.router.navigate(['/profile/', this.idUser]);
    }

    // ----------------------------------------
    //redireccion al componente de competencias
    // ----------------------------------------
    onCompetency(): void {
        this.router.navigate(['/search/', this.idUser]);
    }
}