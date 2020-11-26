import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SnackBar } from "@nativescript-community/ui-material-snackbar";
import { People } from "src/app/models/people";
import { PersonsService } from "../../services/persons.service";
import { Context } from "../../models/opinion";
import { ModalDialogService, RouterExtensions } from "@nativescript/angular";
import { ModalContextComponent } from "./modal-context/modal-context.component";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { getString } from "@nativescript/core/application-settings";
import { CommonService } from "@services/common.service";
@Component({
    selector: "ns-persona",
    templateUrl: "./persona.component.html",
    styleUrls: ["./persona.component.css"],
})
export class PersonaComponent implements OnInit {
    @ViewChild("longListPickerContainer") longListPickerContainer: ElementRef;
    @ViewChild("longListPickerDimmer") longListPickerDimmer: ElementRef;

    ctx: boolean;
    validStar: boolean;
    validCtx: boolean;
    peopleLogin: People;
    snackbar = new SnackBar();
    spinner: boolean;
    idPersonSelect: number;
    people: People;
    peopleImg: string;
    newDescirpcion: string;
    contexts: Context[];
    selectCtx: Context;
    color: string[] = ['', '', '', '', '', ''];
    showingCreateTicket: any = false;
    showingLongListPicker: any = false;

    stars: number[] = [1, 2, 3, 4, 5];
    selectedStar: number = 0;

    constructor(
        private routerExtensions: RouterExtensions,
        private router: Router,
        private modalDialog: ModalDialogService,
        private vcRef: ViewContainerRef,
        private activateRoute: ActivatedRoute,
        private personsService: PersonsService,
        private commonService: CommonService
    ) {
        this.initArrayStar();
        this.spinner = true;
        this.validCtx = false;
        this.validStar = false;
        this.ctx = false;
        this.contexts = [];
        this.idPersonSelect = this.activateRoute.snapshot.params.idPersona;
    }

    ngOnInit() {
        //limpiamos las variables de common service para luego guardar nuevos datos
        this.commonService.clean();
        this.peopleLoginFun();
        this.getPeopleSelect();
        this.getAllContext();
    }

    peopleLoginFun() {
        const peolpe = getString("userLogin");
        this.personsService
            .getPeopleByCondigoPrs(peolpe)
            .subscribe((resp: People) => {
                this.peopleLogin = resp;
                this.commonService.personaLogueada = resp;
            });
    }

    countStar(star) {
        this.selectedStar = star;
        for (let i = 1; i <= 5; i++) {
            if (i <= star) this.color[i] = "yellow";
            else this.color[i] = "white";
        }
        this.validStar = false;
    }

    getPeopleSelect() {
        this.personsService
            .getPeopleById(this.idPersonSelect)
            .subscribe((resp: People) => {
                this.commonService.personaAEvaluar = resp;
                this.people = resp;
                this.peopleImg =
                    "data:" +
                    resp.imagenPrsContentType +
                    ";base64," +
                    resp.imagenPrs;
                this.spinner = false;
            });
    }

    getAllContext() {
        this.contexts = [];
        this.personsService.getAllConetext().subscribe(
            (next: Context[]) => {
                this.contexts = next;
            },
            (error) => { }
        );
    }

    onTextChange(even) {
        this.newDescirpcion = even.value;
    }

    updatePeople() {
        this.validField();
        if (!this.validCtx && !this.validStar) {
            this.spinner = true;
            let fechaA = new Date();

            let jsonCtx = {
                comentarioOpi: this.newDescirpcion,
                contexto: this.selectCtx,
                estrellasOpi: this.selectedStar,
                fechaOpi: fechaA,
                id: null,
                opinado: this.people,
                opinante: this.peopleLogin[0],
            };

            this.personsService.updateOpinionPeople(jsonCtx).subscribe(
                (resp) => {
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
                            this.router.navigate(["/home/", this.peopleLogin[0].codigoPrs],
                                { skipLocationChange: true });
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
                },
                () => {
                    this.initArrayStar();
                    this.selectedStar = 0;
                    this.selectCtx = new Context();
                }
            );

        }
    }

    onchangeContext() {
        this.modalDialog.showModal(ModalContextComponent, {
            fullscreen: true,
            viewContainerRef: this.vcRef,
        });
    }

    showProducts() {
        this.animateLongListPicker("products");
    }

    animateLongListPicker(type) {
        this.showingLongListPicker = type;
        this.longListPickerDimmer.nativeElement.opacity = 0;
        this.longListPickerDimmer.nativeElement.animate({
            opacity: 1,
            duration: 200,
        });
        this.longListPickerContainer.nativeElement.opacity = 1;
        this.longListPickerContainer.nativeElement.scaleX = 0.7;
        this.longListPickerContainer.nativeElement.scaleY = 0.7;
        this.longListPickerContainer.nativeElement.animate({
            opacity: 1,
            scale: { x: 1, y: 1 },
            duration: 400,
            curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1),
        });
    }

    closeLongListPicker() {
        this.longListPickerDimmer.nativeElement.animate({
            opacity: 0,
            duration: 200,
        });
        this.longListPickerContainer.nativeElement
            .animate({
                opacity: 0,
                scale: { x: 0.7, y: 0.7 },
                duration: 300,
                curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1),
            })
            .then(() => {
                this.showingLongListPicker = false;
            });
    }

    selecCtx(index: number) {
        this.ctx = true;
        this.validCtx = false;
        this.selectCtx = this.contexts[index];
        this.closeLongListPicker();
    }

    validField(status?) {
        if (status == 0) {
            return this.ctx && !(this.selectedStar == 0 ? true : false);
        } else {
            this.validCtx = !this.ctx;
            this.validStar = this.selectedStar == 0 ? true : false;
        }
    }

    initArrayStar() {
        for (let i = 0; i < 6; i++) {
            this.color[i] = "white";
        }
    }

    //metodo para abrir opciones avanzadas donde aparecera las competencias a evaluar
    advancedOptions() {
        this.router.navigate(["/competency/", this.idPersonSelect]);
    }

    //correspondiente al boton de regreso (lado izquierdo del actionBar)
    onGoBack() {
        this.routerExtensions.backToPreviousPage();
    }

    get canGoBack() {
        return this.routerExtensions.canGoBack();
    }
}
