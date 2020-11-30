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


    // -------------------------------
    //  inicializacion de formulario
    // -------------------------------
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

    // -------------------------------------------------------------
    //  Funcion para el boton de inicar sesion
    //  - validamos los campos que esten completos
    //  - le hacemos el loguin correspondiente para obtener el token
    //      y lo guardamos en setString
    // -------------------------------------------------------------
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
                this.authService.loguin(this.formLogin).subscribe(
                    (resp: Token) => {
                        setString("token", resp.id_token);
                        setString("userLogin", this.username.toLowerCase());

                        this.loguinVerify();
                    },
                    (error) => {
                        this.validUser = true;
                        this.validPas = true;
                        this.formLogin.get("password").setValue("");
                        this.showSimpleSnackbar(msj);
                    }
                );
            }
        } else {
        }
    }


    // ----------------------------------------------------------------------
    //  Validamos si el usuario tiene un usuario para permitir su acceso
    // - si asi es , redirigimos a home. De lo contrario sale msj de error
    // ----------------------------------------------------------------------
    loguinVerify() {
        const msj = "Usuario no habilitado. Notifique a Administracion.";
        this.peopleService
            .getPeopleByCondigoPrs(this.username.toLowerCase())
            .subscribe(
                (resp: People[]) => {
                    this.spinner = false;
                    if (resp.length > 0) {
                        this.router.navigate(["/home/", resp[0].id]);
                    } else {
                        this.showSimpleSnackbar(msj);
                    }
                },
                (error) => {
                    this.showSimpleSnackbar(msj);
                }
            );
    }

    // -----------------------------------------------
    //  metodo para mostrar msj atravez de un snackbar
    // -----------------------------------------------
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


    // -----------------------------------------------------
    // validamos cuando se ingrese datos al campo contraseña
    // -----------------------------------------------------
    onTextChange(event) {
        this.password = event.value;
        if (this.password != "") {
            this.validPas = false;
        }
    }

    // -----------------------------------------------------
    // validamos cuando se ingrese datos al campo usuario
    // -----------------------------------------------------
    onText(event) {
        this.username = event.value;
        if (this.username != "") {
            this.validUser = false;
        }
    }

    // -----------------------------------------------------------
    // validamos cuando quiere iniciar sesion si falta algun campo
    // . si falta alguno mostramos "Campo Requerido".
    // -----------------------------------------------------------
    validField() {
        this.validPas = this.password != "" ? false : true;
        this.validUser = this.username != "" ? false : true;
    }
}
