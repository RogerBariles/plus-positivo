import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
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
    @ViewChild("menuBtn", { static: false }) menuBtn: ElementRef;

    snackbar = new SnackBar();
    spinner: boolean;
    idPersonSelect: number;
    people: People;
    peopleImg: string;
    descripcionPrs: string;
    newDescirpcion: string;
    contexts: string[];


    @ViewChild("longListPickerContainer") longListPickerContainer: ElementRef;
    @ViewChild("longListPickerDimmer") longListPickerDimmer: ElementRef;

    public showingCreateTicket: any = false;
    public loadingTicketFields: boolean = false;

    public showingLongListPicker: any = false;
    public unfilteredItemsToShow = [];
    public itemsToShow = [];

    public selectedProduct = '';
    public productMap = {};
    public listProducts = [];

    public filterItem: string;

    constructor(
        private modalDialog: ModalDialogService,
        private vcRef: ViewContainerRef,
        private activateRoute: ActivatedRoute,
        private personsService: PersonsService,
    ) {
        this.contexts = [];
        this.idPersonSelect = this.activateRoute.snapshot.params.idPersona;
    }

    ngOnInit() {
        this.spinner = true;
        this.getPeopleSelect();
        this.getAllContext();
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
                this.descripcionPrs = this.people.tipo.descTpPrs;
                this.spinner = false;
            });
    }

    getAllContext() {
        this.contexts = [];
        this.personsService.getAllConetext().subscribe(
            (next: Context[]) => {
                next.forEach((nextElement) => {
                    this.contexts.push(nextElement.descCtx);
                });
            },
            (error) => {}
        );
    }

    onTextChange(even) {
        this.newDescirpcion = even.value;
    }

    updatePeople() {
        this.spinner = true;
        this.people.tipo.descTpPrs = this.newDescirpcion;
        this.descripcionPrs = this.newDescirpcion;

        this.personsService.updatePeople(this.people).subscribe(
            (resp) => {
                console.log(this.people.tipo.descTpPrs);
                console.log(resp);
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
        console.log(this.contexts);
        this.animateLongListPicker('products');
        this.itemsToShow = this.listProducts;
        this.unfilteredItemsToShow = this.listProducts;
    }

    animateLongListPicker(type) {
        this.showingLongListPicker = type;
        this.longListPickerDimmer.nativeElement.opacity = 0;
        this.longListPickerDimmer.nativeElement.animate({
            opacity: 1,
            duration: 200
        })
        this.longListPickerContainer.nativeElement.opacity = 1;
        this.longListPickerContainer.nativeElement.scaleX = .7;
        this.longListPickerContainer.nativeElement.scaleY = .7;
        this.longListPickerContainer.nativeElement.animate({
            opacity: 1,
            scale: {x: 1, y: 1},
            duration: 400,
            curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
        })
    }

    chooseLongList(event) {
        this.filterItem = '';
        if (this.showingLongListPicker == 'products') {
            this.selectedProduct = this.itemsToShow[event.index];
        }
        this.closeLongListPicker();
    }

    closeLongListPicker() {
        this.longListPickerDimmer.nativeElement.animate({
            opacity: 0,
            duration: 200
        })
        this.longListPickerContainer.nativeElement.animate({
            opacity: 0,
            scale: {x: .7, y: .7},
            duration: 300,
            curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
        }).then(() => {
            this.showingLongListPicker = false;
        })
    }

    
}
