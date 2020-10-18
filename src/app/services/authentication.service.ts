import { Users } from "../models/user";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { take } from "rxjs/operators";

@Injectable()
export class AuthenticationService {
    apiUrl: string;
    idToken: any;

    constructor(private http: HttpClient) {
        this.apiUrl = "http:///api/";
    }
  
    loguin(user) {
       const header = new HttpHeaders()
       .append("Content-Type", "application/json");
        
       const body = new HttpHeaders()
       .append('password', user.get('password').value)
       .append('rememberMe', true.toString())
       .append('username', user.get('username').value)

        return this.http
            .post(this.apiUrl + "authenticate", JSON.stringify(body), { headers: header})
            .pipe(take(1));
    }
}
