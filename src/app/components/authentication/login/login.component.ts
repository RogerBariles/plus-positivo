import { Token } from "../../../models/user";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { setString } from "@nativescript/core/application-settings";
import { AuthenticationService } from "../../../services/authentication.service";
import { SnackBar } from "@nativescript-community/ui-material-snackbar";
@Component({
    selector: "ns-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
    snackbar = new SnackBar();
    spinner: boolean;
    formLogin: FormGroup;

    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) {
        this.spinner = false;
    }

    ngOnInit() {
        //---initialitation form Reactive
        this.build();
    }

    build() {
        this.formLogin = new FormGroup({
            username: new FormControl(null, {
                updateOn: "blur",
                validators: [Validators.required],
            }),
            password: new FormControl(null, {
                updateOn: "blur",
                validators: [Validators.required],
            }),
        });
    }

    getIn() {
        this.spinner = true;
        if (this.formLogin.valid) {
            this.authService.loguin(this.formLogin).subscribe(
                (resp: Token) => {
                    setString("token", resp.id_token);
                    this.spinner = false;
                    this.router.navigate([
                        "/home/",
                        this.formLogin.get("username").value,
                    ]);
                },
                (error) => {
                    this.formLogin.get("username").setValue("");
                    this.formLogin.get("password").setValue("");
                    // let options = {
                    //     title: "Credenciales Incorrectas",
                    //     message: "Usuarios/contraseña incorrecto.",
                    //     okButtonText: "OK"
                    // };
                    // alert(options);
                    this.showSimpleSnackbar();
                }
            );
        }
    }
    showSimpleSnackbar() {
        this.snackbar
            .action({
                message: `Credenciales Incorrectas`,
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
}
