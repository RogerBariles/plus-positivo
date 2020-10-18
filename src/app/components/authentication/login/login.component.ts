import { Component, OnInit } from "@angular/core";
import {
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../../services/authentication.service";


@Component({
    selector: "ns-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
    
    formLogin: FormGroup;

    constructor(private authService: AuthenticationService,
        private router: Router) {
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
        if (this.formLogin.valid) {
            this.router.navigate(['/home/', this.formLogin.get('username').value]);
            this.authService.loguin(this.formLogin).subscribe((resp) => {
                this.authService.idToken = resp;
                console.log(this.authService.idToken);
            });
        } else {
            
        }

        
    }
}
