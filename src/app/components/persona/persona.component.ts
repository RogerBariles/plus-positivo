import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SnackBar } from "@nativescript-community/ui-material-snackbar";
import { People } from "src/app/models/people";
import { PersonsService } from "../../services/persons.service";
import { Context } from "../../models/opinion";
import { ModalDialogService } from "@nativescript/angular";
import { ModalContextComponent } from "./modal-context/modal-context.component";
import { AnimationCurve } from "@nativescript/core/ui/enums";
@Component({
    selector: "ns-persona",
    templateUrl: "./persona.component.html",
    styleUrls: ["./persona.component.css"],
})
export class PersonaComponent implements OnInit {
    @ViewChild("longListPickerContainer") longListPickerContainer: ElementRef;
    @ViewChild("longListPickerDimmer") longListPickerDimmer: ElementRef;

    disabledButton: boolean;
    snackbar = new SnackBar();
    spinner: boolean;
    idPersonSelect: number;
    people: People;
    peopleImg: string;
    newDescirpcion: string;
    contexts: Context[];
    selectCtx: Context;
    color: string[];
    showingCreateTicket: any = false;
    loadingTicketFields: boolean = false;
    showingLongListPicker: any = false;

    stars: number[] = [1, 2, 3, 4, 5];
    selectedStar: number = 0;

    constructor(
        private modalDialog: ModalDialogService,
        private vcRef: ViewContainerRef,
        private activateRoute: ActivatedRoute,
        private personsService: PersonsService
    ) {
        this.color = ["white", "white", "white", "white", "white", "white"];
        this.disabledButton = false;
        this.contexts = [];
        this.idPersonSelect = this.activateRoute.snapshot.params.idPersona;
    }

    ngOnInit() {
        this.spinner = true;
        this.getPeopleSelect();
        this.getAllContext();
    }

    countStar(star) {
        this.selectedStar = star;
        for (let i = 1; i <= 5; i++) {
            if (i <= star) this.color[i] = "yellow";
            else this.color[i] = "white";
        }
        this.validButton();
    }

    getPeopleSelect() {
        this.personsService
            .getPeopleById(this.idPersonSelect)
            .subscribe((resp: People) => {
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
            (error) => {}
        );
    }

    onTextChange(even) {
        this.newDescirpcion = even.value;
    }

    updatePeople() {
        this.spinner = true;

        let jsonCtx = {
            comentarioOpi: this.newDescirpcion,
            contexto: this.selectCtx,
            criterioOpi: 1,
            estrellasOpi: this.selectedStar,
            fechaOpi: new Date(),
            id: null,
            opinado: this.people,
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
                    });
            },
            (error) => {
                this.color = [
                    "white",
                    "white",
                    "white",
                    "white",
                    "white",
                    "white",
                ];
                this.selectedStar = 0;
                this.selectCtx = new Context();
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
            }
        );
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
        this.selectCtx = this.contexts[index];
        this.validButton();
        this.closeLongListPicker();
    }

    validButton() {
        const a = this.selectCtx.descCtx != undefined ? true : false;
        const b = this.selectedStar ? true : false;
        this.disabledButton = a && b;
    }
}
