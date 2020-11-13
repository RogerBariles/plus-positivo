import { Token } from "../../../models/user";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { getString, setString } from "@nativescript/core/application-settings";
import { AuthenticationService } from "../../../services/authentication.service";
import { SnackBar } from "@nativescript-community/ui-material-snackbar";
import { PersonsService } from "../../../services/persons.service";
import { People } from "src/app/models/people";
@Component({
    selector: "ns-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
    validPas: boolean;
    validUser: boolean;
    username: string = "";
    password: string = "";
    snackbar = new SnackBar();
    spinner: boolean;
    formLogin: FormGroup;

    constructor(
        private peopleService: PersonsService,
        private authService: AuthenticationService,
        private router: Router
    ) {
        this.spinner = false;
        this.validUser = false;
        this.validPas = false;
    }

    ngOnInit() {
        this.build();
    }

    build() {
        this.formLogin = new FormGroup({
            username: new FormControl(null, {
                updateOn: "blur",
                validators: [],
            }),
            password: new FormControl(null, {
                updateOn: "blur",
                validators: [],
            }),
        });
        if (getString("userLogin")) {
            this.formLogin.get("username").setValue(getString("userLogin"));
        }
    }

    getIn() {
        this.validField();
        if (!this.validPas && !this.validUser) {
            this.spinner = true;
            this.formLogin.patchValue({
                username: this.username,
                password: this.password,
            });

            if (this.formLogin.valid) {

                const msj = "Credenciales Incorrectas";
                this.authService
                    .loguin(this.formLogin)
                    .subscribe(
                        (resp: Token) => {
                            setString("token", resp.id_token);
                            setString("userLogin", this.username.toLowerCase());

                            this.loguinVerify();
                        },
                        (error) => {
                            this.validUser = true;
                            this.formLogin.get("password").setValue("");
                            this.showSimpleSnackbar(msj);
                    }
                );
            }
        } else {
            
        }
    }

    loguinVerify() {
        const msj = "Usuario no habilitado. Notifique a Administracion.";
        this.peopleService
            .getPeopleByCondigoPrs(this.username.toLowerCase())
            .subscribe(
                (resp: People[]) => {
                    this.spinner = false;
                    if (resp.length > 0) {
                        this.router.navigate([
                            "/home/",
                            this.formLogin.get("username").value,
                        ]);
                    } else {
                        this.showSimpleSnackbar(msj);
                    }
                },
                (error) => {
                    this.showSimpleSnackbar(msj);
                });
    }

    showSimpleSnackbar(msj) {
        this.snackbar
            .action({
                message: `${msj}`,
                textColor: "white",
                actionTextColor: "red",
                backgroundColor: "black",
                actionText: "Error",
                hideDelay: 2000,
            })
            .then((resp) => {
                this.spinner = false;
            });
    }

    onTextChange(event) {
        this.password = event.value;
        if (this.password != "") {
            this.validPas = false;
        }
    }

    onText(event) {
        this.username = event.value;
        if (this.username != "") {
            this.validUser = false;
        }
    }

    validField() {
        this.validPas = this.password != "" ? false : true;
        this.validUser = this.username != "" ? false : true;
    }
}
