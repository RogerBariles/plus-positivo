import { Component, OnInit } from "@angular/core";
import { Users } from '../../../models/user';

@Component({
    selector: "ns-login",
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {

    loguinUser: Users;

    constructor(){}

    ngOnInit() {

    }

 }

