import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { People } from '@models/people';
import { CommonService } from '@services/common.service';

@Component({
    selector: 'ns-menu',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.css']
})

export class MenuComponent implements OnInit {

    idUser: number;
    personaLogueada: People;
    personaLogueadaImg: string;

    constructor(
        private router: Router,
        private param: ActivatedRoute,
        private commonService: CommonService
    ) {
        this.idUser = this.param.snapshot.params.user;
    }

    ngOnInit() {
        this.personaLogueada = this.commonService.getPersonaLogueada();
        this.personaLogueada = this.personaLogueada[0];
        this.personaLogueadaImg = "data:" + this.personaLogueada.imagenPrsContentType + ";base64," + this.personaLogueada.imagenPrs;
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